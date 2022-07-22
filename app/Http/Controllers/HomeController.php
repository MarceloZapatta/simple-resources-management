<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Return the list of resources
     *
     * @return void
     */
    public function index()
    {
        return view('resources.index');
    }
}
