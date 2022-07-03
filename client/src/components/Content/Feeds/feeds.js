import { Col, Row, Spin } from "antd";
import "./feed.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  LikeOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  getPost,
  deletePost,
  editPost,
  incCount,
  getSinglePost,
} from "../../../actions/userAction";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Feeds = () => {
  const { post, isLoading } = useSelector((state) => state.postReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(true);
  const currentUser = useSelector((state) => state.userReducer);

  const deleteData = (id) => {
    dispatch(deletePost(id));
  };

  useEffect(() => {
    dispatch(getPost(currentUser));
    console.log(post);
  }, [dispatch]);
  const handleEdit = (id) => {
    const findPost = post.find((val) => {
      if (val._id === id) {
        return val;
      }
    });

    dispatch(editPost({ findPost, editState, currentUser }));
  };
  const navSinglePost = (id) => {
    dispatch(getSinglePost(id));
    navigate(`/post/${id}`);
  };
  return (
    <div className="feed-container">
      {isLoading ? (
        <Spin />
      ) : (
        <Row className="row" gutter={[24, 24]}>
          {post?.length ? (
            post.map((val) => (
              <Col
                // onClick={() => navSinglePost(val._id)}
                key={val._id}
                className="item"
                span={6}
              >
                <div className="item-info">
                  <div className="img-container">
                    <img src={val.selectedFile} alt="" />
                  </div>
                  <button className="edit-btn">
                    <EllipsisOutlined
                      onClick={() => handleEdit(val._id)}
                      className="dot-icon"
                    />
                  </button>
                  <div className="upload-info">
                    <h3>{val.creator}</h3>
                    <h3>{val.createdAt} days ago</h3>
                  </div>

                  <div className="post-info">
                    <div className="hash-tags">
                      {val.tags.map((value) => {
                        return <p key={Math.random()}>#{value}</p>;
                      })}
                    </div>
                    <div className="post-title">
                      <h1>{val.title}</h1>
                    </div>
                    <div className="message">
                      <p>{val.message}</p>
                    </div>
                    <div className="icons">
                      <div className="like">
                        <button
                          onClick={() =>
                            dispatch(incCount(val._id, val.likeCount))
                          }
                        >
                          <LikeOutlined />
                          Like {val.likeCount}
                        </button>
                      </div>
                      <div className="delete">
                        <DeleteOutlined />
                        <button onClick={() => deleteData(val._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <h1>No posts</h1>
          )}
        </Row>
      )}
    </div>
  );
};
export default Feeds;
