<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 1. Retrieve all tasks from the database and return them to React
    public function index()
    {
        return response()->json(Task::latest()->get(), 200);
    }

    // 2. Store a new task in the database
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $task = Task::create([
            'text' => $request->text,
            'completed' => false
        ]);

        return response()->json($task, 201);
    }

    // 3. Toggle the task completion status (complete/incomplete)
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // Reverse the current completion status (true → false, false → true)
        $task->update([
            'completed' => !$task->completed
        ]);

        return response()->json($task, 200);
    }

    // 4. Permanently delete a task from the database
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task vanished from the database! ✨'], 200);
    }
}
