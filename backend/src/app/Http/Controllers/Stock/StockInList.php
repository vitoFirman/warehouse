<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\StockIn;

/**
 * @OA\Get(
 *   path="/api/stock/in/list",
 *   summary="Stock in list",
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
class StockInList extends Controller
{
    public function __invoke()
    {
        $stock = StockIn::with(['product:code,name', 'supplier:code,name'])->get();
        return $stock;
    }
}
