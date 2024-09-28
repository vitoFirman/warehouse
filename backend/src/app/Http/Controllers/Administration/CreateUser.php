<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;

/**
 * @OA\Post(
 *   path="/api/administration/user/create",
 *   summary="Create New User",
 *   tags={"Administration"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="User Data",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="name",
 *             type="string",
 *             example="john doe"
 *           ),
 *           @OA\Property(
 *             property="email",
 *             type="string",
 *             example="john@gmail.com"
 *           ),
 *           @OA\Property(
 *             property="password",
 *             type="string",
 *             example="punt3n123"
 *           ),
 *           @OA\Property(
 *             property="confirm_password",
 *             type="string",
 *             example="punt3n123"
 *           ),
 *           @OA\Property(
 *             property="role",
 *             type="string",
 *             example="staff"
 *           ),
 *           @OA\Property(
 *             property="first_name",
 *             type="string",
 *             example="Jhon"
 *           ),
 *           @OA\Property(
 *             property="last_name",
 *             type="string",
 *             example="Doe"
 *           ),
 *           @OA\Property(
 *             property="address",
 *             type="string",
 *             example="Jalan Tebet Barat I no 3"
 *           ),
 *           @OA\Property(
 *             property="city",
 *             type="string",
 *             example="Jakarta Selatan"
 *           )
 *         )
 *       )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success Created",
 *       @OA\JsonContent()
 *   ),
 *   @OA\Response(
 *       response="400",
 *       description="Invalid Values",
 *       @OA\JsonContent()
 *   ),
 *   @OA\Response(
 *       response="500",
 *       description="Internal Server Error",
 *       @OA\JsonContent()
 *   )
 * )
 */
class CreateUser extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
            'role' => 'required',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
        ]);
        $userData = $request->only(['name', 'email', 'password', 'role']);
        $profileData = $request->only(['first_name', 'last_name', 'address', 'city']);
        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => $userData['password'],
            'role' => $userData['role']
        ]);
        if ($user) {
            UserProfile::create([
                'userid' => $user->id,
                'first_name' => $profileData['first_name'],
                'last_name' => $profileData['last_name'],
                'address' => $profileData['address'],
                'city' => $profileData['city'],
                'photo' => null,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $user
            ]);
        }
    }
}
