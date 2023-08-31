<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BudgetController;



//Insert de novos orçamentos
Route::post('/insert', [BudgetController::class, 'insert']);
Route::get('/search', [BudgetController::class, 'search']);
Route::get('/searchdate', [BudgetController::class, 'searchDate']);
Route::get('/edit/{id}', [BudgetController::class, 'showUpdate']);
Route::put('/update/{id}', [BudgetController::class, 'update']);
Route::delete('/destroy/{id}', [BudgetController::class, 'destroy']);

//home mostra todos os orçamentos
Route::get('/', [BudgetController::class, 'show']);

//Route::post('/budgets/insert')
