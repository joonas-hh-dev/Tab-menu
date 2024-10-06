import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import 'ag-grid-community/styles/agGridMaterialFont.css';
import { Box, Button, Stack, Tab, TextField } from '@mui/material';
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TabContext, TabList, TabPanel } from '@mui/lab';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ desc: "", priority: "", date: null });
  const gridRef = useRef();
  const [value, setValue] = useState('1');

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
      const formattedTodo = {
        ...todo,
        date: todo.date.format("YYYY-MM-DD"),
      };
      setTodos([...todos, formattedTodo]);
      setTodo({ desc: "", priority: "", date: null });
    } else {
      alert("Fill in all fields!");
    }
  };

  const handleDateChange = (newDate) => {
    setTodo({ ...todo, date: newDate });
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id));
    }
    else {
      alert('Select a row first!');
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <TabContext value={value}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={handleChange}>
        <Tab label="Home" value="1" />
        <Tab label="Todos" value="2" />
      </TabList>
    </Box>
    <TabPanel value="1">Welcome to my todo app!</TabPanel>
    <TabPanel value="2">
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <TextField
          placeholder="Description"
          onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
          value={todo.desc} />
          <DatePicker
          placeholder="Date"
          value={todo.date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />} />
          <TextField
          placeholder="Priority"
          onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
          value={todo.priority} />
          <Button onClick={addTodo}>Add</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </Stack>
        <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
          <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single" />
        </div>
      </LocalizationProvider>
    </TabPanel>
  </TabContext>
  );
}

export default TodoList;
