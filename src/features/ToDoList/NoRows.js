import { Button } from "@mui/material";

export default function NoRows({ handleOpenAddModal }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <p className="mb-4">No rows</p>
      <Button variant="contained" onClick={handleOpenAddModal}>
        Add task
      </Button>
    </div>
  );
}
