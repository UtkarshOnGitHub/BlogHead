
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

export const getDetails =(token)=>{
    return axios.post("http://localhost:8080/user/getuser", {
        token:token
    })
}
export const updateblog =(id,content)=>{
    return axios.patch("http://localhost:8080/user/getuser", {
        content:content
    },{
        headers:{
            id:id
        }
    })
}