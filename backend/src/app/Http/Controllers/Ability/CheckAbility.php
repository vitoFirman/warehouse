<?php

namespace App\Http\Controllers\Ability;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


/**
 * @OA\Get(
 *   path="/api/ability/check/{ability}",
 *   summary="Check Ability",
 *   tags={"Ability"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="ability",
 *     in="path",
 *     description="ability For User",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
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
class CheckAbility extends Controller
{
    public function __invoke(Request $request)
    {
        $ability = $request->route('ability');
        $user = $request->user();
        $hasAbility = $user->tokenCan($ability);
        if (!$hasAbility) {
            return response()->json([
                'hasAbility' => false
            ]);
        }
        return response()->json([
            'hasAbility' => true
        ]);
    }
}
