<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockIn;
use App\Models\Suplier;
use Illuminate\Http\Request;

/**
 * @OA\Put(
 *   path="/api/stock/in/update/{id}",
 *   summary="Update Stock In",
 *   tags={"Stock"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     description="id For Stock In",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
 *   @OA\RequestBody(
 *       description="All Request Body For Stock In",
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
 *             property="supplier_name",
 *             type="string",
 *             example=""
 *           ),
 *           @OA\Property(
 *             property="qty",
 *             type="integer",
 *             example="0"
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
class StockInUpdate extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|exists:products,name',
            'supplier_name' => 'required|string|exists:supliers,name',
            'qty' => 'required|integer|min:1',
            'date_in' => 'nullable|date'
        ]);

        $id = $request->route('id');
        $dataInput = $request->all();
        $stockIn = StockIn::where('id', $id)->first();
        $productByStockIn = Product::where('code', $stockIn->product_code)->first();
        $product = Product::where('name', strtolower($dataInput['product_name']))->first();
        $supplier = Suplier::where('name', strtolower($dataInput['supplier_name']))->first();
        $oldQty = $stockIn->qty;
        if ($dataInput['product_name'] === $productByStockIn->name) {
            $product->stock = $product->stock - $oldQty + $dataInput['qty'];
        } else {
            $product->stock = $product->stock + $dataInput['qty'];
            $productOld = Product::where('code', $stockIn->product_code)->first();
            $productOld->stock = max(0, $productOld->stock - $oldQty);
            $productOld->save();
        }
        $stockIn->product_code = $product->code;
        $stockIn->suplier_code = $supplier->code;
        $stockIn->qty = $dataInput['qty'];
        $stockIn->date_in = $dataInput['date_in'];
        $stockIn->save();
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success, Stock In Updated'
        ]);
    }
}
