<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Comment extends Model
{
    use Notifiable;

    protected $fillable = [
        'ticket_id', 'comment', 'author'
    ];

    public function ticket()
    {
        return $this->belongsTo('App\Ticket');
    }
}
