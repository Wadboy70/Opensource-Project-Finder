import React, { useState } from "react";
import {
  ageParameter,
  followersParameter,
  skillParameter,
} from "../react-app-env";
import module_styles from "./SearchForm.module.css";

function SearchForm(props: { searchFunction: Function }) {
  const [topic, setTopic] = useState<string>("");
  const [language, setLanguage] = useState<string>("java");
  const [skill, setSkill] = useState<skillParameter>("beg");
  const [followers, setFollowers] = useState<followersParameter>(Infinity);
  const [age, setAge] = useState<ageParameter>(3); //currently this gives an error since github api expects a datetime object I think

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.currentTarget.value ?? "");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.currentTarget.value);
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSkill(e.currentTarget.value as skillParameter);
  };

  const handleFollowersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFollowers(e.currentTarget.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge((e.currentTarget.value as unknown) as ageParameter);
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const RepoReq = JSON.stringify({
      topic: topic,
      language: language,
      skill: skill,
      followers: followers,
      age: age,
    });

    props.searchFunction(RepoReq);
  };

  return (
    <form onSubmit={search} className={module_styles["search-form"]}>
      <div className={module_styles["form-field"]}>
        <label htmlFor="topic">Topic: </label>
        <input
          type="text"
          name="topic"
          id="topic"
          onChange={handleTopicChange}
        />
      </div>
      <div className={module_styles["form-field"]}>
        <label htmlFor="language">Language: </label>
        <select name="language" id="language" onChange={handleLanguageChange}>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="reactjs">React</option>
          <option value="c++">C++</option>
        </select>
      </div>
      <div className={module_styles["form-field"]}>
        <label htmlFor="skill">Skill Level: </label>
        <select name="skill" id="skill" onChange={handleSkillChange}>
          <option value="beg">Beginner</option>
          <option value="int">Intermediate</option>
          {/* maybe change this to 'advanced' */}
          <option value="exp">Expert</option>
        </select>
      </div>
      <div className={module_styles["form-field"]}>
        <label htmlFor="followers">Max Follower Count: </label>
        <select
          name="followers"
          id="followers"
          onChange={handleFollowersChange}
        >
          <option value={Infinity}>Unlimited</option>
          <option value={5}>Minimal (Less than 5)</option>
          <option value={10}>Small (Less than 10)</option>
          <option value={50}>Medium (Less than 50)</option>
          <option value={100}>Popular (Less than 100)</option>
          <option value={500}>Very Popular (Less than 500)</option>
        </select>
      </div>
      <div className={module_styles["form-field"]}>
        <label htmlFor="age">Repo Age: </label>
        <select name="age" id="age" onChange={handleAgeChange}>
          <option value={3}>Less than 3 months</option>
          <option value={6}>Less than 6 months</option>
          <option value={12}>Less than 1 year</option>
          <option value={60}>Less than 5 years</option>
        </select>
      </div>
      <button
        className={module_styles["submit-button"]}
        type="submit"
        // we don't want to get rate limited
        // so in the future disble button while waiting for response
        // aka avoid 100 button presses in 1 sec -> 100 requests
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
