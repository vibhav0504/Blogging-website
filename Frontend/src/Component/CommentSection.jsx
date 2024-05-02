import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  // console.log(comments);
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await fetch(`/api/getcomments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComment();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/createcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res=await fetch(`/api/likecomment/${commentId}`,{
        method:"PUT",
      })
      if(res.ok){
const data=await res.json();
setComments(comments.map((comment)=>{
    comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
  
}))
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="User-image"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-300 hover:underline"
          >
            @{currentUser.userName}
          </Link>
        </div>
      ) : (
        <div>
          {" "}
          You must be logged in to comment
          <Link to="/sign-in" className="text-blue-700 hover:underline">
            Sign-In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between mt-5 items-center">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} character remaining
            </p>
            <Button type="submit" gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No Comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className=" border border-gray-400 py-1 px-2 rounded-sm">
              {comments.length}
            </div>
          </div>
          {comments.map((com) => {
            return <Comment key={com?._id} comment={com} onLike={handleLike} />;
          })}
        </>
      )}
    </div>
  );
};

export default CommentSection;
