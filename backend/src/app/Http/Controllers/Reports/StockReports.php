<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\StockIn;
use App\Models\StockOut;
use Illuminate\Http\Request;

/**
 * @OA\Get(
 *   path="/api/reports/stock/{month}",
 *   summary="Stock Reports",
 *   tags={"Reports"},
 *   security={{"bearerAuth": {}}},
 *   @OA\Parameter(
 *     name="month",
 *     in="path",
 *     description="input the param this-month or previous-month",
 *     required=true,
 *     @OA\Schema(
 *        type="string"
 *      )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success",
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
class StockReports extends Controller
{
    protected $stockIn;
    protected $stockOut;

    public function __construct(StockIn $stockIn, StockOut $stockOut)
    {
        $this->stockIn = $stockIn;
        $this->stockOut = $stockOut;
    }

    public function __invoke(Request $request)
    {
        $month = $request->route('month');

        if ($month === 'this-month') {
            $startOfMonth = now()->startOfMonth();
            $endOfMonth = now()->endOfMonth();
        } else {
            $startOfMonth = now()->subMonth()->startOfMonth();
            $endOfMonth = now()->subMonth()->endOfMonth();
        }


        // Mengambil stok awal dari database
        $previousStock = $this->getPreviousStock($startOfMonth);

        // Mengambil data stok masuk dan keluar bulan ini
        $stocks = $this->stockIn->whereBetween('date_in', [$startOfMonth, $endOfMonth])
            ->with(['product'])
            ->get()
            ->groupBy('product_code');

        $report = $this->generateReport($stocks, $previousStock);
        return response()->json($report);
    }

    protected function getPreviousStock($startOfMonth)
    {
        return $this->stockIn->where('date_in', '<', $startOfMonth)
            ->with('product')
            ->get()
            ->groupBy('product_code')
            ->map(fn($items) => [
                'quantity_in_stock' => $items->sum('qty'),
            ]);
    }

    protected function generateReport($stocks, $previousStock)
    {
        return $stocks->map(function ($items) use ($previousStock) {
            $firstItem = $items->first();
            $productCode = $firstItem->product_code;

            // Menghitung stok awal
            $initialStock = $previousStock[$productCode]['quantity_in_stock'] ?? 0;

            return [
                'product_code' => $productCode,
                'product_name' => $firstItem->product->name ?? 'N/A',
                'initial_stock' => $initialStock,
                'stock_in' => $items->sum('qty'),
                'stock_out' => $this->getQuantityOut($productCode),
                'unit_price' => $firstItem->product->unite_price ?? 0,
                'final_stock' => $initialStock + $items->sum('qty') - $this->getQuantityOut($productCode),
            ];
        });
    }

    protected function getQuantityOut($productCode)
    {
        return $this->stockOut->where('product_code', $productCode)->sum('qty');
    }
}
