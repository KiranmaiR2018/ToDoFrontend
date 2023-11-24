// import Axios which is a popular JavaScript library for making HTTP requests from a web browser
import axios from "axios";
// Working Functionality of "ADD" Button
// Pass the Props
export const AddTask = ({ tasklist, setTasklist, task, setTask }) => {
  const handleSubmit = (event) => {
    //prevent the event from reloading
    event.preventDefault();
    //if a task is holding id, then it is a edit task
    //else it is a newly added task
    // Updating the task in the tasklist
    if (task.id) {
      // create a new list with the updated task
      const updateTasklist = tasklist.map((todo) =>
        todo.id === task.id
          ? {
              id: task.id,
              task: task.name,
              progress: task.progress,
            }
          : todo
      );
      setTasklist(updateTasklist);
      // Creat a new object to "PATCH" the updated task information
      const updatedTodo = {
        ...tasklist,
        task: task.task,
        progress: task.progress,
      };
      // PATCH request:axios.patch() updates only a part of a resource rather than the entire resource.
      axios.patch("http://127.0.0.1:8000/todos/" + task.id, updatedTodo);
      // Clearing the input fields
      setTask({});
    }
    // Adding the new task to the list of tasks
    else {
      //Create a new "task details" object
      const newTask = {
        task: event.target.task.value,
        progress: task.progress,
      };
      //add the new task to existing tasks list
      const data = setTasklist([...tasklist, newTask]);
      console.log(data);
      // POST request: axios.post() adds(post) the new data to the server API
      axios.post("http://127.0.0.1:8000/todos", newTask);
      // Clearing the input fields
      setTask({});
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={task.name || "" || task.task} /* || "" */
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          autoComplete="off"
          placeholder="add task"
          maxLength="25"
        />
        <select
          onChange={(e) => setTask({ ...task, progress: e.target.value }) || ""}
        >
          <option>Select</option>
          <option value={false}>Pending</option>
          <option value={true}>Completed</option>
        </select>

        <button type="submit">{task.id ? "Update" : "Add"}</button>
      </form>
    </section>
  );
};
