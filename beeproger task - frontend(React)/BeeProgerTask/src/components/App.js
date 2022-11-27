import './App.css';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Header from './Header';
import TaskListContextProvider from '../context/TaskListContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import SingleTask from './singleTask';

function App() {
  return (
    <BrowserRouter>
      <TaskListContextProvider>
        <div className="container">
          <div className="app-wrapper">
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/todo/:id" element={<SingleTask />} />

              <Route path="/editTask/:id" element={<TaskForm />} />
            </Routes>
            
          </div>
        </div>
      </TaskListContextProvider>
    </BrowserRouter>
  );
}

export default App;
