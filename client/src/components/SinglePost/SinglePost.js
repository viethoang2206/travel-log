import { Spin } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./singlepost.scss";
const SinglePost = () => {
  //const { id } = useParams();
  const { isLoading, post } = useSelector((state) => state.postReducer);
  console.log(post);
  return (
    <div className="container content">
      {isLoading ? (
        <Spin />
      ) : post.length ? (
        post.map((val) => (
          <div className="single-post">
            <div className="text-container">
              <h1>{val.title}</h1>
              <div className="hash-tags">
                {val.tags.map((value) => {
                  return <p key={Math.random()}>#{value}</p>;
                })}
              </div>
              <p>{val.message}</p>
              <h3>Created by: {val.creator}</h3>
              <h3>{val.createdAt} days ago</h3>
            </div>
            <div className="img-container">
              <img src={val.selectedFile} alt="" />
            </div>
          </div>
        ))
      ) : (
        <h1>no post</h1>
      )}
    </div>
  );
};

export default SinglePost;
