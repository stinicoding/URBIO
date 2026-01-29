import axios from "axios";
import URL from "../config.js";

const deleteComment = async (comment_id) => {
  //console.log(comment_id);
  try {
    const response = await axios.delete(
      `${URL}/comments/deletecomment/${comment_id}`,
    );
  } catch (error) {
    console.log(error);
  }
};

const renderComments = (owner, comments, post, onDelete) => {
  return comments?.map(
    (com) =>
      com.post_id == post._id && (
        <div key={com._id} className="comment">
          <p className="comment-owner">{`${com.owner}: `}</p>
          <p>{com.comment}</p>
          <div className="icons">
            {owner === com.owner && (
              <p
                className="post-icon"
                onClick={async () => {
                  await deleteComment(com._id);
                  onDelete();
                }}
              >
                ✖
              </p>
            )}
          </div>
        </div>
      ),
  );
};

export default renderComments;
