"use client";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { useParams } from "next/navigation";
import { CalendarUserType } from "@/app/interfaces/Calendar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InviteLink = ({ userType }: { userType: CalendarUserType }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(invite_link);
  };
  const hostname = process.env.NEXT_PUBLIC_SITE_URL;
  const { id } = useParams();
  const invite_link = `${hostname}?invite_code=${btoa(userType + "_" + id)}`;

  return (
    <Box sx={style}>
      <TextField
        InputProps={{
          readOnly: true,
        }}
        label={`Invite link for ${userType}`}
        variant="outlined"
        defaultValue={invite_link}
      />
      <IconButton onClick={handleClick} color="primary">
        <LinkIcon />
      </IconButton>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </Box>
  );
};

const InviteModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          color: "white",
        }}
        onClick={() => setOpen(true)}
      >
        Invite Link
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box>
          <InviteLink userType={CalendarUserType.parent} />
          <InviteLink userType={CalendarUserType.child} />
        </Box>
      </Modal>
    </>
  );
};

export { InviteModal };
