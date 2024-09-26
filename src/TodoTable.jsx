import React from "react";

function TodoTable({ todos, deleteTodo }) {
    return (
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
                            <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}

export default TodoTable;