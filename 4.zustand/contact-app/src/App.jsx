import { useState } from "react";
import "./App.css";
import {
  Box,
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
  Dialog,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import usePhonebookStore from "./stores/usePhonebookStore";

function App() {
  const { contacts, filteredContacts, addFilteredContacts } =
    usePhonebookStore();
  const [newContact, setNewContact] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box
      sx={{
        height: "100dvh",
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
          height: "90vh",
          border: "1px solid #ccc",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {newContact && <ContactForm onClose={() => setNewContact(false)} />}
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid item padding={3}>
            <Typography variant="h4">Contacts</Typography>
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
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                addFilteredContacts(searchTerm);
              }}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  fontSize: "1rem",
                }}
              />
            </Box>
            <AddIcon
              fontSize="large"
              color="action"
              onClick={() => setNewContact(true)}
            />
          </Grid>
        </Grid>
        <Grid
          padding={2}
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <ContactList />
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
