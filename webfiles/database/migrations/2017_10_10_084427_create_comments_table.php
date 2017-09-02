<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ticketId')->unsigned();
            $table->string('comment');
            $table->string('author');
			$table->datetime('updated_at');
			$table->datetime('created_at');
        });

		Schema::table('comments', function (Blueprint $table) {
			$table->foreign('ticketId')->references('id')->on('tickets');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::dropIfExists('comments');
    }
}
