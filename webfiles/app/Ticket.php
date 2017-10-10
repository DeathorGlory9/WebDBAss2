<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Ticket extends Model {

    use Notifiable;

    protected $fillable = [
        'userid','issueTitle', 'os', 'description','status','priority','escalation', 'assignedto'
    ];

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function assignedTo()
    {
        return $this->belongsTo('App\TechUser');
    }


}
