import React from "react";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { LoadTeams } from "./Editor/Teams/LoadTeams";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface IProps {
  setTeamRed: Function;
  setTeamBlue: Function;
  sx?: SxProps<Theme>;
}

export function LoadTeamsButton({
  setTeamRed,
  setTeamBlue,
  sx,
}: IProps): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        onClick={handleClickOpen}
        sx={sx}
        color={"secondary"}
      >
        <UploadFileIcon />
        &nbsp;&nbsp; Teams Laden
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex" }}>
            <Box paddingTop={0.5} paddingRight={1}>
              <UploadFileIcon />
            </Box>
            <p>Teams Laden</p>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hier können Sie als .txt abgespeicherte Teams laden.
            <strong>
              {" "}
              Die aktuellen Teams werden dabei überschrieben.
            </strong>{" "}
            Speichern sie die Teams vorher, wenn Sie sie behalten möchten.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box padding={1}>
            <Button onClick={handleClose} color={"secondary"}>
              Abbrechen
            </Button>
            &nbsp;&nbsp;&nbsp;
            <LoadTeams
              setTeamBlue={setTeamBlue}
              setTeamRed={setTeamRed}
              finishedCallback={() => setOpen(false)}
            />
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
