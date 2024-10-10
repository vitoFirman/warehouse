<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Put(
 *   path="/api/profile/update",
 *   summary="Update Profile",
 *   tags={"Profile"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="All Request Body For Profile",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="first_name",
 *             type="string",
 *             example="John"
 *           ),
 *           @OA\Property(
 *             property="last_name",
 *             type="string",
 *             example="Doe"
 *           ),
 *           @OA\Property(
 *             property="address",
 *             type="string",
 *             example="Jl diponegoro no 41"
 *           ),
 *           @OA\Property(
 *             property="city",
 *             type="string",
 *             example="Jember"
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
class UpdateProfile extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required|string',
                'address' => 'required|string',
                'city' => 'required|string'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 422,
                'error' => $e->errors()
            ], 422);
        }

        $dataInput = $request->all();
        $profile = UserProfile::where('userid', Auth::user()->id)->first();
        $profile->first_name = $dataInput['first_name'];
        $profile->last_name = $dataInput['last_name'];
        $profile->address = $dataInput['address'];
        $profile->city = $dataInput['city'];
        $profile->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success Updated'
        ], 200);
    }
}
