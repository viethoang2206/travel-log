import "./title.scss";
import pic from "../../images/memories.png";
const Title = () => {
  return (
    <div className="container">
      <div className="title">
        <h1>Memories</h1>
        <img src={pic} alt="" />
      </div>
    </div>
  );
};
export default Title;
