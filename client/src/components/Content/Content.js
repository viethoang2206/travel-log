import { useSelector } from "react-redux";
import Search from "../Search/Search";
import Feeds from "./Feeds/feeds";
import PostForm from "./Form/form";
const Content = () => {
  const currentUser = useSelector((state) => state.userReducer);
  return (
    <div className="content container">
      <Feeds className="feed"></Feeds>
      <div>
        <Search></Search>
        <PostForm className="post-form"></PostForm>
      </div>
    </div>
  );
};
export default Content;
