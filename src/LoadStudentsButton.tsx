import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { chooseFile } from "./fileLoaderFunctions";
import { LoadQuestions } from "./LoadQuestions";

export function LoadStudentsButton({
  setQuestions,
}: {
  setQuestions: Function;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        <UploadFileIcon />
        &nbsp;&nbsp; Fragen Laden
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Fragen Laden"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hier können Sie als .txt abgespeicherte Fragen laden.
            <strong>
              {" "}
              Ihre aktuellen Fragen werden dabei überschrieben.
            </strong>{" "}
            Speichern sie die aktuellen Fragen, wenn Sie sie behalten möchten.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <LoadQuestions
            setQuestions={setQuestions}
            finishedCallback={() => setOpen(false)}
          />
          {/*<Button onClick={handleClose} autoFocus>*/}
          {/*  Agree*/}
          {/*</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}
