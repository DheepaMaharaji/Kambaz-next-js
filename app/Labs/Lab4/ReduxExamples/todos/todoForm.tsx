// import { ListGroupItem,Button,FormControl } from "react-bootstrap";

// export default function TodoForm({ todo, setTodo, addTodo, updateTodo }: {
//   todo: { id: string; title: string };
//   setTodo: (todo: { id: string; title: string }) => void;
//   addTodo: (todo: { id: string; title: string }) => void;
//   updateTodo: (todo: { id: string; title: string }) => void;
// }) {
//   return (
//     <ListGroupItem>
//       <Button onClick={() => addTodo(todo)}
//               id="wd-add-todo-click"> Add </Button>
//       <Button onClick={() => updateTodo(todo)}
//               id="wd-update-todo-click"> Update </Button>
//       <FormControl value={todo.title}
//         onChange={ (e) => setTodo({ ...todo, title: e.target.value }) }/>
//     </ListGroupItem>
// );}
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { Todo } from "./TodoList";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
export default function TodoForm() {
      const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center gap-2">
      <FormControl
        placeholder="Enter todo..."
        value={todo.title}
        onChange={(e) =>  dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <Button variant="success" onClick={() => dispatch(addTodo(todo))}>Add</Button>
      <Button variant="warning" onClick={() =>dispatch(updateTodo(todo))}>Update</Button>
    </ListGroupItem>
  );
}