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
 *             property="supplier_name",
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
            'product_name' => 'required|string|exists:products,name',
            'supplier_name' => 'required|string|exists:supliers,name',
            'qty' => 'required|integer|min:1',
            'date_in' => 'nullable|date'
        ]);
        $dataInput = $request->all();
        $product = Product::where('name', strtolower($dataInput['product_name']))->first();
        $suplier = Suplier::where('name', strtolower($dataInput['supplier_name']))->first();
        $stockIn = ModelsStockIn::create([
            'product_code' => $product->code,
            'suplier_code' => $suplier->code,
            'qty' => $dataInput['qty'],
            'date_in' => $dataInput['date_in'] ? $dataInput['date_in'] : now(),
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
