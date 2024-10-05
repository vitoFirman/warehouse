<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;


/**
 * @OA\Get(
 *   path="/api/product/list/paginate",
 *   summary="Product List paginate",
 *   tags={"Product"},
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
class ProductListPaginate extends Controller
{
    public function __invoke()
    {
        $product = Product::paginate(6);
        return $product;
    }
}
