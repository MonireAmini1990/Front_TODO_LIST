import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import "./mockData/testMock";


import Calendar from './components/Calendar';
import AddTask from './components/AddTask';
import LogIn from './components/LogIn';
import RepeatTask from './components/RepeatTask';
import SearchAndSort from './components/Search';
import Guest from './components/GuestLogin';
import TimeAndReminder from './components/TimeAndReminder';
import SignUp1 from './components/SignUp1';
import SignUp2 from './components/SignUp2';
import AboutMe from './components/AboutMe';
import TaskStatusSelector from './components/TaskStatus';
import MainPage from './components/MainPage';
import Welcome from './components/Welcome';
import EditTask from './components/EditTask';
import Footer from './components/Footer';
import AllTask from './components/AllTask';
import Personal from './components/Personal';
import WishList from './components/WishList';
import Work from './components/Work';

import { TaskProvider } from './context/TaskContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/guest-login" element={<Guest />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup1" element={<SignUp1 />} />
            <Route path="/signup2" element={<SignUp2 />} />
            <Route path="/AllTask" element={<AllTask />} />
            <Route path="/AddTask" element={<AddTask />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/repeat-task" element={<RepeatTask />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/search" element={<SearchAndSort />} />
            <Route path="/time-reminder" element={<TimeAndReminder />} />
            <Route path="/sub-task" element={<subtasks />} />
            <Route path="/task-status" element={<TaskStatusSelector />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/edit-task/:task_id" element={<EditTask />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/Personal" element={<Personal />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="/Work" element={<Work />} /> 
          </Routes>
        </Router>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
