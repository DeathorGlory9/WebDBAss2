<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userid')->unsigned();
			$table->string('issueTitle');
			$table->string('os');
			$table->string('description');
			$table->string('status')->default("pending");
			$table->datetime('updated_at');
			$table->datetime('created_at');
        });

		Schema::table('tickets', function (Blueprint $table) {
			$table->foreign('userid')->references('id')->on('users');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
}
