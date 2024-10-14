<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockOut as ModelsStockOut;
use Illuminate\Http\Request;

/**
 * @OA\Post(
 *   path="/api/stock/out",
 *   summary="Stock Out",
 *   tags={"Stock"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="All Request Body For Stock Out",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="product_name",
 *             type="string",
 *             example=""
 *           ),
 *           @OA\Property(
 *             property="qty",
 *             type="integer",
 *             example="0"
 *           ),
 *           @OA\Property(
 *             property="date_out",
 *             type="string",
 *             format="date",
 *             example="" 
 *           )
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
class StockOut extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|exists:products,name',
            'qty' => 'required|integer|min:1',
            'date_out' => 'nullable|date'
        ]);
        $dataInput = $request->all();
        $product = Product::where('name', strtolower($dataInput['product_name']))->first();
        if ($dataInput['qty'] > $product->stock) {
            return response()->json([
                'status' => 403,
                'message' => 'the quantity of stock out exceeded for this product'
            ], 403);
        }
        $stockOut = ModelsStockOut::create([
            'product_code' => $product->code,
            'qty' => $dataInput['qty'],
            'date_out' => $dataInput['date_out'] ?? now(),
        ]);
        if ($stockOut) {
            $product->stock -= $stockOut->qty;
            $product->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
