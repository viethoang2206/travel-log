import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../../actions/userAction";
import Search from "../Search/Search";
import Feeds from "./Feeds/feeds";
import PostForm from "./Form/form";
const Content = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer);
  const searchPost = (search, tags) => {
    navigate({
      pathname: `/${currentUser.lastname}${currentUser.firstname}`,
      search: `searchQuery=${search || "none"}&tags=${tags.join(",")} `,
    });
    dispatch(getSearch(search, tags));
  };

  return (
    <div className="content container">
      <Feeds className="feed"></Feeds>
      <div>
        <Search searchPost={searchPost}></Search>
        <PostForm className="post-form"></PostForm>
      </div>
    </div>
  );
};
export default Content;
