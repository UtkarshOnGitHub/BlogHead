const {Router} = require("express")
const jwt = require("jsonwebtoken");
const blogModel = require("../modals/blog.modal");
const UserModel = require("../modals/User.model");
const blog = Router();


require('dotenv').config();
const key = process.env.SECRET_KEY

blog.post("/writeblogs" , async (req,res)=>{
    const token = req.headers.token;
    let {title , content} = req.body;
    const data = jwt.verify(token , key );
    const check = await UserModel.findById(data.id);
    let role = check.role;
    if(role !== "Writer"){
        res.status(401).send("You Are Not Authorized")
    }else{
        const saveBlog = new blogModel({title:title , content:content,user:check.id})
        await saveBlog.save()
        res.send({blog:title, message:"Blog Updated"});
    }
})


blog.get("/showblogs" , async (req,res)=>{
    const data  = await blogModel.find({}).populate("user");
    res.send({data:data})
})

blog.get("/:id" , async (req,res)=>{
    const {id} = req.params
    const data  = await blogModel.find({user:id});
    res.send(data)
})

blog.patch("/updateblog",async (req,res)=>{
    const id = req.headers.id;
    const {content} = req.body
    const data = await blogModel.findByIdAndUpdate({_id:id},{$set:{"content":content}} , {useFindAndModify:false});
    res.send({data})
})

blog.post("/comment" , async (req,res)=>{
    const token = req.headers.token;
    let {comment} = req.body;
    const data = jwt.verify(token , key );
    const check = await UserModel.findById(data.id);
    let role = check.role;
    if(role !== "Writer"){
        res.status(401).send("You Are Not Authorized")
    }else{
        res.send({blog:blog, message:"Blog Updated"});
    }
})

module.exports = blog