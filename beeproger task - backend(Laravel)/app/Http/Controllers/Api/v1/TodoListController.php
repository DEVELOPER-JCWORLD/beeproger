<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoListRequest;
use App\Http\Resources\TodoListResource;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $TodoList = TodoList::paginate(5);

        return TodoListResource::collection($TodoList);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $CreateTodoList = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required',
        ]);

        if ($request->hasFile('image')) {
            $CreateTodoList['image'] = $request->file('image')
                ->store('todo-image', 'public');
        }

        $createTodo = TodoList::create($CreateTodoList);

        return new TodoListResource($createTodo);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Showsingle = TodoList::findOrFail($id);

        return new TodoListResource($Showsingle);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $UpdateTodoList1 = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required',
        ]);

        if ($request->hasFile('image')) {
            $UpdateTodoList1['image'] = $request->file('image')
                ->store('todo-image', 'public');
        }

        $UpdateTodoList =  TodoList::whereId($id)->update($UpdateTodoList1);
        if (!$UpdateTodoList == 1) {
            return 'Update Error';
        }

        return 'Updated Successful';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $DelTodoList = TodoList::findorFail($id);

        if ($DelTodoList->delete()) {

            return 'deleted successfully';
        }
    }

    public function markAsComplete($id)
    {
        $completed = TodoList::findorFail($id);

        if ($completed->update(['completed' => 1])) {

            return 'Task Mark As Complete';
        }
    }

    public function markAsInComplete($id)
    {
        $completed = TodoList::findorFail($id);

        if ($completed->update(['completed' => 0])) {

            return 'Task Mark As InComplete';
        }
    }

}
