import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs'

export function Comments({product, user, comments, setComments}) {
  const sendComment = (event) => {
    event.preventDefault();
    const id = product._id;
    const userName = user.userName;;
    const content = event.target.elements.content.value;

    axios.post('/api/products/comment', {
      id,
      userName,
      content
    })
      .then(res => setComments(prevComments => [...prevComments, res.data.newComment]))

    event.target.elements.content.value = ""
  }

  const deleteComment = (event, commentId) => {
    event.preventDefault();
    axios.put('/api/products/comment/delete', {
      id: product._id,
      commentId: commentId
    })
      .then(res => {
        const idForDeleteComment = res.data.commentId;
        setComments((prev) => {
          const next = [...prev];
          const index = next.findIndex(item => item._id === idForDeleteComment);
          next.splice(index, 1)
          console.log(index);
          return next;
        })
      })
  }


  return (
    <div className='comments-container'>
      {user ? (
        <form className='comment-form' onSubmit={sendComment}>
          <div className='comment-form-title'>Komment hozzáadása</div>
          <input type="text" name="content" className='content' placeholder='Komment hozzáadása' rows="10" cols="50" required />
          <button type='submit' className='send-comment'>Komment elküldése</button>
        </form>
      ) : (
        <h1 className='comment-warning'>Jelentkezz be komment hozzáadásához!</h1>
      )}
      <div className='comments'>
        <h1 className='comments-title'>Kommentek</h1>
        {comments.map((comment) => {
          return (
            <div className='comment' key={comment._id}>
              <div className='userName-icon'>
                <h1>{comment.userName.charAt(0).toUpperCase()}</h1>
              </div>
              <div className='comment-body'>
                <h3 className='userName'>{comment.userName}</h3>
                <p>{comment.content}</p>
              </div>
              {user?.userName === comment.userName && <p className='delete-comment' onClick={(event) => deleteComment(event, comment._id)}><BsFillTrashFill size={25} /></p>}
            </div>
          )

        }).reverse()}
      </div>
    </div>
  )
}
