<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

/**
 * @OA\Post(
 *   path="/api/product/update/{code}",
 *   summary="Update Product",
 *   tags={"Product"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="code",
 *     in="path",
 *     description="code For Product",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
 *   @OA\RequestBody(
 *       description="All Request Body For Product",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="name",
 *             type="string",
 *             example="indomie"
 *           ),
 *           @OA\Property(
 *             property="price",
 *             type="integer",
 *             example="3000"
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
class UpdateProduct extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required',
        ]);
        $dataInput = $request->all();
        $code = $request->route('code');
        $product = Product::where('code', $code)->first();
        $product->name = $dataInput['name'];
        $product->price = $dataInput['price'];
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
