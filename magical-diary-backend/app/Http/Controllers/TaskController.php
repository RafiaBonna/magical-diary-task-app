<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // ১. ডাটাবেস থেকে সব টাস্ক টেনে এনে রিয়্যাক্টকে দেওয়া
    public function index()
    {
        return response()->json(Task::latest()->get(), 200);
    }

    // ২. নতুন কোনো উইশ বা টাস্ক ডাটাবেসে সেভ করা
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

    // ৩. টাস্ক কমপ্লিট (দাগ কাটা) বা আন-কমপ্লিট করার স্ট্যাটাস আপডেট করা
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // বর্তমান স্ট্যাটাস যা আছে তার উল্টোটা করে দেবে (true থাকলে false, false থাকলে true)
        $task->update([
            'completed' => !$task->completed
        ]);

        return response()->json($task, 200);
    }

    // ৪. ডায়েরির কো To destory any wish of diary
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task vanished from the database! ✨'], 200);
    }
}
