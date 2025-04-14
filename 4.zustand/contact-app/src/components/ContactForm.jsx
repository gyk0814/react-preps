import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import { useState, useRef } from "react";
import usePhonebookStore from "../stores/usePhonebookStore";

function AddContactModal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { addContact } = usePhonebookStore();
  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg";
  const [image, setImage] = useState(defaultImage);

  const handleSubmit = () => {
    const img = image === defaultImage ? null : image;
    addContact(name, phone, img);
    onClose();
  };
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const formatPhoneNumber = (value) => {
    if (!value) return "";
    const numbers = value.replace(/\D/g, "");
    if (numbers.length < 4) return numbers;
    if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length < 11)
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(
        6
      )}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
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
        <Typography variant="h6">새 연락처 추가</Typography>
        <Avatar
          src={image}
          alt="profile"
          slotProps={{
            img: {
              onClick: handleAvatarClick,
            },
          }}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
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
            setPhone(formatPhoneNumber(e.target.value));
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
