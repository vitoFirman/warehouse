<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Get(
 *   path="/api/administration/user/list",
 *   summary="User List",
 *   tags={"Administration"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Response(
 *       response=200,
 *       description="Success",
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
class UserList extends Controller
{
    public function __invoke()
    {
        $userLogin = Auth::user();
        $user = User::with('profile')->where('id', '!=', $userLogin->id)->get();
        return $user;
    }
}
