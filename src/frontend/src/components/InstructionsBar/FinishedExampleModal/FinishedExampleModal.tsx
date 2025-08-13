import React, {useState} from "react";
import {Fade, Box, Backdrop, Typography} from "@mui/material";
import './styles.css';

interface Props {
  imgSrc: string;
}

export default function FinishedExampleModal({imgSrc}: Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handlePreview = () => setOpen(true);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography component='h3' variant='h6' color='secondary' data-testid='instructions-heading'>
        End Goal:
      </Typography>
      <Backdrop
        open={open}
        onClick={handleClose}
        transitionDuration={500}
        sx={{
          display: "flex",
          alignItems: "center",
          opacity: 50,
          justifyContent: "center",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Fade in={open} timeout={500}>
          <img
            src={imgSrc}
            alt="finished end product example"
            style={{maxHeight: "90%", maxWidth: "90%", outline: "none"}}
          />
        </Fade>
      </Backdrop>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
        <img
          className="img-thumbnail"
          onClick={handlePreview}
          src={imgSrc}
          alt="Completed end goal example"
          style={{maxHeight: "90%", maxWidth: "90%", outline: "none"}}
        />
      </Box>
    </Box>
  );
}
