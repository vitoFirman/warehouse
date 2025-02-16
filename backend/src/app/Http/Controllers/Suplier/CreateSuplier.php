<?php

namespace App\Http\Controllers\Suplier;

use App\Http\Controllers\Controller;
use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


/**
 * @OA\Post(
 *   path="/api/suplier/create",
 *   summary="Create Suplier",
 *   tags={"Suplier"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="All Request Body For Suplier",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="name",
 *             type="string",
 *             example="PT komputer Jaya"
 *           ),
 *           @OA\Property(
 *             property="contact_person",
 *             type="string",
 *             example="Budi Tabuti"
 *           ),
 *           @OA\Property(
 *             property="phone",
 *             type="string",
 *             example="082233712925"
 *           ),
 *           @OA\Property(
 *             property="email",
 *             type="string",
 *             example="budi@gmail.com"
 *           ),
 *           @OA\Property(
 *             property="address",
 *             type="string",
 *             example="Jl Flamboyan no 4"
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
class CreateSuplier extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'contact_person' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string',
            'address' => 'required|string',
        ]);
        $dataInput = $request->all();
        do {
            $code = 'S' . strtoupper(Str::random(5));
            $exists = Suplier::where('code', $code)->first();
        } while ($exists);
        Suplier::create([
            'code' => $code,
            'name' => strtolower($dataInput['name']),
            'contact_person' => $dataInput['contact_person'],
            'phone' => $dataInput['phone'],
            'email' => $dataInput['email'],
            'address' => $dataInput['address'],
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
