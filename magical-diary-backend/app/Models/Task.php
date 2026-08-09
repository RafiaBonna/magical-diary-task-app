<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // এই লাইনটি যুক্ত করা সবচেয়ে জরুরি!
    protected $fillable = ['text', 'completed'];
}
