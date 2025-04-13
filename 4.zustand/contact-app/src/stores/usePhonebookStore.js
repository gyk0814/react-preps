import { create } from "zustand";

const usePhonebookStore = create((set) => ({
  contacts: [
    { id: 0, name: "John Doe", phoneNumber: "123-456-7890" },
    { id: 1, name: "Jane Smith", phoneNumber: "987-654-3210" },
  ],
  id: 0,
  addContact: (name, phoneNumber) =>
    set((state) => ({
      contacts: [...state.contacts, { id: state.id, name, phoneNumber }],
      id: state.id + 1,
    })),
  removeContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}));
export default usePhonebookStore;
