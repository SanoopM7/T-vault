import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Safe.css";
import newFolderIcon from "../icons/icon-addfolder.png";
import folderIcon from "../icons/icon-folder.png";
import deleteIcon from "../icons/icon-delete.png";
import secretBanner from "../icons/img_secrets.png";
import editIcon from "../icons/icon-edit.png";
import loadingIcon from "../icons/loading.svg";

import safeImage from "../icons/Group.png";
import safeIcon from "../icons/icon_safe.png";
import safeAddButton from "../icons/safeAdd.png";
import AddSafeForm from "../addSafeForm/AddSafeForm";
import AddSecretsForm from "../addSecretsform/AddSecretsForm";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { safeDeleted, safeEdit, secretsDeleted } from "../../redux/actions";
import axios from "axios";

function Safe() {
  const [addSafeFormOpen, setAddSafeFormOpen] = useState(false);
  const [addSecretsFormOpen, setAddSecretsFormOpen] = useState(false);
  const [editSafeId, setEditSafeId] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [secretIndicator, setSecretIndicator] = useState("");
  const [safeLists, setSafeList] = useState([]);
  const [tempSafeList, setTempSafeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSafeIndex, setSelectedSafeIndex] = useState();

  // const safeLists = useSelector((state) => state.SafeReducer.safes);

  useEffect(() => {
    axios.get(`https://t-vault-api-1.herokuapp.com/safes`).then((res) => {
      setSafeList(res.data);
      setLoading(false);
    });
  }, [loading]);

  useEffect(() => {
    if (!selectedSafeIndex) setSelectedSafeIndex(safeLists[0]?._id);
    setTempSafeList(
      safeLists.filter((item) => {
        if (searchKey.length) {
          if (item.safeName.toUpperCase().indexOf(searchKey.toUpperCase()) > -1)
            return item;
        } else return item;
      })
    );
  }, [safeLists, searchKey]);

  // useEffect(() => {
  //   if (!editSafeId && !secretIndicator) setSelectedSafeIndex(safeLists.length);
  // }, [safeLists]);

  function deleteSafe(index) {
    // store.dispatch(safeDeleted(index));
    setLoading(true);
    var config = {
      method: "delete",
      url: `https://t-vault-api-1.herokuapp.com/safes/${index}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        setSelectedSafeIndex();
      })
      .catch(function (error) {
        console.log(error);
      });

    setEditSafeId("");
  }
  function editSafe(index) {
    setEditSafeId(index);
    setAddSafeFormOpen(true);
  }
  const safeDetails = (id) => {
    let [singleSafe] = safeLists.filter((item, i) => item._id === id);

    if (singleSafe)
      return (
        <div className="bannerText">
          <h1 className="safeNameBanner">{singleSafe.safeName}</h1>
          <span className="safeOwnerBanner">{singleSafe.safeOwner}</span>
        </div>
      );
    else
      return (
        <div className="bannerText">
          <h1 className="safeNameBanner">Sample / SafeName</h1>
          <span className="safeOwnerBanner">
            A Safe is a logical unit to store the secrets. All the sa...
          </span>
        </div>
      );
  };
  const secretsFromSafes = (safeId) => {
    let [singleSafe] = safeLists.filter((item, i) => item._id === safeId);
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
                        onClick={() => {
                          deleteSecret(item);
                        }}
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
                if (selectedSafeIndex) {
                  setAddSecretsFormOpen(true);
                  setSecretIndicator(true);
                } else alert("plzz select safe");
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
    // store.dispatch(secretsDeleted({ safeId: selectedSafeIndex, secret }));
    var data = "";
    setLoading(true);
    var config = {
      method: "delete",
      url: `https://t-vault-api-1.herokuapp.com/safes/delete-secret/${selectedSafeIndex}/${secret}`,
      headers: {},
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
  };
  if (loading)
    return (
      <div className="loadingGifContainer">
        <div className="loadingGif">
          <img src={loadingIcon} alt="Folder" />
        </div>
      </div>
    );
  else
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
                        item._id === selectedSafeIndex ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSafeIndex(item._id)}
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
                            onClick={() => editSafe(item._id)}
                          />
                        </span>
                        <span className="cardIconContainer">
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className="cardIcon"
                            onClick={() => {
                              deleteSafe(item._id);
                              setSecretIndicator(false);
                            }}
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
              loading={loading}
              setLoading={setLoading}
              editSafeId={editSafeId}
              safeLists={safeLists}
              selectedSafeIndex={selectedSafeIndex}
              setSelectedSafeIndex={(id) => setSelectedSafeIndex(id)}
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
              setLoading={setLoading}
              selectedSafeIndex={selectedSafeIndex}
              setSelectedSafeIndex={(id) => setSelectedSafeIndex(id)}
            />
            {secretsFromSafes(selectedSafeIndex)}
          </div>
        </div>
      </section>
    );
}

export default Safe;
