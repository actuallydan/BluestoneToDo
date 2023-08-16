import Button from "../../components/Button";

export default function NoRows({ handleOpenAddModal }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <p className="mb-4">No tasks to display</p>
      <Button color="success" onClick={handleOpenAddModal}>
        Add task +
      </Button>
    </div>
  );
}
