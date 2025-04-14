import { FilterRounded } from "@mui/icons-material";
import { create } from "zustand";
import luca from "../assets/luca.png";
import luca2 from "../assets/luca2.png";
import luca3 from "../assets/luca3.png";

const usePhonebookStore = create((set) => ({
  contacts: [
    { id: 0, name: "Luca", phoneNumber: "010-1004-1004", img: luca },
    { id: 1, name: "저희 고영희", phoneNumber: "987-654-3210", img: luca2 },
    { id: 2, name: "루카입니다❤️", phoneNumber: "010-1234-5678", img: luca3 },
  ],
  filteredContacts: [],
  id: 3,
  addFilteredContacts: (searchTerm) =>
    set((state) => ({
      filteredContacts: state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
  addContact: (name, phoneNumber, img) =>
    set((state) => ({
      contacts: [...state.contacts, { id: state.id, name, phoneNumber, img }],
      id: state.id + 1,
    })),
  removeContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}));
export default usePhonebookStore;
