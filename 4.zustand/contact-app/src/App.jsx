import { useEffect, useState } from "react";
import "./App.css";
import { Box, Container, Grid, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import usePhonebookStore from "./stores/usePhonebookStore";
import PetsIcon from "@mui/icons-material/Pets";

function App() {
  const { contacts, filteredContacts, addFilteredContacts } =
    usePhonebookStore();
  const [showNewContact, setShowNewContact] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedContacts, setDisplayedContacts] = useState(contacts);

  useEffect(() => {
    if (searchTerm !== "") {
      setDisplayedContacts(filteredContacts);
    } else {
      setDisplayedContacts(contacts);
    }
  }, [filteredContacts, contacts]);

  return (
    <Box
      className="bg"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Container
        maxWidth="xs"
        disableGutters
        sx={{
          height: "90%",
          width: "95%",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: 5,
        }}
      >
        {showNewContact && (
          <ContactForm onClose={() => setShowNewContact(false)} />
        )}
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid
            item
            padding={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Typography variant="h4">Contacts</Typography>
            <PetsIcon
              fontSize="medium"
              color="action"
              sx={{ alignSelf: "center" }}
            />
          </Grid>
          <Grid
            item
            sx={{
              width: "100%",
              paddingLeft: 3,
              paddingBottom: 2,
              borderBottom: "1px solid #ccc",
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                padding: "4px 8px",
                width: "100%",
                maxWidth: 350,
                border: "1px solid #ccc",
              }}
            >
              <SearchIcon sx={{ color: "#757575", mr: 1 }} />
              <InputBase
                placeholder="Search…"
                fullWidth
                value={searchTerm}
                onChange={(e) => {
                  addFilteredContacts(e.target.value);
                  setSearchTerm(e.target.value);
                }}
                sx={{
                  fontSize: "1rem",
                }}
              />
            </Box>
            <AddIcon
              fontSize="large"
              color="action"
              onClick={() => setShowNewContact(true)}
            />
          </Grid>
        </Grid>
        <Grid
          padding={2}
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          sx={{ overflowY: "scroll" }}
        >
          {displayedContacts.map((contact, index) => (
            <ContactList key={index} contact={contact} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
