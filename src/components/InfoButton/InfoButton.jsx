import React, { useState } from 'react';
import { Backdrop, Box, Modal, Fade, IconButton, Typography } from '@material-ui/core'; 
import { Help } from '@material-ui/icons';


const InfoButton = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton onClick={handleOpen} variant="outlined">
                <Help />            
            </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        <Typography variant="h5" component="h2">
                        How to use
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                        <br />
                        You can use your voice by holding the microphone icon to add transactions.
                        Try saying the following:  
                        Add 100 expense for food yesterday.
                        <br />
                        <br />
                        Pick and choose what transaction parameters you want and enjoy using the speech recognition function!
                        </Typography>
                    </Box>
                    </Fade>
                </Modal>
        </div>
    )
}

export default InfoButton
