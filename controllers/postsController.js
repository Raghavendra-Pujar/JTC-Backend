const mongoose = require('mongoose');
const shortid = require('shortid');
const postModel = mongoose.model('postSchema');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');

let insertPost = (req,res)=>{
    console.log('Entered')
    let verifyDetails = (req,res) =>{
        console.log(req.body.description)
        return new Promise((resolve,reject)=>{
            if(check.isEmpty(req.body.title)){
                let apiResponse = response.generate(true,'Title is missing',404,null);
                console.log('Error in postController.insertPost',apiResponse);
                reject(apiResponse)
            }else if(check.isEmpty(req.body.description)){
                let apiResponse = response.generate(true,'Description is missing',404,null);
                console.log('Error in postController.insertPost',apiResponse);
                reject(apiResponse);
            }else{
                resolve(req)
            }
        })
    }
    let insertData = (req,res)=>{
        console.log('InsertData')
        console.log(req.body.title);
        return new Promise((resolve,reject)=>{
            let postObject= new postModel({
                postId: shortid.generate(),
                title: req.body.title,
                description: req.body.description
            })
    
            postObject.save((err,result)=>{
                if(err){
                let apiResponse = response.generate(true,'Database error, Please try again',500,null);
                console.log('Error in faqController.createFaq',apiResponse);
                reject(apiResponse);
                }else{
                    console.log(result);
                    resolve(result);
                }
            })
        })


    }

    verifyDetails(req,res).then(insertData).then((resolve)=>{
        let apiResponse = response.generate(false,'Post created successfully', 200, resolve);
        res.send(apiResponse);
    }).catch((err)=>{
        res.send(err);
    })

}

let listPosts = (req,res)=>{
    postModel.find().exec((err,postsList)=>{
        if(err){
            let apiResponse = response.generate(true,'Database error',500,null);
            console.log('database error',apiResponse);
            res.send(apiResponse);
           }else if(check.isEmpty(postsList)){
            let apiResponse = response.generate(true,'Post Lists are empty',404,null);
            res.send(apiResponse);
           }else{
            let apiResponse = response.generate(false,'Lists of Posts',200,postsList);
            res.send(apiResponse);
           }
    })
}

let upVotesIncrement = (req,res)=>{

            console.log(req.body.postId)
            postModel.findOne({ postId: req.body.postId}).exec((err,foundPost)=>{
                if(err){
                    let apiResponse = response.generate(true,'Database error',500,null);
                    console.log('database error',apiResponse);
                    res.send(apiResponse);
                   }else if(check.isEmpty(foundPost)){
                    let apiResponse = response.generate(true,'Post doesnot exist',404,null);
                    res.send(apiResponse);
                   }else{
                    foundPost.upVotes += 1;
                    
                    foundPost.save((err,savedDetails)=>{
                        if(err){
                            let apiResponse = response.generate(true, 'Internal Server error', 500, null);
                            res.send(apiResponse);
                        }else{
                            let apiResponse = response.generate(false,'Upvoted for the given Post',200,savedDetails);
                            res.send(apiResponse);
                        }
                    })
                   }
            })
}

module.exports={
    insertPost: insertPost,
    listPosts: listPosts,
    upVotesIncrement: upVotesIncrement
}