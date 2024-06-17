import React, {useContext, useEffect, useState} from 'react'
import PostAuther from '../components/PostAuther'
import { Link, useParams } from 'react-router-dom'
import  Thumbnail from '../images/Thumbnail1.png'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import { UserContext } from '../context/userContext'
import axios from 'axios'


const PostDetail = () => {
  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [creatorID, setCreatorID] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const {currentUser} = useContext(UserContext)

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
        setCreatorID(response.data.creatorS)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }

    getPost();
  }, [])


if(isLoading){
  return <Loader/>
}
  return (
    <section className='post-detail'>
      {error && <p className='error'>{error}</p>}
      {post && <div className="container post-detail_container">
        <div className="post-detail_header">
        <PostAuther authorID={post.creator} cretedAt={post.cretedAt}/>
        {currentUser?.id == post?.creator &&   <div className="post-detail_buttons">
            <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
            <DeletePost postId={id}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail_thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>
        <p dangerouslySetInnerHTML={{__html: post.description}}></p>
      </div>}
    </section>
  )
}

export default PostDetail