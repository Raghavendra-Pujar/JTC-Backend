const express = require('express');
const router = express.Router();
const appConfig = require('../config/appConfig');
const postController = require('../controllers/postsController')

const setRoutes = (app)=>{
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/posts/create`,postController.insertPost);
    app.get(`${baseUrl}/posts/list`,postController.listPosts);
    app.post(`${baseUrl}/posts/upVote`,postController.upVotesIncrement)
}

module.exports = {
    setRoutes: setRoutes
}
