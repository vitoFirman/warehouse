<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;

/**
 * @OA\Delete(
 *   path="/api/administration/user/delete/{id}",
 *   summary="Delete User",
 *   tags={"Administration"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     description="id For User",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success Deleted",
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
class DeleteUser extends Controller
{
    public function __invoke(Request $request)
    {
        $id = $request->route('id');
        $user = User::where('id', $id)->first();
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Cant Deleted admin user'
            ]);
        }
        $profile = UserProfile::where('userid', $id)->first();
        $profile->delete();
        $user->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Deleted User Successfully'
        ]);
    }
}
