import axios from "axios";

// Access the props
export const ShowTask = ({ tasklist, setTasklist, task, setTask }) => {
  const handleEdit = (id) => {
    const selectedTask = tasklist.find((todo) => todo.id === id);
    // select the particular task using its id to perform the edit functionality
    setTask(selectedTask);
  };
  const handleDelete = (id) => {
    // Filter out the tasks so that particular task id will be deleted
    const updatedTaskList = tasklist.filter((todo) => todo.id !== id);
    // Delete request : axios.delete() to delete the particular task using its id
    axios.delete("http://127.0.0.1:8000/todos/" + id);
    setTasklist(updatedTaskList);
  };

  return (
    <section className="showTask">
      <div className="head">
        <div>
          <span className="title">Todo</span>
          <span className="count">{tasklist.length}</span>
        </div>
        <button onClick={() => setTasklist([])} className="clearAll">
          Clear All
        </button>
      </div>
      <div className="taskcard">
        <ul>
          {tasklist.map((todo) => (
            <li
              key={todo.id}
              className={todo.progress ? "completed" : "incomplete"}
            >
              <p>
                <span className="name">{todo.task}</span>
                <span className="time">{todo.createdDateTime}</span>
              </p>
              <i
                onClick={() => handleEdit(todo.id)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => handleDelete(todo.id)}
                className="bi bi-trash"
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
