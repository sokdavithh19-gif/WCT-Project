<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * GET /api/admin/users
     */
    public function index()
    {
        return response()->json(User::latest()->paginate(15));
    }

    /**
     * PATCH /api/admin/users/{user}/role { role }
     * The only supported way to grant admin access — done by an
     * existing admin, never via self-registration.
     */
    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['admin', 'user'])],
        ]);

        $user->update(['role' => $validated['role']]);

        return response()->json(['message' => 'User role updated.', 'user' => $user]);
    }
}
