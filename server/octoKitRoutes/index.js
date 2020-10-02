const express = require('express');
const router = express.Router();
const { Octokit } = require("@octokit/rest");



//octokit
/*
    request format:
    req.body{
        topic: "tetris",
        skill: "",
        size: "<=1000",
        age: "",
    }
    for right now only the topic search ability works :P
*/
const octoKit = new Octokit({
    userAgent: "OpenSourceProjectFind v.1"
});

const searchRepos = async ({topic}) => {
    let results;
    try{
        results = await octoKit.search.repos({
            q:`${topic}`
        });
        return results.data.items;
    }
    catch(err){
        return(err);
    }
}

router.get('/', async (req, res) => {
    res.send(await searchRepos(req.body));
});

module.exports = router;