import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [languageOption, setLang] = useState("java");

  const search = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    const formRes = JSON.stringify({ language: languageOption });

    fetch("/form", {
      method: "POST",
      headers: {
        Accept: "applications/json",
        "Content-type": "application/json",
      },
      body: formRes,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSelectChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form method="post" onSubmit={search} className="lang-form">
          <select name="languages" onChange={handleSelectChange}>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="reactjs">React</option>
            <option value="c++">C++</option>
          </select>
          <button
            className="submit-button"
            type="submit"
            // disabled={typeof languageOption === "undefined"}
          >
            Search
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
