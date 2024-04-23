import { useSelector } from 'react-redux'
import React from 'react'
import {Button, TextInput} from "flowbite-react"
const Dashprofile = () => {
    const {currentUser}=useSelector(state=>state.user)
  return (
    <div className='w-full max-w-lg mx-auto p-3'> 
    <h1 className='my-7 font-semibold text-3xl text-center'> Profile</h1>
    <form  className='flex flex-col gap-4'>
    <div className="w-32 h-32 self-center  cursor-pointer shadow-md overflow-hidden rounded-full ">
        <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-4 border-blue-300 ' />
    </div>
        <TextInput type='text' placeholder='username' defaultValue={currentUser.userName} id='userName' />
        <TextInput type='email' placeholder='email' defaultValue={currentUser.email} id='email' />
        <TextInput type='text' placeholder='password' defaultValue="********" id='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
    </form>
    <div className="text-pink-700 flex justify-between mt-5">
      <span className='cursor-pointer bg-blue-300 p-3 rounded-full'>Delete Account</span>
      <span className=' text-pink-700 cursor-pointer bg-blue-300 p-3 rounded-full'>Sign Out</span>
    </div>
   </div>
  )
}

export default Dashprofile
