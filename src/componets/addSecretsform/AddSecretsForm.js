import "./AddSecretsForm.css";
import { useState } from "react";
import { secretsCreated } from "../../redux/actions";
import store from "../../redux/store";
function AddSecretsForm({
  addSecretsFormOpen,
  setAddSecretsFormOpen,
  activeSafeId,
}) {
  const [inputs, setInputs] = useState("");
  const handleChange = (e) => {
    setInputs(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    store.dispatch(secretsCreated({ safeId: activeSafeId, secret: inputs }));
    console.log(inputs, "step1");
    closeForm();
  };
  const closeForm = () => {
    setAddSecretsFormOpen(false);
    setInputs("");
  };
  if (!addSecretsFormOpen) return null;
  return (
    <>
      <div className="overLayStyle" />
      <form className="secrets-form" onSubmit={handleSubmit}>
        <h1 className="secrets-form__heading">Add Folder</h1>
        <div className="input-group">
          <label htmlFor="name">Folder Name</label>
          <input
            name="secretName"
            type="text"
            value={inputs}
            onChange={handleChange}
            placeholder="Folder Name"
          />
          <div className="input-help">
            Please enter lowercase alphabets, numbers and underscores only.
          </div>
        </div>
        <div className="secrets-form__button-group">
          <button className="button button--inverse" onClick={closeForm}>
            Cancel
          </button>
          <button className="button" disabled="">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default AddSecretsForm;
