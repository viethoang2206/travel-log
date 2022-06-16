import { Col, Row } from "antd";
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
} from "../../actions/userAction";
import axios from "axios";
import { useEffect, useState } from "react";

const Feeds = () => {
  const post = useSelector((state) => state.postReducer);
  const [travels, setTravel] = useState([]);
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(true);
  const deleteData = (id) => {
    dispatch(deletePost(id));
  };

  useEffect(() => {
    dispatch(getPost());
  }, []);
  const handleEdit = (id) => {
    const findPost = post.find((val) => {
      if (val._id === id) {
        return val;
      }
    });

    dispatch(editPost({ findPost, editState }));
  };
  return (
    <div className="feed-container">
      <Row className="row" gutter={[24, 24]}>
        {post.length ? (
          post.map((val) => (
            <Col key={val._id} className="item" span={12}>
              <div className="item-info">
                <img src={val.selectedFile} alt="" />
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
                      return <p key={Math.random()}>{value}</p>;
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
    </div>
  );
};
export default Feeds;
