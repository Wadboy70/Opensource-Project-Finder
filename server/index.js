require('dotenv/config');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

//Github searching routes

const octoKitRoutes = require('./octoKitRoutes/index')
app.use('/search', octoKitRoutes);

//Routes

app.get('*', (req,res) => {
    res.send('Hello World!!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});