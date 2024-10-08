<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'userid',
        'first_name',
        'last_name',
        'address',
        'city',
        'photo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userid');
    }
}
