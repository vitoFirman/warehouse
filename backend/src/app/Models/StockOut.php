<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOut extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_code',
        'qty',
        'date_out'
    ];

    // Menghubungkan dengan model Product berdasarkan product_code
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_code', 'code'); // 'code' adalah kolom di tabel products
    }
}
