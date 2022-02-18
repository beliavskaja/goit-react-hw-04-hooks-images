import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { createPortal } from "react-dom";
import "./Modal.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropDown = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Box className="Overlay" onClick={handleBackdropDown}>
      <div className="Modal">{children}</div>
    </Box>,
    modalRoot
  );
}
