import "./App.scss";
import Feeds from "./components/Feeds/feeds";
import Title from "./components/Title/title";
import PostForm from "./components/Form/form";
function App() {
  return (
    <div className="App">
      <Title></Title>
      <div className="content container">
        <Feeds className="feed"></Feeds>
        <PostForm className="post-form"></PostForm>
      </div>
    </div>
  );
}

export default App;
