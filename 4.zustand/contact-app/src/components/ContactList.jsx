import React, { useEffect } from "react";
import { Grid, Typography, Avatar, Box } from "@mui/material";
import usePhonebookStore from "../stores/usePhonebookStore";
import DeleteIcon from "@mui/icons-material/Delete";
import bear from "../assets/bear.png";
import cat from "../assets/cat.png";
import star from "../assets/star.png";
import { useState } from "react";
const ContactList = ({ contact }) => {
  const { contacts, filteredContacts, removeContact } = usePhonebookStore();
  const profileImage = [bear, cat, star];
  return (
    <>
      <Grid
        className="contact-item"
        item
        key={contact.id}
        padding={0.7}
        paddingLeft={3}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          overflow: "auto",
          width: "100%",
          "&:hover .delete-icon": {
            visibility: "visible",
          },
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            alt="User Profile"
            src={
              contact.img
                ? contact.img
                : profileImage[contact.id % profileImage.length]
            }
            sx={{ width: 50, height: 50 }}
          />

          <Typography variant="h5">{contact.name}</Typography>
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
    </>
  );
};

export default ContactList;
