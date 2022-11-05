
import axios from "axios"

export const LoginApi = (data={})=>{
    return axios.post(`http://localhost:8080/user/login` , {
        email:data.email,
        password:data.password
    })
}

export const SignupApi = (data={})=>{
    return axios.post(`http://localhost:8080/user/signup` , {
        name:data.name,
        email:data.email,
        password:data.password,
        age:data.age,
        role:data.role
    })
}
export const forgetPass =(email)=>{
    return axios.post(`http://localhost:8080/user/forget` , {
        email:email
    })
}

export const resetPass =(data={})=>{
    return axios.post(`http://localhost:8080/user/reset` , {
        email:data.email,
        newPass:data.newPass,
        otp:+(data.otp)
    })
}

export const writeblogs =(data={},token)=>{
    return axios.post(`http://localhost:8080/blogs/writeblogs` , {
        title:data.title,
        testImage:data.image,
        content:data.content,
    },{
        headers:{
            token:token
        }
    })
}




export const showblogs =()=>{
    return axios.get("http://localhost:8080/blogs/showblogs")
} 
export const showblogById =(id)=>{
    return axios.get(`http://localhost:8080/blogs/showblogs/${id}`)
} 

export const findblogs =(id)=>{
    return axios.get("http://localhost:8080/blogs/" + id)
} 

export const getDetails =(token)=>{
    return axios.post("http://localhost:8080/user/getuser", {
        token:token
    })
}
export const updateblog =(data={},id)=>{
    return axios.patch("http://localhost:8080/blogs/updateblog", {
        title:data.title,
        content:data.content
    },{
        headers:{
            id:id
        }
    })
}

export const showComments =(id)=>{
    return axios.get(`http://localhost:8080/comments/showComments/${id}`)
}

export const deleteComment =(id)=>{
    return axios.delete(`http://localhost:8080/comments/deleteComment/${id}`)
}

export const deleteBlog =(id)=>{
    return axios.delete(`http://localhost:8080/blogs/deleteblog/${id}`)
}