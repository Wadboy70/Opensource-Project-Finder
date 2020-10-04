const express = require('express');
const router = express.Router();
const { Octokit } = require("@octokit/rest");



//octokit
/*
    request format:
    req.body{
        topic: "tetris",
        language: "react",
        skill: ,
        size(followers): "<1000",
        age: "<1000",

    }
    for right now only the topic search ability works :P
*/
const octoKit = new Octokit({
    userAgent: "OpenSourceProjectFind v.1"
});

//finding age: css pushed:>2013-02-01

const searchRepos = async ({topic, language}) => {
    let results;
    const query = `${topic}
    ${language ? `+topic:${language}` : ''}
    ${size ? `+size:${size}` : ''}
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