import { useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "../../components/Button";
import TextField from "../../components/TextField";

import { BORDER_RADIUS } from "../../config/styles";

export default function Modal({ isOpen, mode, description, handleUpdateDescription, closeDialog, handleSubmit }) {

    // const inputRef = useRef(null);

    useEffect(() => {
        // if(inputRef.current){
        //     inputRef.current.focus();
        // }
    }, []);

    return (
        <Dialog open={isOpen} onClose={closeDialog}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: BORDER_RADIUS,
                    margin: 0,
                    overflow: "hidden"
                }
            }}
        >
            <div style={{ width: "clamp(300px, calc(100vw - 1rem), 500px)" }} className="d-flex flex-column p-4">
                <h6 className="mb-4">{mode} Task - Enter task description</h6>

                <TextField
                    label="Description"
                    value={description}
                    onChange={handleUpdateDescription}
                    placeholder="give Beaker a treat"
                    sx={{
                        borderRadius: "3rem"
                    }}
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