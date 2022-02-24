import "./AddSecretsForm.css";
import { useEffect, useState } from "react";
import { secretsCreated } from "../../redux/actions";
import store from "../../redux/store";
import axios from "axios";
function AddSecretsForm({
  addSecretsFormOpen,
  setAddSecretsFormOpen,
  activeSafeId,
  setLoading,
}) {
  const [inputs, setInputs] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (e) => {
    setInputs(e.target.value);
  };
  useEffect(() => {
    setIsDisabled(true);
    if (inputs) setIsDisabled(false);
  }, [inputs]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // store.dispatch(secretsCreated({ safeId: activeSafeId, secret: inputs }));
    var data = JSON.stringify({
      secret: inputs,
    });
    setLoading(true);
    var config = {
      method: "patch",
      url: `http://localhost:3002/Safes/create-secret/${activeSafeId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    closeForm();
  };
  const closeForm = () => {
    setAddSecretsFormOpen(false);
    setInputs("");
  };
  const charAllow = (e) => {
    setInputs(e.target.value.replace(/[^a-zA-Z0-9]/gi, ""));
  };
  if (!addSecretsFormOpen) return null;
  return (
    <>
      <div className="overLayStyle" />
      <form className="secrets-form" onSubmit={handleSubmit}>
        <h1 className="secrets-form__heading">Add Folder</h1>
        <div className="input-group">
          <label htmlFor="name" className="folderNameOnInput">
            Folder Name
          </label>
          <input
            className="inputSecretName"
            name="secretName"
            type="text"
            value={inputs}
            onChange={(handleChange, charAllow)}
            placeholder="Folder Name"
          />
          <div className="input-help">
            Please enter lowercase alphabets, numbers and underscores only.
          </div>
        </div>
        <div className="secrets-form__button-group">
          <button className="button buttonCancel" onClick={closeForm}>
            Cancel
          </button>
          <button className="button" disabled={isDisabled}>
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default AddSecretsForm;
