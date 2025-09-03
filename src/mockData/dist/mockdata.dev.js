"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskService = exports.mockTasks = exports.mockUsers = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockUsers = [{
  user_id: 1,
  name: "Ali",
  last_name: "Ahmadi",
  email: "ali.ahmadi@example.com",
  password: "hashed_pw1",
  token: "token_abc1"
}, {
  user_id: 2,
  name: "Sara",
  last_name: "Mohammadi",
  email: "sara.mohammadi@example.com",
  password: "hashed_pw2",
  token: "token_def2"
}, {
  user_id: 3,
  name: "Reza",
  last_name: "Karimi",
  email: "reza.karimi@example.com",
  password: "hashed_pw3",
  token: "token_ghi3"
}, {
  user_id: 4,
  name: "Neda",
  last_name: "Jafari",
  email: "neda.jafari@example.com",
  password: "hashed_pw4",
  token: "token_jkl4"
}, {
  user_id: 5,
  name: "Mina",
  last_name: "Hossein",
  email: "mina.hossein@example.com",
  password: "hashed_pw5",
  token: "token_mno5"
}];
exports.mockUsers = mockUsers;
var mockTasks = [{
  task_id: 1,
  title: "Finish project report",
  due_date: "2025-09-01",
  status: "pending",
  user_id: 1,
  category: "work",
  description: "Complete the final report for the project and send to manager.",
  repeat: "none",
  time: "14:00:00",
  subtasks: JSON.stringify([{
    title: "Gather data",
    done: false
  }, {
    title: "Write draft",
    done: false
  }]),
  created_at: new Date().toISOString()
}, {
  task_id: 2,
  title: "Buy groceries",
  due_date: "2025-08-30",
  status: "in_progress",
  user_id: 2,
  category: "personal",
  description: "Buy fruits, vegetables, and milk from the supermarket.",
  repeat: "weekly",
  time: "10:00:00",
  subtasks: JSON.stringify([{
    title: "Check pantry",
    done: true
  }, {
    title: "Make shopping list",
    done: true
  }]),
  created_at: new Date().toISOString()
}, {
  task_id: 3,
  title: "Read 'Atomic Habits'",
  due_date: "2025-09-10",
  status: "completed",
  user_id: 1,
  category: "wishList",
  description: "Read the book 'Atomic Habits' for personal growth.",
  repeat: "monthly",
  time: "18:30:00",
  subtasks: JSON.stringify([]),
  created_at: new Date().toISOString()
}, {
  task_id: 4,
  title: "Gym workout",
  due_date: "2025-08-29",
  status: "in_progress",
  user_id: 3,
  category: "personal",
  description: "Attend morning gym session for 1 hour.",
  repeat: "daily",
  time: "07:00:00",
  subtasks: JSON.stringify([{
    title: "Warm-up",
    done: false
  }, {
    title: "Cardio",
    done: false
  }, {
    title: "Stretch",
    done: false
  }]),
  created_at: new Date().toISOString()
}, {
  task_id: 5,
  title: "Team meeting",
  due_date: "2025-09-02",
  status: "pending",
  user_id: 4,
  category: "work",
  description: "Monthly team meeting to discuss project milestones.",
  repeat: "monthly",
  time: "09:00:00",
  subtasks: JSON.stringify([{
    title: "Prepare slides",
    done: false
  }, {
    title: "Send invites",
    done: true
  }]),
  created_at: new Date().toISOString()
}, {
  task_id: 6,
  title: "Call dentist",
  due_date: "2025-08-31",
  status: "pending",
  user_id: 5,
  category: "personal",
  description: "Schedule a dental check-up appointment.",
  repeat: "none",
  time: "16:00:00",
  subtasks: JSON.stringify([]),
  created_at: new Date().toISOString()
}, {
  task_id: 7,
  title: "Plan vacation",
  due_date: "2025-09-15",
  status: "in_progress",
  user_id: 2,
  category: "wishList",
  description: "Plan summer vacation including flights and hotels.",
  repeat: "none",
  time: "12:00:00",
  subtasks: JSON.stringify([{
    title: "Choose destination",
    done: true
  }, {
    title: "Book flights",
    done: false
  }]),
  created_at: new Date().toISOString()
}, {
  task_id: 8,
  title: "Write blog post",
  due_date: "2025-09-05",
  status: "pending",
  user_id: 1,
  category: "work",
  description: "Write a blog post about productivity tips.",
  repeat: "weekly",
  time: "15:30:00",
  subtasks: JSON.stringify([{
    title: "Research topic",
    done: false
  }, {
    title: "Write draft",
    done: false
  }]),
  created_at: new Date().toISOString()
}, {
  task_id: 9,
  title: "Meditation",
  due_date: "2025-08-29",
  status: "completed",
  user_id: 3,
  category: "personal",
  description: "20-minute morning meditation session.",
  repeat: "daily",
  time: "06:30:00",
  subtasks: JSON.stringify([]),
  created_at: new Date().toISOString()
}, {
  task_id: 10,
  title: "Organize workspace",
  due_date: "2025-09-03",
  status: "pending",
  user_id: 4,
  category: "work",
  description: "Clean and organize office desk and files.",
  repeat: "none",
  time: "11:00:00",
  subtasks: JSON.stringify([{
    title: "Sort documents",
    done: false
  }, {
    title: "Clean desk",
    done: false
  }]),
  created_at: new Date().toISOString()
}];
exports.mockTasks = mockTasks;
var TaskService = {
  // Create
  createTask: function createTask(task) {
    var newTask = _objectSpread({}, task, {
      task_id: mockTasks.length ? mockTasks[mockTasks.length - 1].task_id + 1 : 1,
      created_at: new Date().toISOString()
    });

    mockTasks.push(newTask);
    return newTask;
  },
  // Read all
  getAllTasks: function getAllTasks() {
    return mockTasks;
  },
  // Read by user
  getTasksByUser: function getTasksByUser(user_id) {
    return mockTasks.filter(function (task) {
      return task.user_id === user_id;
    });
  },
  // Read one
  getTaskById: function getTaskById(task_id) {
    return mockTasks.find(function (task) {
      return task.task_id === task_id;
    });
  },
  // Update
  updateTask: function updateTask(task_id, updatedFields) {
    var index = mockTasks.findIndex(function (t) {
      return t.task_id === task_id;
    });
    if (index === -1) return null;
    mockTasks[index] = _objectSpread({}, mockTasks[index], {}, updatedFields);
    return mockTasks[index];
  },
  // Delete
  deleteTask: function deleteTask(task_id) {
    var index = mockTasks.findIndex(function (t) {
      return t.task_id === task_id;
    });
    if (index === -1) return false;
    mockTasks.splice(index, 1);
    return true;
  }
};
exports.TaskService = TaskService;