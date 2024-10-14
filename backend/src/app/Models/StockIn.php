<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_code',
        'suplier_code',
        'qty',
        'date_in'
    ];

    // Menghubungkan dengan model Product berdasarkan product_code
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_code', 'code'); // 'code' adalah kolom di tabel products
    }

    // Menghubungkan dengan model Supplier berdasarkan supplier_code
    public function supplier()
    {
        return $this->belongsTo(Suplier::class, 'suplier_code', 'code'); // 'code' adalah kolom di tabel suppliers
    }
}
