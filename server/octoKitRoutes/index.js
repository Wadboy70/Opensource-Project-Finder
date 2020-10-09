const express = require("express");
const router = express.Router();
const { Octokit } = require("@octokit/rest");

//octokit
/*
    request format:
    req.body{
        *topic: "tetris",
        language: "react",
        skill: "beg",
        followers: "<100"
    }
    sort by help-wanted-issues:>n
    finding age: css pushed:>2013-02-01
*/
const octoKit = new Octokit({
  userAgent: "OpenSourceProjectFind v.1",
});

const calculateScoreCount = (skill) => {
  switch (skill) {
    case "beg":
      return "+good-first-issue:>10";
    case "int":
      return "+good-first-issue:>5+help-wanted:>1";
    case "exp":
      return "+help-wanted:>10";
    default:
      return null;
  }
};

const dateMonthsAgo = (months) => {
  // https://stackoverflow.com/a/1648448/5323429
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const date = new Date();
  const currentDate = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - months);
  date.setDate(
    Math.min(
      currentDate.getDate(),
      getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    )
  );

  return date.toISOString().split("T")[0];
};

const searchRepos = async ({ topic, language, skill, followers, age }) => {
  let results;

  //  Skill parameter fixed to expert since it seems to be the only thing that actually gives results
  let skillVal = calculateScoreCount("exp");
  let date_pushed = dateMonthsAgo(age);

  const param = `${language ? `+language:${language}` : ""}
${skillVal ? `${skillVal}` : ""}
${followers ? `+followers:<${followers}` : ""}
${age ? `+pushed:>${date_pushed}` : ""}`
    .replace(/\s+/g, "") //removes all whitespace
    .replace(/(\r\n|\n|\r)/gm, ""); //removes all new lines

  const query = `${topic}${param}`;
  console.log(query);
  try {
    results = await octoKit.search.repos({
      q: query,
    });
    return results.data.items;
  } catch (err) {
    return err;
  }
};

router.post("/", async (req, res) => {
  res.send(await searchRepos(req.body));
});

module.exports = router;
