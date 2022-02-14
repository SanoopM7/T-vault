import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Safe.css";
import newFolderIcon from "../icons/icon-addfolder.png";
import folderIcon from "../icons/icon-folder.png";
import deleteIcon from "../icons/icon-delete.png";
import secretBanner from "../icons/img_secrets.png";
import editIcon from "../icons/icon-edit.png";
import safeImage from "../icons/Group.png";
import safeIcon from "../icons/icon_safe.png";
import safeAddButton from "../icons/safeAdd.png";
import AddSafeForm from "../addSafeForm/AddSafeForm";
import AddSecretsForm from "../addSecretsform/AddSecretsForm";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { safeDeleted, safeEdit, secretsDeleted } from "../../redux/actions";

function Safe() {
  const [addSafeFormOpen, setAddSafeFormOpen] = useState(false);
  const [addSecretsFormOpen, setAddSecretsFormOpen] = useState(false);
  const [editSafeId, setEditSafeId] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const safeLists = useSelector((state) => state.SafeReducer.safes);

  let tempSafeList = safeLists.filter((item) => {
    if (searchKey.length) {
      if (item.safeName.toUpperCase().indexOf(searchKey.toUpperCase()) > -1)
        return item;
    } else return item;
  });

  const [selectedSafeIndex, setSelectedSafeIndex] = useState("");
  useEffect(() => {
    if (!editSafeId) setSelectedSafeIndex(safeLists.length);
  }, [safeLists]);

  function deleteSafe(index) {
    store.dispatch(safeDeleted(index));
    console.log("deleteSafe", index);
    console.log(safeLists);
  }
  function editSafe(index) {
    setEditSafeId(index);
    setAddSafeFormOpen(true);
  }
  const safeDetails = (id) => {
    let [singleSafe] = safeLists.filter((item, i) => item.id === id);

    if (singleSafe)
      return (
        <div className="bannerText">
          <h1 className="safeNameBanner">{singleSafe.safeName}</h1>
          <span className="safeOwnerBanner">{singleSafe.safeOwner}</span>
        </div>
      );
    else return "";
  };
  const secretsFromSafes = (safeId) => {
    let [singleSafe] = safeLists.filter((item, i) => item.id === safeId);
    if (singleSafe)
      if (singleSafe.secrets.length)
        return (
          <>
            <div className="secretsCount">
              {singleSafe.secrets.length}
              <span> secrets</span>
            </div>
            <div className="secretsList">
              <ul>
                {singleSafe.secrets.map((item) => {
                  return (
                    <li className="cardContainer">
                      <div className="secretInfoContainer">
                        <img
                          className="folderIcon"
                          src={folderIcon}
                          alt="Folder"
                        />
                        <span className="secretInfo">{item}</span>
                      </div>
                      <div
                        className="secretAction"
                        onClick={() => deleteSecret(item)}
                      >
                        <img
                          src={deleteIcon}
                          className="secretDeleteIcon"
                          alt="delete"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        );
      else
        return (
          <div className="secrets_empty">
            <img src={secretBanner} alt="secret" className="secrets_image" />
            <div className="secrets_caption">
              Add a <span className="secrets_caption_highlight">Folder</span>{" "}
              and then you’ll be able to add{" "}
              <span className="secrets__caption-highlight">Secrets</span> to
              view them all here
            </div>
            <button
              onClick={() => {
                if (selectedSafeIndex) setAddSecretsFormOpen(true);
                else alert("plzz select safe");
              }}
              className="button"
            >
              + Add
            </button>
          </div>
        );
    else
      return (
        <div className="secrets_empty">
          <img src={secretBanner} alt="secret" className="secrets_image" />
          <div className="secrets_caption">
            Add a <span className="secrets_caption_highlight">Folder</span> and
            then you’ll be able to add{" "}
            <span className="secrets__caption-highlight">Secrets</span> to view
            them all here
          </div>
          <button
            className="disabledButtonCreateSafe"
            onClick={() => {
              if (selectedSafeIndex) setAddSecretsFormOpen(true);
              else alert("plzz create and select safe");
            }}
          >
            + Add
          </button>
        </div>
      );
  };
  const deleteSecret = (secret) => {
    store.dispatch(secretsDeleted({ safeId: selectedSafeIndex, secret }));
  };

  return (
    <section className="safe">
      <div className="all_safes">
        <header className="all-safes_header">
          <h2 className="all-safes__heading">
            All Safes{" "}
            <span className="safesCount">({tempSafeList.length})</span>
          </h2>
          <div className="all_safe_search">
            <input
              className="all_safe_search_input"
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="  Search"
            ></input>
          </div>
        </header>
        {/* safes body container-start here */}
        {safeLists.length === 0 ? (
          <div className="all_safes_container safes_empty">
            <div className="safeImage">
              <span>Create a Safe to get started</span>
            </div>
            <a onClick={() => setAddSafeFormOpen(true)}>
              <img className="safeAddButton" src={safeAddButton}></img>
            </a>
          </div>
        ) : (
          <div className="safesList">
            <ul className="safesListContainer">
              {tempSafeList.map((item, index) => (
                <li className="cardContainers">
                  <div
                    className={`card ${
                      item.id === selectedSafeIndex ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSafeIndex(item.id)}
                  >
                    <img src={safeIcon} alt="logo" className="cardLogo" />
                    <div className="cardInfo">
                      <div className="cardInfoName">{item.safeName}</div>
                      <div className="cardInfoTime">Last Updated:</div>
                    </div>
                    <div className="cardActions">
                      <span className="cardIconContainer">
                        <img
                          src={editIcon}
                          alt="edit"
                          className="cardIcon"
                          onClick={() => editSafe(item.id)}
                        />
                      </span>
                      <span className="cardIconContainer">
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="cardIcon"
                          onClick={() => deleteSafe(index)}
                        />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <a
              className="safeAddButtonSafeList"
              onClick={() => {
                setAddSafeFormOpen(true);
                setEditSafeId("");
              }}
            >
              <img className="safeAddButton " src={safeAddButton}></img>
            </a>
          </div>
        )}
        {addSafeFormOpen && (
          <AddSafeForm
            addSafeFormOpen={addSafeFormOpen}
            setAddSafeFormOpen={setAddSafeFormOpen}
            editSafeId={editSafeId}
          />
        )}
      </div>
      {/* safes body container-end here */}
      <div className="about_safes">
        <div className="safe_banner">{safeDetails(selectedSafeIndex)}</div>
        <div className="secrets">
          <header className="secrets_header">
            <ul className="secrets_permissions_nav">
              <li className="secrets_nav_item">
                <a href="">Secrets</a>
              </li>
            </ul>
            <div
              className="header_newfolder_container"
              onClick={() => {
                if (selectedSafeIndex) setAddSecretsFormOpen(true);
                else alert("plzz select safe");
              }}
            >
              <span className="add_folder">Add Folder</span>
              <img className="add_folder_icon" src={newFolderIcon}></img>
            </div>
          </header>

          <AddSecretsForm
            addSecretsFormOpen={addSecretsFormOpen}
            setAddSecretsFormOpen={setAddSecretsFormOpen}
            activeSafeId={selectedSafeIndex}
          />
          {secretsFromSafes(selectedSafeIndex)}
        </div>
      </div>
    </section>
  );
}

export default Safe;
