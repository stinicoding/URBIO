const renderComments = (comments, post) => {
 return comments?.map(
    (com, index) =>
      com.post_id == post._id && (
        <div key={index} className="comment">
          <p className="comment-owner">{`${com.owner}: `}</p>
          <p>{com.comment}</p>
          <div className="icons">
            <p className="post-icon">✎</p>
            <p className="post-icon">✖</p>
          </div>
        </div>
      )
  );
};

export default renderComments;
