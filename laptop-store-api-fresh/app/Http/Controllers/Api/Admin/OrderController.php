<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    /**
     * GET /api/admin/orders — every order in the system, newest first.
     * Optional ?status=pending filter.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.laptop'])->latest();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return response()->json($query->paginate(15));
    }

    /**
     * GET /api/admin/orders/{order}
     */
    public function show(Order $order)
    {
        return response()->json($order->load(['user', 'items.laptop']));
    }

    /**
     * PATCH /api/admin/orders/{order}/status { status }
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['pending', 'processing', 'completed', 'cancelled'])],
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json(['message' => 'Order status updated.', 'order' => $order]);
    }
}
