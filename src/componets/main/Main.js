import React from "react";
import "./Main.css";
import Head from "../header/Head";
import Safe from "../safe/Safe";
import Active from "../Active";
import Iam from "../Iam";
import Vault from "../Vault";
import Service from "../Service";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <BrowserRouter>
      <div>
        <Head />
        <section className="maincontainer">
          <Routes>
            <Route path="/Safes" element={<Safe />} />
            <Route path="/AzureActiveDirectory" element={<Active />} />
            <Route path="/IAMServiceAccounts" element={<Iam />} />
            {/* <Route path="/Vault AppRoles" element={<Vault />} /> */}
            <Route path="/ServiceAccounts" element={<Service />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default Main;
