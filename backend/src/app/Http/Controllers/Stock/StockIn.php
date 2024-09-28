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
 *             property="suplier_id",
 *             type="integer",
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
            'product_code' => 'required|string',
            'qty' => 'required|integer|min:1',
            'suplier_id' => 'required|integer|min:1|exists:supliers,id',
            'date_in' => 'nullable|date'
        ]);
        $dataInput = $request->all();
        $product = Product::where('code', $dataInput['product_code'])->first();
        $suplier = Suplier::where('id', $dataInput['suplier->id'])->first();
        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product Code not found'
            ]);
        }
        if (!$suplier) {
            return response()->json([
                'status' => 404,
                'message' => 'Suplier Id not found'
            ]);
        }
        $stockIn = ModelsStockIn::create([
            'product_code' => $dataInput['product_code'],
            'qty' => $dataInput['qty'],
            'suplier_id' => $dataInput['suplier_id'],
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
