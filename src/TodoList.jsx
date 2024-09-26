import { useState } from "react";

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
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{todo.date}</td>
                            <td>{todo.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TodoList;