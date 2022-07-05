import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LikeOutlined } from "@ant-design/icons";
import { Col, Form, Row, Spin } from "antd";

import {
  getAllPost,
  getSearch,
  getSinglePost,
  incCount,
} from "../../actions/userAction";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
//import "./Home.scss";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, isLoading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getAllPost());
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
  const searchPost = (search, tags) => {
    console.log(search);
    navigate({
      pathname: "/",
      search: `searchQuery=${search || "none"}&tags=${tags.join(",")} `,
    });
    dispatch(getSearch(search, tags));
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
                  <Col key={val._id} className="item" span={6}>
                    <div className="item-info">
                      <div
                        onClick={() => navSinglePost(val._id)}
                        className="single-info"
                      >
                        <div className="img-container">
                          <img src={val.selectedFile} alt="" />
                        </div>

                        <div className="upload-info">
                          <h3>{val.creator}</h3>
                          <h3>{val.createdAt} days ago</h3>
                        </div>
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
                            <button
                              onClick={() =>
                                dispatch(incCount(val._id, val.likeCount))
                              }
                            >
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
          <footer>
            <Search searchPost={searchPost} className="search content"></Search>
            <div className=" form-container notice">
              <p>
                If you want to post your own memory, please{" "}
                <button onClick={() => navigate("/login")}>Log in</button>{" "}
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;
