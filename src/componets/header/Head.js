import "./Head.css";
import { NavLink } from "react-router-dom";

function Head() {
  var navItems = [
    { name: "Safes", link: "/Safes" },
    { name: "Vault App Roles", link: "/VaultAppRoles" },
    { name: "Service Accounts", link: "/ServiceAccounts" },
    { name: "IAM Service Accounts", link: "/IAMServiceAccounts" },
    { name: "Azure Active Directory", link: "/AzureActiveDirectory" },
  ];
  return (
    <header className="nav_bar">
      <a className="nav_logo" href="/">
        <img src="" alt="t-vault"></img>
      </a>

      <ul className="nav_list">
        {navItems.map((item) => (
          <li id={item.name}>
            <NavLink to={item.link} className="nav_item">
              {item.name}
            </NavLink>
          </li>
        ))}
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
