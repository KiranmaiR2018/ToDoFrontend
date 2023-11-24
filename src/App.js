// import useState(to manage state in functional components)
// & useEffect to render(Fetching Backend Database)
import { useEffect, useState } from "react";
// import Axios which is a popular JavaScript library for making HTTP requests from a web browser
import axios from "axios";
// import child components
import { Header } from "./components/Header";
import { AddTask } from "./components/AddTask";
import { ShowTask } from "./components/ShowTask";
import "./App.css";

function App() {
  //Adding tasks using useState through parent component
  const [tasklist, setTasklist] = useState([]);
  //const [errors, setErrors] = useState("");
  //useEffect() to render the page from backend
  // axios.get() fetches the task list API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/todos")
      .then((res) => setTasklist(res.data));
    //.catch((err) => setErrors(err.message));
  }, []);

  // perform edit or delete on individual tasks
  // for that create a new object "task"
  const [task, setTask] = useState({});

  return (
    <div className="App">
      <Header />
      {/*pass the object data to child components by creating props*/}
      <AddTask
        tasklist={tasklist}
        setTasklist={setTasklist}
        task={task}
        setTask={setTask}
      />
      <ShowTask
        tasklist={tasklist}
        setTasklist={setTasklist}
        task={task}
        setTask={setTask}
      />
    </div>
  );
}

export default App;
