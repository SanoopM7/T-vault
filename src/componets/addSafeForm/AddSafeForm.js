import "./AddSafeForm.css";
import safeLogo from "../icons/icon_safe.png";
import { useState, useEffect } from "react";
import store from "../../redux/store";
import { safeCreated } from "../../redux/actions";
import { useSelector } from "react-redux";

function AddSafeForm({ addSafeFormOpen, setAddSafeFormOpen, editSafeId }) {
  const [inputs, setInputs] = useState({
    safeType: "personal",
    safeDescription: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const safeLists = useSelector((state) => state.SafeReducer.safes);

  const handleChange = (event) => {
    setIsDisabled(true);

    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = { ...inputs, safeId: editSafeId };
    store.dispatch(safeCreated(data));
    closeForm();
  };
  const closeForm = () => {
    setAddSafeFormOpen(false);
    setInputs("");
  };
  let singleSafe = {};
  useEffect(() => {
    [singleSafe] = safeLists.filter((item, i) => item.id === editSafeId);
    if (singleSafe)
      setInputs({
        safeName: singleSafe.safeName,
        safeOwner: singleSafe.safeOwner,
        safeType: singleSafe.safeType,
        safeDescription: singleSafe.safeDescription,
      });
  }, [editSafeId]);

  useEffect(() => {
    console.log(inputs.safeDescription.length, "description");
    if (
      inputs.safeName &&
      inputs.safeOwner &&
      inputs.safeType &&
      inputs.safeDescription.length >= 10
    )
      setIsDisabled(false);
  }, [inputs]);

  return (
    <>
      <div className="overLayStyle" />

      <form className="safeForm" onSubmit={handleSubmit}>
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
            name="safeName"
            type="text"
            className="input"
            placeholder="Safe Name"
            value={inputs.safeName}
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="owner">Owner</label>
          <input
            name="safeOwner"
            type="text"
            className="input"
            placeholder="Owner Name"
            value={inputs.safeOwner}
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="type">Type</label>
          <select
            className="input"
            name="safeType"
            value={inputs.safeType}
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="safeDescription">Description</label>
          <textarea
            name="safeDescription"
            type="text"
            className="textArea"
            rows="3"
            placeholder="Description"
            value={inputs.safeDescription}
            onChange={handleChange}
          ></textarea>

          <div className="inputHelp">Please add a minimum of 10 characters</div>
        </div>
        <div className="safesFormButtonGroup">
          <button className="button buttonCancel" onClick={closeForm}>
            Cancel
          </button>
          <button className="button" disabled={isDisabled}>
            {editSafeId ? "Update" : "+ Create"}
          </button>
        </div>
      </form>
    </>
  );
}
export default AddSafeForm;
