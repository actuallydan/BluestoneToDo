import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";

import NoRows from "./NoRows";
import Modal from "./Modal";

import TextField from "../../components/TextField";
import Button from "../../components/Button";

import { taskList } from "../../tasks";
import { colors } from "../../config/styles";

const modes = {
  ADD: "ADD",
  EDIT: "EDIT",
};

const initialDialogState = {
  mode: modes.ADD,
  isOpen: false
};

export default function ToDoList() {
  const [tasks, setTasks] = useState(taskList);
  const [description, setDescription] = useState("");
  const [selection, setSelection] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [mode, setMode] = useState(modes.ADD);

  const [dialogState, setDialogState] = useState(initialDialogState);


  const [search, setSearch] = useState("");

  /**
   * @description close the dialog
   */
  const closeDialog = () => {
    setDialogState({
      ...dialogState,
      isOpen: false
    })
  };

  /**
   * @description handler function for adding tasks
   */
  const handleOpenAddModal = () => {
    // set the description
    setDescription("");

    // update dialog state for adding a task
    setDialogState({
      mode: modes.ADD,
      isOpen: true
    })
  };

  /**
   * @description handler function for editing tasks
   */
  const handleOpenEditModal = () => {
    // set the description from the current selection
    const task = selection[0];
    setDescription(task.description);

    // update dialog state for editing
    setDialogState({
      mode: modes.EDIT,
      isOpen: true
    })
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
   */
  const handleSelection = (ids) => {
    const selectedTasks = tasks.filter((t) => ids.includes(t.id));

    setSelection(selectedTasks);
  };

  /**
   * @description function for submitting from the dialog
   */
  const handleSubmit = () => {
    if (dialogState.mode === modes.ADD) {
      createTask();
      return;
    }

    updateTask();
  };

  /**
   * @description function to create a task for the toDo list
   */
  const createTask = () => {

    // if there are no items, lastId becomes -Infinity, which is bad for an ID and also creates a unique key violation when rendering
    const lastId = tasks.length !== 0 ? Math.max(...tasks.map((t) => t.id)) : -1;

    const newId = lastId + 1;

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
      // column name gets ellipsized on the smallest screen sizes, consider hiding altogether under certain width?
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

        // strike through task to reinforce that it's been completed, for fun?
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
      <div className="d-flex flex-column align-items-center mt-4">
        <div
          style={{
            width: "min(calc(100% - 1rem), 500px)",
            height: filteredTasks.length === 0 ? "250px" : "65dvh",
          }}
        >

          {/* header with controls */}
          <header className="d-flex justify-content-between mb-2 align-items-center">
            <h2 className="mb-0">Tasks</h2>
            <div className="d-flex justify-content-end">
              <Button
                className="ms-2 my-2"
                onClick={handleOpenAddModal}
                color="success"
              >
                Add
              </Button>
              <Button
                className="ms-2 my-2"
                onClick={handleOpenEditModal}
                disabled={!selection[0]}
              >
                Edit
              </Button>
              <Button
                className="ms-2 my-2"
                onClick={removeTask}
                disabled={!Boolean(selection[0])}
                color="error"
              >
                Remove
              </Button>
            </div>
          </header>

          {/* search bar to filter data list */}
          <TextField
            label="Search"
            value={search}
            onChange={handleSearch}
            placeholder="beaker"
            className="mb-4 w-100"
          />

          {/* the actual todo list */}
          <DataGrid
            onRowSelectionModelChange={handleSelection}
            rows={filteredTasks}
            columns={columns}
            disableColumnMenu={true}
            slots={{
              noRowsOverlay: () => (
                <NoRows handleOpenAddModal={handleOpenAddModal} />
              ),
            }}
            // autoHeight // doesn't have extra space when few items
            autoPageSize // doesn't cause layout shift, but you have to haev a concept of parent height
            sx={{
              borderColor: colors.lightGray,
              borderRadius: "0.5rem",
              '& .MuiTablePagination-displayedRows': {
                marginBottom: "0",
                display: filteredTasks.length === 0 ? "none" : "initial"
              }
            }}
          />
        </div>
      </div>

      <Modal
        {...dialogState}
        description={description}
        handleUpdateDescription={handleUpdateDescription}
        closeDialog={closeDialog}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
