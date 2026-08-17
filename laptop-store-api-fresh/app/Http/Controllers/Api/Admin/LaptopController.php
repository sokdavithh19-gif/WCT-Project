<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Laptop;
use Illuminate\Http\Request;

class LaptopController extends Controller
{
    /**
     * GET /api/admin/laptops
     */
    public function index()
    {
        return response()->json(Laptop::latest()->paginate(15));
    }

    /**
     * POST /api/admin/laptops
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image_url' => ['nullable', 'url'],
        ]);

        $laptop = Laptop::create($validated);

        return response()->json(['message' => 'Laptop created.', 'laptop' => $laptop], 201);
    }

    /**
     * GET /api/admin/laptops/{laptop}
     */
    public function show(Laptop $laptop)
    {
        return response()->json($laptop);
    }

    /**
     * PUT/PATCH /api/admin/laptops/{laptop}
     */
    public function update(Request $request, Laptop $laptop)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'brand' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'stock' => ['sometimes', 'required', 'integer', 'min:0'],
            'image_url' => ['nullable', 'url'],
        ]);

        $laptop->update($validated);

        return response()->json(['message' => 'Laptop updated.', 'laptop' => $laptop]);
    }

    /**
     * DELETE /api/admin/laptops/{laptop}
     */
    public function destroy(Laptop $laptop)
    {
        $laptop->delete();

        return response()->json(['message' => 'Laptop deleted.']);
    }
}
