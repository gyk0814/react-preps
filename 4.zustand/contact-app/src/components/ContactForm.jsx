import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import usePhonebookStore from "../stores/usePhonebookStore";

function AddContactModal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { addContact } = usePhonebookStore();

  const handleSubmit = () => {
    addContact(name, phone);
    onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 3,
          width: "90%",
          maxWidth: 300,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
          새 연락처 추가
        </Typography>
        <TextField
          fullWidth
          label="이름"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="전화번호"
          variant="outlined"
          size="small"
          value={phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, ""); // 숫자 이외 제거
            setPhone(onlyNums);
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={onClose}>취소</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!name.trim() || !phone.trim()}
          >
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddContactModal;
