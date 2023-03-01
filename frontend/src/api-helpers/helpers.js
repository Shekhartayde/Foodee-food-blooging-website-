import axios from 'axios'


export const getAllPosts=async ()=>{
    const res=await axios.get('/post')

    if(res.status !== 200){
        return console.log("Some error Occured")
    }

    const data=res.data
    return data
}

export const sendAuthRequest=async (signup,data)=>{
    let errMsg
    const res=await axios.post(`/user/${signup ? "signup":"login"}/`,{
        name:data.name? data.name:"",
        email:data.email,
        password:data.password
    }).catch((err)=>errMsg=err)

    if(errMsg!==undefined){
        console.log(errMsg)
        return {error:errMsg.response.data.error}
    }

    if(res.status !== 200 && res.status !== 201){
        return console.log("Unexpected error occured")
    }

    const resData=await res.data
    return resData
}
export const addPost=async(data)=>{
    console.log('==',data.image,'===',data.image.name)
    const formData=new FormData()
    formData.append('image',data.image,data.image.name)
    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('address',data.address)
    formData.append('dinerName',data.dinerName)
    formData.append('user',localStorage.getItem("userId"))
    // const res=await axios.post(`/post/`,{
    //     title:data.title,
    //     description:data.description,
    //     address:data.address,
    //     image:data.image,
    //     dinerName:data.dinerName,
    //     user:localStorage.getItem("userId")
    // }).catch((err)=>console.log(err))
    const res=await axios.post(`/post/`,formData)
    if(res.status !== 201){
        return console.log("Error Ocuured")
    }

    const resData=await res.data
    return resData
}

export const getPostDetails=async(id)=>{
    const res=await axios.get(`/post/${id}`).catch((err)=>console.log(err))
    if(res.status !== 200){
        return console.log("Unable to fetch blog")
    }

    const resData=await res.data
    return resData
}

export const getPostWithinRadius=async(address,distance)=>{
    const res=await axios.get(`/post/${address}/${distance}`).catch((err)=>console.log(err))
    if(res.status !== 200){
        return console.log("Unable to fetch blogs")
    }
    const resData=await res.data
    return resData
}

export const postUpdate=async(data,id)=>{
    const res=await axios.put(`/post/${id}`,{
        title:data.title,
                description:data.description,
                image:data.image,
                address:data.address,
                dinerName:data.dinerName
    }).catch(err=>console.log(err))
    if(res.status !==200){
        return console.log("Unable to update")
    }

    const resData=await res.data
    return resData
}

export const postDelete=async (id)=>{
    const res=await axios.delete(`/post/${id}`).catch((err)=>console.log(err))

    if(res.status!==200){
        return console.log("Unable to delete")
    }

    const resData=await res.data
    return resData
}

export const getUserDetails=async()=>{
    const id=localStorage.getItem("userId")
    const res=await axios.get(`/user/${id}`).catch((err)=>console.log(err))

    if(res.status !==200){
        return console.log("No user found")
    }

    const resData=await res.data
    return resData
}