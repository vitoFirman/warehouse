<?php

namespace App\Http\Controllers\Suplier;

use App\Http\Controllers\Controller;
use App\Models\Suplier;
use Illuminate\Http\Request;

/**
 * @OA\Delete(
 *   path="/api/suplier/delete/{code}",
 *   summary="Delete Suplier",
 *   tags={"Suplier"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="code",
 *     in="path",
 *     description="Code For Suplier",
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
class DeleteSuplier extends Controller
{
    public function __invoke(Request $request)
    {
        $code = $request->route('code');
        $suplier = Suplier::where('code', $code)->first();
        if (!$suplier) {
            return response()->json([
                'status' => 403,
                'message' => 'Suplier not found'
            ], 403);
        }
        $suplier->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Suplier Deleted'
        ]);
    }
}
