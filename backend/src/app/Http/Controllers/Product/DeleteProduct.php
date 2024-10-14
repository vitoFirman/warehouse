<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockIn;
use App\Models\StockOut;
use Illuminate\Http\Request;

/**
 * @OA\Delete(
 *   path="/api/product/delete/{code}",
 *   summary="Delete Product",
 *   tags={"Product"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="code",
 *     in="path",
 *     description="Code For Product",
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
class DeleteProduct extends Controller
{
    public function __invoke(Request $request)
    {
        $code = $request->route('code');
        $product = Product::where('code', $code)->first();
        if (!$product) {
            return response()->json([
                'status' => 403,
                'message' => 'Product not found'
            ], 403);
        }
        $stockIn = StockIn::where('product_code', $product->code)->first();
        $stockOut = StockOut::where('product_code', $product->code)->first();
        if ($stockIn) $stockIn->delete();
        if ($stockOut) $stockOut->delete();
        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Product Deleted'
        ]);
    }
}
