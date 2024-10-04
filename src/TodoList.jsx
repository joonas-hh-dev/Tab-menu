import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import 'ag-grid-community/styles/agGridMaterialFont.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ desc: "", priority: "", date: "" });
  const gridRef = useRef();

  const columnDefs = [
    { headerName: "Description", field: "desc", sortable: true, filter: true, flex: 1, floatingFilter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true, flex: 1, floatingFilter: true },
    {
      headerName: "Priority",
      field: "priority",
      sortable: true,
      filter: true,
      flex: 1,
      floatingFilter: true,
      cellStyle: (params) => (params.value === "High" ? { color: "red" } : { color: "black" }),
    },
  ];  

  const addTodo = () => {
    if (todo.desc && todo.priority && todo.date) {
      setTodos([...todos, { ...todo }]);
      setTodo({ desc: "", priority: "", date: "" });
    } else {
      alert("Fill in all fields!");
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };

  const columns = [
    { field: "desc", sortable: true, filter: true },
    { field: "priority", sortable: true, filter: true, 
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
    { field: "date", sortable: true, filter: true }
  ];

  return (
    <>
      <input
        placeholder="Description"
        onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
        value={todo.desc}
      />
      <input
        placeholder="Date"
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        value={todo.date}
      />
      <input
        placeholder="Priority"
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
        value={todo.priority}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={handleDelete}>Delete</button>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowData={todos}
        columnDefs={columnDefs}
        rowSelection="single"/>
      </div>
    </>
  );
};

export default TodoList;