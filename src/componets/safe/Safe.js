import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Safe.css";
import newFolderIcon from "../icons/icon-addfolder.png";
import safeImage from "../icons/Group.png";
import safeAddButton from "../icons/safeAdd.png";
import AddSafeForm from "../addSafeForm/AddSafeForm";

function Safe() {
  const [addSafeFormOpen, setAddSafeFormOpen] = useState(false);
  return (
    <section className="safe">
      <div className="all_safes">
        <header className="all-safes_header">
          <h2 className="all-safes__heading">
            All Safes <span>(0)</span>
          </h2>
          <div className="all_safe_search">
            <input
              className="all_safe_search_input"
              type="text"
              placeholder="  Search"
            ></input>
          </div>
        </header>
        <div className="all_safes_container safes_empty">
          <div className="safeImage">
            <span>Create a Safe to get started</span>
          </div>
          <a onClick={() => setAddSafeFormOpen(true)}>
            <img className="safeAddButton" src={safeAddButton}></img>
          </a>
          <AddSafeForm
            open={addSafeFormOpen}
            onclose={() => setAddSafeFormOpen(false)}
          />
        </div>
      </div>
      <div className="about_safes">
        <div className="safe_banner"></div>
        <div className="secrets">
          <header className="secrets_header">
            <ul className="secrets_permissions_nav">
              <li className="secrets_nav_item">
                <a href="">Secrets</a>
              </li>
            </ul>
            <div className="header_newfolder_container">
              <span className="add_folder">Add Folder</span>
              <img className="add_folder_icon" src={newFolderIcon}></img>
            </div>
          </header>
        </div>
      </div>
    </section>
  );
}

export default Safe;
