import React from 'react'
import {TextInput , Select, FileInput, Button} from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
  return (
    <div className='max-w-3xl p-3 mx-auto min-h-screen'>
    <h1 className='text-center text-3xl  my-7 font-semibold'>Create a post</h1>
    <form  className=" flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text'  placeholder='Title' required id="title" className='flex-1' />  
            <Select>
                <option value='uncategorized'>Select a Category </option>
                <option value='new Gadgets'>new Gadgets </option>
                <option value='Javascipt'>Javascript </option>
                <option value='React'>React </option>
                <option value='React-Native'>React-Native </option>
                <option value='Node js'>Node js</option>
                <option value='Politics'>Politics</option>
            </Select>
                  </div>
                  <div className="flex gap-4 justify-between items-center border-2 border-blue-300 after:border-dotted p-3 ">
                 <FileInput type='file' accept='image/*'/>
                 <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
                  </div>
                  <ReactQuill theme="snow" placeholder='Write Something...' className='h-72 mb-12' required/>
                  <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>

    </form>
    </div>
  )
}

export default CreatePost
