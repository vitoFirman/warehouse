<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_code',
        'qty',
        'suplier_id',
        'date_in'
    ];
}
