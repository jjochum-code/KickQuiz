import React from "react";
import { Button, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface IProps {
  onClickCallBack: () => void;
}

export function AddStudent({ onClickCallBack }: IProps): JSX.Element {
  return (
    <Box paddingTop={2}>
      <Button
        onClick={onClickCallBack}
        variant="contained"
        sx={{ width: "100%" }}
      >
        <PersonAddIcon /> &nbsp;&nbsp; Schüler_in hinzufügen
      </Button>
    </Box>
  );
}
