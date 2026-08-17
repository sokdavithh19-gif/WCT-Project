<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Laptop;
use App\Models\Order;
use App\Models\User;

class DashboardController extends Controller
{
    /**
     * GET /api/admin/dashboard
     * High-level metrics for the admin dashboard landing page.
     */
    public function index()
    {
        return response()->json([
            'totals' => [
                'users' => User::where('role', 'user')->count(),
                'laptops' => Laptop::count(),
                'orders' => Order::count(),
                'revenue' => (float) Order::where('status', '!=', 'cancelled')->sum('total_price'),
            ],
            'orders_by_status' => Order::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status'),
            'low_stock_laptops' => Laptop::where('stock', '<=', 5)
                ->orderBy('stock')
                ->get(['id', 'name', 'brand', 'stock']),
            'recent_orders' => Order::with('user:id,name,email')
                ->latest()
                ->take(5)
                ->get(['id', 'user_id', 'total_price', 'status', 'created_at']),
        ]);
    }
}
