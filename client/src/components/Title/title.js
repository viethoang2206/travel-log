import "./title.scss";
import pic from "../../images/memories.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUser, getAllPost } from "../../actions/userAction";
const Title = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer);
  const userHandle = () => {
    console.log("chime handle");
    dispatch(clearUser());
    navigate("/");
  };
  const homeNav = () => {
    navigate("/");
    dispatch(getAllPost());
  };
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="container">
      <div className="title">
        {/* <button className="home-nav"></button> */}
        <div className="home-nav" onClick={() => homeNav()}>
          <h1>Memories</h1>
          <img src={pic} alt="" />
        </div>
        {currentUser?.username && currentUser?.password ? (
          <div className="login-info">
            <p className="firstname">{currentUser.lastname}</p>
            <p className="lastname">{currentUser.firstname}</p>
            <button className="log-out" onClick={userHandle}>
              Log out
            </button>
            <button
              className="user-info"
              onClick={() =>
                navigate(`/${currentUser.lastname}${currentUser.firstname}`)
              }
            >
              Back to my post
            </button>
          </div>
        ) : (
          <button className="login-nav" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};
export default Title;
