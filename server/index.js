require('dotenv/config');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Octokit } = require("@octokit/rest");

app.use(bodyParser.json());
app.use(cors());

//octokit (ill move this into a new file once I get how it works :)
const octoKit = new Octokit({

    userAgent: "OpenSourceProjectFind v.1",

});
rout
//searching functionality
const octoTest = async () =>{
    let search = "";
    try{
        search = await octoKit.search.repos({
            q:"tetris"
        });
    }
    catch(err){
        console.log('hello');
        console.log(err);
    }
    console.log(search.data.items[0]);
};
octoTest();
//Routes

app.get('*', (req,res) => {
    res.send('Hello World!!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});