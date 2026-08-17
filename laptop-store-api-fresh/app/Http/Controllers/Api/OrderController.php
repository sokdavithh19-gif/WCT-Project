<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * POST /api/checkout
     * Converts the authenticated user's cart into an Order, decrements
     * stock, and empties the cart. Wrapped in a DB transaction so a
     * failure (e.g. stock ran out) leaves nothing half-done.
     */
    public function checkout(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('items.laptop')->first();

        if (! $cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty.'], 422);
        }

        try {
            $order = DB::transaction(function () use ($cart, $user) {
                $total = 0;

                // Lock rows and verify stock before committing to the order.
                foreach ($cart->items as $item) {
                    $laptop = $item->laptop()->lockForUpdate()->first();

                    if (! $laptop->isInStock($item->quantity)) {
                        throw new \RuntimeException("'{$laptop->name}' no longer has enough stock ({$laptop->stock} left).");
                    }

                    $total += $laptop->price * $item->quantity;
                }

                $order = Order::create([
                    'user_id' => $user->id,
                    'total_price' => $total,
                    'status' => 'pending',
                ]);

                foreach ($cart->items as $item) {
                    $laptop = $item->laptop;

                    $order->items()->create([
                        'laptop_id' => $laptop->id,
                        'quantity' => $item->quantity,
                        'price' => $laptop->price,
                    ]);

                    $laptop->decrement('stock', $item->quantity);
                }

                $cart->items()->delete();

                return $order;
            });
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order->load('items.laptop'),
        ], 201);
    }

    /**
     * GET /api/orders — the authenticated user's own order history.
     */
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('items.laptop')
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    /**
     * GET /api/orders/{order} — a single order, owner-only.
     */
    public function show(Request $request, Order $order)
    {
        abort_unless($order->user_id === $request->user()->id, 403, 'Forbidden.');

        return response()->json($order->load('items.laptop'));
    }
}
