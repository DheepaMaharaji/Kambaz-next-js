// import { ListGroupItem,Button} from "react-bootstrap";

// export default function TodoItem({ todo, deleteTodo, setTodo }: {
//   todo: { id: string; title: string };
//   deleteTodo: (id: string) => void;
//   setTodo: (todo: { id: string; title: string }) => void;
// }) {
//   return (
//     <ListGroupItem key={todo.id}>
//       <Button onClick={() => deleteTodo(todo.id)}
//               id="wd-delete-todo-click"> Delete </Button>
//       <Button onClick={() => setTodo(todo)}
//               id="wd-set-todo-click"> Edit </Button>
//       {todo.title}    </ListGroupItem>);}
import { ListGroupItem, Button } from "react-bootstrap";
import { Todo } from "./TodoList";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({
  todo
}: {
  todo: Todo;
}) {
     const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <span className="fw-semibold">{todo.title}</span>
      <div className="d-flex gap-2">
        <Button variant="primary" size="sm" onClick={() => dispatch(setTodo(todo))}>Edit</Button>
        <Button variant="danger" size="sm" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>
      </div>
    </ListGroupItem>
  );
}