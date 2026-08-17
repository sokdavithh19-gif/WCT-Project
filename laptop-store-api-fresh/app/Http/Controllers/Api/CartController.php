<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Laptop;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * GET /api/cart
     */
    public function show(Request $request)
    {
        $cart = $request->user()->cart()->with('items.laptop')->firstOrCreate();

        return response()->json([
            'cart' => $cart,
            'total' => $cart->total(),
        ]);
    }

    /**
     * POST /api/cart/items { laptop_id, quantity }
     */
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'laptop_id' => ['required', 'exists:laptops,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $laptop = Laptop::findOrFail($validated['laptop_id']);
        $cart = $request->user()->cart()->firstOrCreate();

        $existing = $cart->items()->where('laptop_id', $laptop->id)->first();
        $desiredQuantity = $validated['quantity'] + ($existing?->quantity ?? 0);

        if (! $laptop->isInStock($desiredQuantity)) {
            return response()->json([
                'message' => "Only {$laptop->stock} unit(s) of {$laptop->name} available.",
            ], 422);
        }

        if ($existing) {
            $existing->update(['quantity' => $desiredQuantity]);
            $item = $existing;
        } else {
            $item = $cart->items()->create([
                'laptop_id' => $laptop->id,
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart.',
            'item' => $item->load('laptop'),
        ], 201);
    }

    /**
     * PUT /api/cart/items/{cartItem} { quantity }
     */
    public function updateItem(Request $request, CartItem $cartItem)
    {
        $this->authorizeOwnership($request, $cartItem);

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if (! $cartItem->laptop->isInStock($validated['quantity'])) {
            return response()->json([
                'message' => "Only {$cartItem->laptop->stock} unit(s) available.",
            ], 422);
        }

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json(['message' => 'Cart updated.', 'item' => $cartItem->load('laptop')]);
    }

    /**
     * DELETE /api/cart/items/{cartItem}
     */
    public function removeItem(Request $request, CartItem $cartItem)
    {
        $this->authorizeOwnership($request, $cartItem);

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart.']);
    }

    private function authorizeOwnership(Request $request, CartItem $cartItem): void
    {
        abort_unless($cartItem->cart->user_id === $request->user()->id, 403, 'Forbidden.');
    }
}
