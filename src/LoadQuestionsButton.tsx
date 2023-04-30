import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { LoadQuestions } from "./LoadQuestions";
import { Box } from "@mui/material";

export function LoadQuestionsButton({
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
        color={"secondary"}
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
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex" }}>
            <Box paddingTop={0.5} paddingRight={1}>
              <UploadFileIcon />
            </Box>
            Fragen Laden
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hier können Sie als .txt abgespeicherte Fragen laden.
            <strong>
              {" "}
              Ihre aktuellen Fragen werden dabei überschrieben.
            </strong>{" "}
            Speichern sie die aktuellen Fragen vorher, wenn Sie sie behalten
            möchten.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box padding={1}>
            <Button onClick={handleClose} color={"secondary"}>
              Abbrechen
            </Button>
            &nbsp;&nbsp;&nbsp;
            <LoadQuestions
              setQuestions={setQuestions}
              finishedCallback={() => setOpen(false)}
            />
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
