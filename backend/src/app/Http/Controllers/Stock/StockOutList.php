<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\StockIn;
use App\Models\StockOut;

/**
 * @OA\Get(
 *   path="/api/stock/out/list",
 *   summary="Stock out list",
 *   tags={"Stock"},
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
class StockOutList extends Controller
{
    public function __invoke()
    {
        $stock = StockOut::with(['product:code,name'])->get();
        return $stock;
    }
}
