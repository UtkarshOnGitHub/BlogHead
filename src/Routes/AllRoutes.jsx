import React from 'react';
import {Routes , Route} from "react-router-dom"
import Forget from '../components/Authentication/Forget';
import Login from '../components/Authentication/Login';
import OTP from '../components/Authentication/OTP';
import Signup from '../components/Authentication/Signup';
import Blogs from '../components/Blogs/Blogs';
import UpdateBlog from '../components/Blogs/UpdateBlog';
import WriteBlogs from '../components/Blogs/WriteBlogs';
import MiddleComp from '../components/MiddleContent/MiddleComp';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MiddleComp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path ="/signin" element={<Signup/>}></Route>
        <Route path ="/forget" element={<Forget/>}></Route>
        <Route path ="/reset" element={<OTP/>}></Route>
        <Route path ="/blogs" element={<Blogs/>}></Route>
        <Route path ="/writeblog" element={<WriteBlogs/>}></Route>
        <Route path ="/updateblog/:id" element={<UpdateBlog/>}></Route>
    </Routes>
  )
}

export default AllRoutes
