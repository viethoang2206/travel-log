import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_TRAVEL } from "../../actions/type";
import { LikeOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import Content from "../Content/Content";
import { getAllPost, getSinglePost } from "../../actions/userAction";
import Search from "../Search/Search";
import { Navigate, useNavigate } from "react-router-dom";
//import "./Home.scss";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer);

  const [loading, setLoading] = useState([]);
  const { post, isLoading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getAllPost());
    console.log(post);
  }, [dispatch]);
  const navSinglePost = (id) => {
    dispatch(getSinglePost(id));
    navigate(`/post/${id}`);
  };
  const MessageItem = ({ message }) => {
    const [readMore, setReadMore] = useState(false);
    return (
      <div className="message">
        <p>
          {readMore ? message : `${message.substring(0, 150)}... `}
          <button onClick={() => setReadMore((readMore) => !readMore)}>
            {readMore ? "Hide" : "Show More"}
          </button>
        </p>
      </div>
    );
  };
  return (
    <div className="container">
      {isLoading ? (
        <Spin className="loading" />
      ) : (
        <div className=" home content">
          <div className="feed-container  ">
            <Row className="row" gutter={[24, 24]}>
              {post.length ? (
                post.map((val) => (
                  <Col
                    key={val._id}
                    className="item"
                    span={6}
                    // onClick={() => navSinglePost(val._id)}
                  >
                    <div className="item-info">
                      <div className="img-container">
                        <img src={val.selectedFile} alt="" />
                      </div>

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
                        <MessageItem message={val.message} />
                        <div className="icons">
                          <div className="like">
                            <button>
                              <LikeOutlined />
                              Like {val.likeCount}
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
          <Search className="search content"></Search>
        </div>
      )}
    </div>
  );
};

export default Home;
