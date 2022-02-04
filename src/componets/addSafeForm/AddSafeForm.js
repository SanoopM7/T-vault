import "./AddSafeForm.css";
import React, { useState } from "react";

function AddSafeForm({ open, onClose }) {
  const [safeName, setSafeName] = useState("");
  const [safeOwner, setSafeOwner] = useState("");
  const [safeType, setSafeType] = useState("");
  const [safeDesc, setSafeDesc] = useState("");

  if (!open) return null;

  return (
    <>
      <div className="overLayStyle" />
      <form className="safeForm">
        <label for="name">Safe Name</label>
        <input
          type="text"
          placeholder="Safe Name"
          value={safeName}
          onChange={(e) => {
            setSafeName(e.target.value);
          }}
        ></input>

        <button onClick={onClose}>close</button>
      </form>
    </>
  );
}
export default AddSafeForm;
