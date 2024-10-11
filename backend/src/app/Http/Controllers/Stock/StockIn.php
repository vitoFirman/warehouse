<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockIn as ModelsStockIn;
use App\Models\Suplier;
use Illuminate\Http\Request;

/**
 * @OA\Post(
 *   path="/api/stock/in",
 *   summary="Stock In",
 *   tags={"Stock"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="All Request Body For Stock in",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="product_code",
 *             type="string",
 *             example=""
 *           ),
 *           @OA\Property(
 *             property="qty",
 *             type="integer",
 *             example="0"
 *           ),
 *           @OA\Property(
 *             property="supplier_code",
 *             type="string",
 *             example=""
 *           ),
 *           @OA\Property(
 *             property="date_in",
 *             type="string",
 *             format="date",
 *             example="2024-09-26" 
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
class StockIn extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'product_code' => 'required|string|exists:products,code',
            'supplier_code' => 'required|string|min:1|exists:supliers,code',
            'qty' => 'required|integer|min:1',
            'date_in' => 'nullable|date'
        ]);
        $dataInput = $request->all();
        $product = Product::where('code', $dataInput['product_code'])->first();
        $stockIn = ModelsStockIn::create([
            'product_code' => $dataInput['product_code'],
            'qty' => $dataInput['qty'],
            'suplier_code' => $dataInput['supplier_code'],
            'date_in' => $dataInput['date_in'] ? $dataInput['date_in'] : now()
        ]);
        if ($stockIn) {
            $product->stock += $stockIn->qty;
            $product->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
