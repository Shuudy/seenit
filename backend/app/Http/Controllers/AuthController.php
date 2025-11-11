<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function login(LoginUserRequest $request): AuthResource|ErrorResource
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return new ErrorResource([
                'message' => 'Invalid credentials',
                'status_code' => 401,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $authData = [
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ];

        return new AuthResource($authData);
    }

    /**
     * Log the user out (Revoke the token).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return new SuccessResource([
            'message' => 'Logged out successfully',
        ]);
    }
}
