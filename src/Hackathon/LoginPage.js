import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Typography } from '@mui/material';

import HackathonImg from "./Images/hackathon.png";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 260,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 32,
    p: 4,
};

export default function BasicModal({ employeeId, setEmployeeId, isLoggedIn, setIsLoggedIn, employeeIds = { employeeIds } }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validateEmployeeId = () => {
        // console.log(">>> employeeIds", typeof (employeeIds[0]), typeof (employeeId));
        if (employeeIds.includes(Number(employeeId))) {
            localStorage.setItem("isUserLoggedIn", true);
            localStorage.setItem("employeeId", employeeId);
            setIsLoggedIn(true);
        } else {
            alert('Invalid employee id');
        }
        handleClose();
    }


    if (isLoggedIn) {
        return null;
    }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Log in</Button>
            <img src={HackathonImg} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <TextField
                        id="outlined-basic"
                        label="Employee Id"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e?.target?.value)}
                    />
                    <br /> <br />
                    <Button variant="contained" onClick={validateEmployeeId}>Login</Button>
                    <br /> <br />
                </Box>
            </Modal>
        </div>
    );
}
