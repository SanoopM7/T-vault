import "./AddSafeForm.css";
import safeLogo from "../icons/icon_safe.png";
import { useState } from "react";

function AddSafeForm({ addSafeFormOpen, setAddSafeFormOpen }) {
  const [safeName, setSafeName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [safeType, setSafeType] = useState("");
  const [safeDesc, setSafeDesc] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ safeName, ownerName, safeType });
  };

  if (!addSafeFormOpen) return null;

  return (
    <>
      <div className="overLayStyle" />

      <form className="safeForm" onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Safe</h1>
        <div className="safesFormInfo">
          <img src={safeLogo} alt="logo"></img>
          <p className="safeDesc">
            A Safe is a logical unit to store the secrets. All the safes are
            created within Vault. You can control access only at the safe level.
            As a vault administrator you can manage safes but cannot view the
            content of the safe.
          </p>
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Safe Name</label>
          <input
            id="name"
            type="text"
            className="input"
            placeholder="Safe Name"
            value={safeName}
            onChange={(e) => setSafeName(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="owner">Owner</label>
          <input
            id="owner"
            type="text"
            className="input"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="type">Type</label>
          <select
            className="input"
            id="type"
            value={safeType}
            onChange={(e) => setSafeType(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            type="text"
            className="textArea"
            rows="3"
            placeholder="Description"
            value={safeDesc}
            onChange={(e) => setSafeDesc(e.target.value)}
          ></textarea>
          <div className="inputHelp">Please add a minimum of 10 characters</div>
        </div>
        <div className="safesFormButtonGroup">
          <button
            className="button buttonCancel"
            onClick={() => setAddSafeFormOpen(false)}
          >
            Cancel
          </button>
          <button className="button">+ Create</button>
        </div>
      </form>
    </>
  );
}
export default AddSafeForm;
