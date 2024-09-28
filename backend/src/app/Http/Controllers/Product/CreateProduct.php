<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * @OA\Post(
 *   path="/api/product/create",
 *   summary="Create Product",
 *   tags={"Product"},
 *   security={{"bearerAuth": {}}},
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
class CreateProduct extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required',
        ]);
        $dataInput = $request->all();
        do {
            $code = Str::random(5);
            $exists = Product::where('code', $code)->first();
        } while ($exists);
        Product::create([
            'code' => $code,
            'name' => $dataInput['name'],
            'price' => $dataInput['price'],
            'stock' => 0
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
