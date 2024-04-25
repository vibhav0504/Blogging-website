import React, { useEffect ,useState } from 'react'
import {useSelector} from "react-redux"
import {Table} from "flowbite-react" 
import {Link} from "react-router-dom"
const DashPost = () => {
   const[userPost,setUserPost]=useState([])
  const {currentUser}=useSelector(state=>state.user)
  console.log(userPost)
  useEffect(()=>{
const fetchPosts=async()=>{
try {
  // console.log(currentUser._id)
    const res=await fetch (`api/getposts?userId=${currentUser._id}`)
    console.log(res);
    const data=await res.json();

   if(res.ok){
    setUserPost(data.posts)
   }
} catch (error) {
  console.log(error.message)
}
}
if(currentUser.isAdmin){
  fetchPosts();
}
  },[currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
   {currentUser.isAdmin && userPost.length>0 ? (
<Table hoverable className='shadow-md'>
<Table.Head>
<Table.HeadCell>Date Updated </Table.HeadCell>
<Table.HeadCell>Post Image</Table.HeadCell>
<Table.HeadCell>Post Title </Table.HeadCell>
<Table.HeadCell>Category </Table.HeadCell>
<Table.HeadCell>Delete</Table.HeadCell>
<Table.HeadCell>Edit</Table.HeadCell>
</Table.Head>
{userPost.map((post)=>{
return(
  <Table.Body className='divide-y'  >
  <Table.Row >
    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
    <Table.Cell><Link to={`/post/${post.slug}`}>
      <img  src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500'/>
    </Link></Table.Cell>
    <Table.Cell className='text-emerald-600 text-md'><Link to={`/post/${post.slug}`}>
      {post.title}
    </Link></Table.Cell>
    <Table.Cell>
      {post.category}
   </Table.Cell>
   <Table.Cell className='text-red-400 hover:underline cursor-pointer'>
    Delete
   </Table.Cell>
    <Table.Cell className='text-blue-400'>
    <Link to={`/update-post/${post._id}`}>
    Edit
    </Link>
   </Table.Cell>
    
  </Table.Row>
</Table.Body>
)

})}
</Table>

   ):(
    <p>You have no posts yet !</p>
   )}
    </div>
  )
}

export default DashPost;
