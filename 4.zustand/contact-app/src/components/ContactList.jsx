import React from "react";
import { Grid, Typography, Avatar, Box } from "@mui/material";
import usePhonebookStore from "../stores/usePhonebookStore";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = () => {
  const { contacts, id, addContact, removeContact } = usePhonebookStore();
  return (
    <>
      {contacts.map((contact) => (
        <>
          <Grid
            item
            key={contact.id}
            padding={1}
            paddingLeft={3}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{ width: "100%" }}
          >
            <Avatar
              alt="User Profile"
              src="https://via.placeholder.com/150" // 이미지 URL
              sx={{ width: 40, height: 40 }} // 사이즈 조절
            />

            <Typography variant="h6">{contact.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {contact.phoneNumber}
            </Typography>
          </Grid>
          <DeleteIcon color="error" onClick={() => removeContact(contact.id)} />
        </>
      ))}
    </>
  );
};

export default ContactList;
