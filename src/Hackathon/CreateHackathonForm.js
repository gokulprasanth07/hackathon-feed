import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
import { TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


//pre defined tags
const TAGS = [
    'hackathon',
    'front-end',
    'back-end',
    'social-media',
    'analytics',
    'integration',
    'ai',
];

const style = {
    position: 'absolute',
    borderRadius: '6px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 520,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 32,
    p: 4,
};

const CreateHackathonForm = ({ newHack, setNewHack, addHackathonItemHandler }) => {
    const [open, setOpen] = React.useState(false);
    const [selectedTagsList, setSelectedTagsList] = React.useState([]);

    const actionHandler = () => {
        setOpen(false);
        addHackathonItemHandler();
    }

    const handleTagsChange = (event, selectedTags) => {
        setNewHack({ ...newHack, tags: selectedTags});
      };

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>Create a new Hackathon Idea</Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div>
                        <Button variant="contained" onClick={() => setOpen(true)}>Create a new Hackathon Idea</Button>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <Box sx={style}>
                                <Typography sx={{ color: 'grey' }}>please enter the hackathon details </Typography>
                                <br />
                                <TextField
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    required={true}
                                    value={newHack.title}
                                    onChange={(e) => setNewHack({ ...newHack, title: e?.target?.value })}
                                />
                                <br /><br />
                                <TextField
                                    id="desc"
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    required={true}
                                    value={newHack.desc}
                                    multiline
                                    rows={8}
                                    onChange={(e) => setNewHack({ ...newHack, desc: e?.target?.value })}
                                />
                                <br /> <br />

                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={TAGS}
                                    getOptionLabel={(option) => option}
                                    defaultValue={[TAGS[0]]}
                                    onChange={handleTagsChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="select the tags"
                                            placeholder="select the tags"
                                        />
                                    )}
                                />

                                <br /> <br />
                                <Button variant="contained" onClick={actionHandler}>
                                    Create Hack Idea
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateHackathonForm;