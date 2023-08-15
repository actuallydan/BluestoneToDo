import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox, TextField } from "@mui/material";

import NoRows from "./NoRows";
import Modal from "./Modal";

import { taskList } from "../../tasks";

const modes = {
  ADD: "ADD",
  EDIT: "EDIT",
};

export default function ToDoList() {
  const [tasks, setTasks] = useState(taskList);
  // text of the input field in the dialog
  const [description, setDescription] = useState("");
  // selected item/s
  const [selection, setSelection] = useState([]);
  // dialog visibility
  const [isOpen, setIsOpen] = useState(false);
  // whether we're adding or editing from the dialog
  const [mode, setMode] = useState(modes.ADD);

  const [search, setSearch] = useState("");

  /**
   * @description open the dialog
   */
  const openDialog = () => {
    setIsOpen(true);
  };

  /**
   * @description close the dialog
   */
  const closeDialog = () => {
    setIsOpen(false);
  };

  /**
   * @description handler function for adding tasks
   */
  const handleOpenAddModal = () => {
    // set the description
    setDescription("");
    // set the mode
    setMode(modes.ADD);
    // open the dialog
    openDialog();
  };

  /**
   * @description handler function for editing tasks
   */
  const handleOpenEditModal = () => {
    // set the description from the current selection
    const task = selection[0];
    setDescription(task.description);
    // set the mode
    setMode(modes.EDIT);
    // open the dialog
    openDialog();
  };

  /**
   * @description function that sets the description state variable
   * @param {event} event - change event from input
   */
  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  /**
   * @description function that sets the search state variable
   * @param {event} event - change event from input
   */
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  /**
   * @description handler function to set the selection state variable
   * @param {array} ids - array of IDs passed in from Grid select event
   * INSTRUCTIONS: use the js filter method to set the selection as an array of tasks
   */
  const handleSelection = (ids) => {
    const selectedTasks = tasks.filter((t) => ids.includes(t.id));

    setSelection(selectedTasks);
  };

  /**
   * @description function for submitting from the dialog
   * INSTRUCTIONS: use the mode to determine which function to call when
   * clicking the submit button
   */
  const handleSubmit = () => {
    if (mode === modes.ADD) {
      createTask();
      return;
    }

    updateTask();
  };

  /**
   * @description function to create a task for the toDo list
   * INSTRUCTIONS: use the description state variable to create a new task object
   * and add it with the setTasks hook
   */
  const createTask = () => {
    // get the highest ID value and increment it
    const newId = Math.max(...tasks.map((t) => t.id)) + 1;

    const newTask = {
      id: newId,
      description: description.trim(),
      complete: false,
    };

    setTasks([...tasks, newTask]);

    closeDialog();
  };

  /**
   * @description function to update an exsting task
   * INSTRUCTIONS: use the selection state variable and setTasks hook
   * with a js map to create a new task array
   */
  const updateTask = () => {
    if (selection.length === 0) {
      return;
    }

    // only update the first of the selected tasks just like in `handleOpenEditModal`
    const taskIndexToUpdate = tasks.findIndex((t) => t.id === selection[0].id);

    if (taskIndexToUpdate === -1) {
      return false;
    }

    const updatedTasks = [...tasks];

    const taskToUpdate = {
      ...updatedTasks[taskIndexToUpdate],
      description: description.trim(),
    };

    updatedTasks[taskIndexToUpdate] = taskToUpdate;

    setTasks(updatedTasks);

    closeDialog();
  };

  /**
   * @description method to remove an existing task
   * INSTRUCTIONS: use the selection state variable and setTasks hook
   * with a js filter to create a new task array
   */
  const removeTask = () => {
    if (selection.length === 0) {
      return;
    }

    const updatedTasks = tasks.filter((t) => t.id !== selection[0].id);

    setTasks(updatedTasks);
  };

  /**
   * @description method to mark a task as complete
   * @param {*} id the id of the task to mark as complete
   */
  const completeTask = (id) => {
    const taskIndexToUpdate = tasks.findIndex((t) => t.id === id);

    if (taskIndexToUpdate === -1) {
      return false;
    }

    const updatedTasks = [...tasks];

    const taskToUpdate = {
      ...updatedTasks[taskIndexToUpdate],
      complete: !updatedTasks[taskIndexToUpdate].complete,
    };

    updatedTasks[taskIndexToUpdate] = taskToUpdate;

    setTasks(updatedTasks);
  };

  // the Data grid columns - the renderCell will replace a cell's text with a React component - in this case a checkbox
  const columns = [
    {
      field: "complete",
      headerName: "Complete",
      flex: 0.3,

      renderCell: (params) => (
        <Checkbox
          checked={params.row.complete}
          onChange={() => completeTask(params.id)}
        />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => {
        const cellStyle = params.row.complete
          ? "text-decoration-line-through"
          : "";

        return <span className={cellStyle}>{params.value}</span>;
      },
    },
  ];

  const filteredTasks = tasks.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Main to do list */}
      <div className="d-flex flex-column align-items-center mt-4">
        <div
          style={{
            width: "500px",
            height: filteredTasks.length === 0 ? "250px" : "65dvh",
          }}
        >
          <header className="d-flex justify-content-between mb-2">
            <h2>To Do Items</h2>
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                className="ms-2 my-2"
                onClick={handleOpenAddModal}
                size="small"
                color="success"
              >
                Add
              </Button>
              <Button
                variant="contained"
                className="ms-2 my-2"
                // style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}
                onClick={handleOpenEditModal}
                disabled={!selection[0]}
                size="small"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                className="ms-2 my-2"
                // style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}
                onClick={removeTask}
                disabled={!Boolean(selection[0])}
                size="small"
                color="error"
              >
                Remove
              </Button>
            </div>
          </header>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            placeholder="beaker"
            className="mb-4 w-100"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000030",
              },
            }}
          />
          <DataGrid
            onRowSelectionModelChange={handleSelection}
            rows={filteredTasks}
            columns={columns}
            slots={{
              noRowsOverlay: () => (
                <NoRows handleOpenAddModal={handleOpenAddModal} />
              ),
            }}
            // autoHeight // doesn't have extra space when few items
            autoPageSize // doesn't cause layout shift, but you have to haev a concept of parent height
            sx={{
              borderColor: "#00000030",
              '& .MuiTablePagination-displayedRows': {
                marginBottom: "0",
                display: filteredTasks.length === 0 ? "none" : "initial"
              }
            }}
          />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        mode={mode}
        description={description}
        handleUpdateDescription={handleUpdateDescription}
        closeDialog={closeDialog}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
