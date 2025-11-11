import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { Todo } from "./ReduxExamples/todos/TodoList";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-array-state-variables" className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3">Array State Variable</h2>
          <ListGroup>
            {todos.map((todo: Todo) => (
              <ListGroupItem key={todo.id}>
                {todo.title}
              </ListGroupItem>
            ))}
          </ListGroup>
      <hr />
          <button className="btn btn-success mb-3" onClick={addElement}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Element
          </button>

          <ul className="list-group">
            {array.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteElement(index)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
}