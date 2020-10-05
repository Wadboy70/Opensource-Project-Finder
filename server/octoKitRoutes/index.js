const express = require('express');
const router = express.Router();
const { Octokit } = require("@octokit/rest");



//octokit
/*
    request format:
    req.body{
        *topic: "tetris",
        language: "react",
        skill: "beg",
        followers: "<100",
        age: "<3",
    }
    sort by help-wanted-issues:>n
    finding age: css pushed:>2013-02-01
*/
const octoKit = new Octokit({
    userAgent: "OpenSourceProjectFind v.1"
});

const calculateScoreCount = (skill) => {
    switch (skill) {
        case 'beg':
            return 'good-first-issue:>10';
        case 'int':
            return 'good-first-issue:>5';
        case 'int':
            return 'help-wanted:>5'
        default:
            return null
    };
};

const searchRepos = async ({topic, language, skill, followers, age}) => {
    let results;
    let skillVal = calculateScoreCount(skill);
    const query = `${topic}
    ${language ? `+topic:${language}` : ''}
    ${age ? `+pushed:${age}` : ''}`;
    console.log(query);
    try{
        results = await octoKit.search.repos({
            q:query
        });
        return results.data.items;
    }
    catch(err){
        return(err);
    }
}

router.post('/', async (req, res) => {
    res.send(await searchRepos(req.body));
});

module.exports = router;