<?php

namespace App\Http\Controllers\Suplier;

use App\Http\Controllers\Controller;
use App\Models\Suplier;

/**
 * @OA\Get(
 *   path="/api/suplier/list",
 *   summary="Suplier List",
 *   tags={"Suplier"},
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
class SuplierList extends Controller
{
    public function __invoke()
    {
        $suplier = Suplier::all();
        return $suplier;
    }
}
