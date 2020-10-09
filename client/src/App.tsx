import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import RepoList from "./Components/RepoList";

function App() {
  const [repoList, setRepoList] = useState([]);

  const search = (jsonReq: string) => {
    fetch("/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: jsonReq,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRepoList(Object.values(data));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SearchForm searchFunction={search} />
        <RepoList repoDataList={repoList} />
      </header>
    </div>
  );
}

export default App;
