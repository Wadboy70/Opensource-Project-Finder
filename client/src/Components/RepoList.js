import React from "react";
import module_styles from "./RepoList.module.css";

function RepoList({ repoData }) {
  return (
    <div className={module_styles["repos-container"]}>
      {Object.values(repoData).map((elem) => (
        <div className={module_styles["repo-info-container"]}>
          <h3 className={module_styles["repo-name"]}>Name: {elem.name}</h3>
          <h6 className={module_styles["repo-description"]}>
            Language: {elem.language}
          </h6>
          <h6 className={module_styles["repo-description"]}>
            #open issues: {elem.open_issues}
          </h6>
          <h6 className={module_styles["repo-description"]}>
            size: {elem.size}
          </h6>
          <h6 className={module_styles["repo-description"]}>
            created at: {elem.created_at}
          </h6>
          <h6 className={module_styles["repo-description"]}>
            url: {elem.html_url}
          </h6>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
