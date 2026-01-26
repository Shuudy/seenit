<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle a registration request for SPA.
     */
    public function register(RegisterUserRequest $request): UserResource|ErrorResource
    {
        $validated = $request->validated();

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        auth()->login($user);

        return new UserResource($user);
    }

    /**
     * Handle an authentication attempt for SPA.
     */
    public function login(LoginUserRequest $request): UserResource|ErrorResource
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return new ErrorResource([
                'message' => 'Invalid credentials',
                'status_code' => 401,
            ]);
        }

        auth()->login($user);

        return new UserResource($user);
    }

    /**
     * Log the user out (Invalidate the session).
     */
    public function logout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new SuccessResource([
            'message' => 'Logged out successfully',
        ]);
    }
}
