<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suplier extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'name',
        'contact_person',
        'phone',
        'email',
        'address'
    ];

    public function stockIns()
    {
        return $this->hasMany(StockIn::class, 'supplier_code', 'code'); // 'code' adalah kolom di tabel stock_ins
    }
}
