<?php

namespace App\Http\Controllers\Suplier;

use App\Http\Controllers\Controller;
use App\Models\Suplier;
use Illuminate\Http\Request;

/**
 * @OA\Put(
 *   path="/api/suplier/update/{code}",
 *   summary="Update Suplier",
 *   tags={"Suplier"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="code",
 *     in="path",
 *     description="code For Suplier",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
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
class UpdateSuplier extends Controller
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
        $code = $request->route('code');
        $suplier = Suplier::where('code', $code)->first();
        $suplier->name = $dataInput['name'];
        $suplier->contact_person = $dataInput['contact_person'];
        $suplier->phone = $dataInput['phone'];
        $suplier->email = $dataInput['email'];
        $suplier->address = $dataInput['address'];
        $suplier->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success, Supplier Updated'
        ]);
    }
}
