import { Button, Dialog, TextField } from "@mui/material";

export default function Modal({ isOpen, mode, description, handleUpdateDescription, closeDialog, handleSubmit }) {
    return (
        <Dialog open={isOpen}>
            <div style={{ width: "500px" }} className="d-flex flex-column p-4">
                <h6 className="mb-4">{mode} Task - Enter task description</h6>

                <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={handleUpdateDescription}
                    placeholder="give Beaker a treat"
                />
            </div>
            <div className="d-flex justify-content-between px-4 pb-4">
                <Button variant="outlined" onClick={closeDialog}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </Dialog>
    )
}