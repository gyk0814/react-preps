import React from "react";
import { Grid, Typography, Avatar, Box } from "@mui/material";
import usePhonebookStore from "../stores/usePhonebookStore";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = () => {
  const { contacts, filteredContacts, removeContact } = usePhonebookStore();
  const displayedContacts =
    filteredContacts.length > 0 ? filteredContacts : contacts;
  return (
    <>
      {displayedContacts.map((contact) => (
        <Grid
          className="contact-item"
          item
          key={contact.id}
          padding={1}
          paddingLeft={3}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          justifyContent="space-between"
          sx={{
            width: "100%",
            "&:hover .delete-icon": {
              visibility: "visible",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              alt="User Profile"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // 이미지 URL
              sx={{ width: 45, height: 45 }}
            />

            <Typography variant="h6">{contact.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {contact.phoneNumber}
            </Typography>
          </Box>
          <DeleteIcon
            className="delete-icon"
            color="error"
            onClick={() => removeContact(contact.id)}
            sx={{
              visibility: "hidden",
              cursor: "pointer",
            }}
          />
        </Grid>
      ))}
    </>
  );
};

export default ContactList;
