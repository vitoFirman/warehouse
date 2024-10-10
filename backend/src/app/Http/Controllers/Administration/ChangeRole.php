<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;


/**
 * @OA\Post(
 *   path="/api/administration/change-role/{id}",
 *   summary="Change Role",
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
 *   @OA\RequestBody(
 *       description="All Request Body For User",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="role",
 *             type="string",
 *             example=""
 *           ),
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
class ChangeRole extends Controller
{
    public function __invoke(Request $request)
    {
        $id = $request->route('id');
        $user = User::where('id', $id)->first();
        $user->role = $request->role;
        $user->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success Change Role'
        ]);
    }
}
