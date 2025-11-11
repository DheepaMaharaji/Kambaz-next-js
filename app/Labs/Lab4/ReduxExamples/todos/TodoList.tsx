


import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./todoForm";
import TodoItem from "./todoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export type Todo = { id: string; title: string };

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);


  return (
    <div className="container mt-4">
      <h3>Todo List</h3>
      <ListGroup>
        {/* Input form */}
        
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        
      </ListGroup>
    </div>
  );
}