<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Ticket extends Model {

    use Notifiable;

    protected $fillable = [
        'userid','issueTitle', 'os', 'description','status','priority','escalation'
    ];

}
