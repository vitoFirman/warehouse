<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'name',
        'unite_price',
        'stock'
    ];

    // Menghubungkan dengan model StockIn berdasarkan product_code
    public function stockIns()
    {
        return $this->hasMany(StockIn::class, 'product_code', 'code'); // 'code' adalah kolom di tabel stock_ins
    }

    // Menghubungkan dengan model StockIn berdasarkan product_code
    public function stockOuts()
    {
        return $this->hasMany(StockOut::class, 'product_code', 'code'); // 'code' adalah kolom di tabel stock_ins
    }
}
