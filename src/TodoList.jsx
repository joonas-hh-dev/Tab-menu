import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState({ description: "", date: "" });
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTodo((prev) => ({ ...prev, [name]: value }));
    };

    const addTodo = () => {
        if (todo.description.trim() && todo.date) {
            setTodos([todo, ...todos]);
            setTodo({ description: "", date: "" });
        }
    };

    const deleteTodo = (indexToDelete) => {
        setTodos(todos.filter((_, index) => index !== indexToDelete));
    };

    return (
        <>
        <header className="todo-header">
            <h1>Simple Todolist</h1>
            </header>
            <div className="input-container">
                <span className="input-label">Add todo:</span>
                <label>Description:</label>
                <input
                name="description"
                onChange={handleChange}
                value={todo.description}
                />
                <label>Date:</label>
                <input
                name="date"
                onChange={handleChange}
                value={todo.date}
                />
            <button onClick={addTodo}>Add</button>
            </div>
            <TodoTable todos={todos} deleteTodo={deleteTodo} />
        </>
    );
}

export default TodoList;