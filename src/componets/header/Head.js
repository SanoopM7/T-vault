import "./Head.css";
import { NavLink } from "react-router-dom";

function Head() {
  const navItems = [
    "Safes",
    "VaultAppRoles",
    "ServiceAccounts",
    "IAMServiceAccounts",
    "AzureActiveDirectory",
  ];
  return (
    <header className="nav_bar">
      <a className="nav_logo" href="/">
        <img src="" alt="t-vault"></img>
      </a>
      <ul className="nav_list">
        <li>
          <NavLink to="/Safes" className="nav_item">
            Safes
          </NavLink>
        </li>
        <li>
          <NavLink to="/VaultAppRoles" className="nav_item">
            VaultAppRoles
          </NavLink>
        </li>
        <li>
          <NavLink to="/ServiceAccounts" className="nav_item">
            ServiceAccounts
          </NavLink>
        </li>
        <li>
          <NavLink to="/IAMServiceAccounts" className="nav_item">
            IAMServiceAccounts
          </NavLink>
        </li>
        <li>
          <NavLink to="/AzureActiveDirectory" className="nav_item">
            AzureActiveDirectory
          </NavLink>
        </li>
      </ul>
      <div className="nav_end">
        <span className="nav_end_item">
          <img src="" alt=""></img>
          Documentation
        </span>
        <span className="nav_end_item">
          <img src="" alt=""></img>
          (Admin) Davis R.
        </span>
      </div>
    </header>
  );
}

export default Head;
