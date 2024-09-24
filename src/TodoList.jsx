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

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <>
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
            <button onClick={addTodo}>Lisää</button>
            <TodoTable todos={todos} onDelete={deleteTodo} />
        </>
    );
}

export default TodoList;