<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Post(
 *   path="/api/user/update-password",
 *   summary="Update Password For Users",
 *   tags={"User"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="All Request Body For User",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="current_password",
 *             type="string",
 *             example=""
 *           ),
 *           @OA\Property(
 *             property="new_password",
 *             type="string",
 *             example=""
 *           ),
 *           @OA\Property(
 *             property="new_password_confirmation",
 *             type="string",
 *             example=""
 *           )
 *         )
 *       )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success Update",
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
class UpdatePassword extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required',
            'new_password_confirmation' => 'required|same:new_password',
        ]);
        $dataInput = $request->all();
        $user = $request->user();
        if (!Hash::check($dataInput['current_password'], $user->password)) {
            return response()->json([
                'status' => 403,
                'message' => 'Current Password Incorrect'
            ], 403);
        }
        $user->password = $dataInput['new_password'];
        $user->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
