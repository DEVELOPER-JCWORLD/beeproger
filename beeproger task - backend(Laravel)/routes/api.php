<?php

use App\Http\Controllers\Api\v1\TodoListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('todo-list', [TodoListController::class, 'index']);
Route::get('todo-list/{id}', [TodoListController::class, 'show']);
Route::post('todo-list', [TodoListController::class, 'store']);
Route::put('todo-list/{id}', [TodoListController::class, 'update']);
Route::put('todo-list/{id}/complete', [TodoListController::class, 'markAsComplete']);
Route::put('todo-list/{id}/incomplete', [TodoListController::class, 'markAsInComplete']);
Route::delete('todo-list/{id}', [TodoListController::class, 'destroy']);
