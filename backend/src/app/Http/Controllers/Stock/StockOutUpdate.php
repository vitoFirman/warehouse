<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockOut;
use Illuminate\Http\Request;

/**
 * @OA\Put(
 *   path="/api/stock/out/update/{id}",
 *   summary="Update Stock Out",
 *   tags={"Stock"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     description="id For Stock Out",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
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
 *             example="2024-09-26" 
 *           )
 *         )
 *       )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success Updated",
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
class StockOutUpdate extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|exists:products,name',
            'qty' => 'required|integer|min:1',
            'date_out' => 'nullable|date'
        ]);

        $id = $request->route('id');
        $dataInput = $request->all();
        $stockOut = StockOut::where('id', $id)->first();
        $productByStockOut = Product::where('code', $stockOut->product_code)->first();
        $product = Product::where('name', strtolower($dataInput['product_name']))->first();
        $oldQty = $stockOut->qty;

        if ($dataInput['product_name'] === $productByStockOut->name) {
            $product->stock = max(0, $product->stock + $oldQty - $dataInput['qty']);
        } else {
            $product->stock = max(0, $product->stock - $dataInput['qty']);
            $productOld = Product::where('code', $stockOut->product_code)->first();
            $productOld->stock = max(0, $productOld->stock + $oldQty);
            $productOld->save();
        }

        $stockOut->product_code = $product->code;
        $stockOut->qty = $dataInput['qty'];
        $stockOut->date_out = $dataInput['date_out'];
        $stockOut->save();
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Success, Stock Out Updated'
        ]);
    }
}
