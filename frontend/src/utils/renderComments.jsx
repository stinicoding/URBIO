import axios from "axios";

const deleteComment = async (comment_id) => {
  //console.log(comment_id);
  try {
    const response = await axios.delete(
      `http://localhost:4040/comments/deletecomment/${comment_id}`
    );
  } catch (error) {
    console.log(error);
  }
};

const renderComments = (comments, post, onDelete) => {
  return comments?.map(
    (com) =>
      com.post_id == post._id && (
        <div key={com._id} className="comment">
          <p className="comment-owner">{`${com.owner}: `}</p>
          <p>{com.comment}</p>
          <div className="icons">
            <p
              className="post-icon"
              onClick={async () => {
                await deleteComment(com._id);
                onDelete();
              }}
            >
              ✖
            </p>
          </div>
        </div>
      )
  );
};

export default renderComments;
