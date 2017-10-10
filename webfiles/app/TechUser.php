<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TechUser extends Model
{
    use Notifiable;

    protected $table = 'techusers';

    protected $fillable = [
        'id', 'displayName'
    ];

    public function assignedto()
    {
        return $this->hasMany('App\Ticket');
    }
}
