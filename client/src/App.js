import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("java");
  const [skill, setSkill] = useState("");
  const [size, setSize] = useState("<=1000");
  const [age, setAge] = useState("");

  const search = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    const formRes = JSON.stringify({
      topic: topic,
      language: language,
      skill: skill,
      size: size,
      age: age,
    });

    fetch("/form", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: formRes,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSelectChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form method="post" onSubmit={search} className="lang-form">
          <select name="topic" onChange={handleSelectChange}>
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
