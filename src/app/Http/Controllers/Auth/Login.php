<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Post(
 *   path="/api/auth/login",
 *   summary="Login For Clients",
 *   tags={"Authentication"},
 *   security={},
 *   @OA\RequestBody(
 *       description="All Request Body For Login",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="username",
 *             type="string",
 *             example="john doe"
 *           ),
 *           @OA\Property(
 *             property="password",
 *             type="string",
 *             example="punt3n123"
 *           )
 *         )
 *       )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success Login",
 *       @OA\JsonContent()
 *   ),
 *   @OA\Response(
 *       response="400",
 *       description="Invalid Username Or Password",
 *       @OA\JsonContent()
 *   ),
 *   @OA\Response(
 *       response="500",
 *       description="Internal Server Error",
 *       @OA\JsonContent()
 *   )
 * )
 */
class Login extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);
        $userData = User::where('name', $request->username)->first();
        if (!Hash::check($request->password, $userData?->password) || !$userData) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Username Or Password'
            ], 401);
        }
        if ($userData->role === 'admin') {
            $token = $userData->createToken('token', ['manage-users', 'manage-stock', 'manage-suplier']); //admin
        } else {
            $token = $userData->createToken('token', ['manage-stock', 'view-suplier']); //staff
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success Login',
            'token' => $token->plainTextToken
        ]);
    }
}
