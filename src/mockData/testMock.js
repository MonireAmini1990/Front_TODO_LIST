import { TaskService } from "./mockdata";

console.log(TaskService.getAllTasks());

const newTask = TaskService.createTask({
  title: "New Test Task",
  due_date: "2025-09-20",
  status: "pending",
  user_id: 1,
  category: "work",
  description: "Just testing CRUD mock",
  repeat: "none",
  time: "13:00:00",
  subtasks: JSON.stringify([]),
});
console.log("Created:", newTask);


const updated = TaskService.updateTask(1, { status: "completed" });
console.log("Updated:", updated);


const deleted = TaskService.deleteTask(2);
console.log("Deleted:", deleted);
