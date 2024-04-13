import React, { useState } from 'react'
import {Link ,  useNavigate } from "react-router-dom"
import { Label, TextInput , Button, Alert, Spinner } from "flowbite-react"
const Signin =() => {
  const navigate=useNavigate();
  const[formData,setFormData]=useState({});
  const[errorMessage,setErrorMessage]=useState(null);
  const[loading,setLoading]=useState(false)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
    // console.log(formData)
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!formData.email ||!formData.password ){
    return setErrorMessage("All Fields are required")
  }
  try {
    setLoading(true);
    const res=await fetch("/api/signin",{
    method:"POST",
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify(formData)
    });
    const data=await res.json();
    setLoading(false);
    if(res.ok){
      navigate('/')
    }
  } catch (error) {
    setErrorMessage(error.message)
    setLoading(false)
  }
}
  
  return (
    <div className='min-h-screen mt-20 '>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
{/* For left */}
    <div className='flex-1'>
    <Link to="/" className=' font-bold dark:text-white text-4xl'>
        <span className="rounded-lg text-pink-500 px-1  py-1 bg-gradient-to-r from-indigo-500 to-white">My</span>
        Blog
    </Link>
    <p className='text-sm mt-5'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore voluptates voluptate unde? Necessitatibus, magni, ea, sequi dignissimos at optio ducimus rem nesciunt ut modi mollitia ratione exercitationem tempore aliquam!
    </p>
    </div>
    {/* For right */}
    <div className='flex-1  '>
      <form  className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className="">
          <Label value="Your email"/>
<TextInput type="email " placeholder='name@company.com' id='email' onChange={handleChange}/>
          <Label value="Your password"/>
<TextInput type = "password" placeholder='Password' id='password' onChange={handleChange}/>
        </div>
       <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading} >{loading? (
       <>
       <Spinner size='sm'/>
       <span>Loading..</span>
       </>
       ):"Sign-In"}</Button> 
      </form>
      <div className='flex gap-2 text-sm mt-5'>
        <span > Don't Have an account?</span>
       <Link  to="/sign-up" className="text-blue-500">Sign up</Link>
      </div>
      {
        errorMessage && (
          <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
        )
      }
    </div>
    </div>
    </div>
  )
}

export default Signin
