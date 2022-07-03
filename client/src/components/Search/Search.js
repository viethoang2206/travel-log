import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearch } from "../../actions/userAction";
import "./search.scss";
const { Form, Input, Button } = require("antd");
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Search = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [formLayout, setFormLayout] = useState("vertical");
  const query = useQuery();
  const location = useLocation();
  const searchQuery = query.get("searchQuery");

  const searchPost = () => {
    console.log(search);
    dispatch(getSearch(search, tags));
    navigate({
      pathname: "/",
      search: `searchQuery=${search || "none"}&tags=${tags.join(",")} `,
    });
    console.log(location);
    console.log(query);
    console.log(searchQuery);
  };
  const converTag = (value) => {
    const newTag = value.split().join().split(",");
    setTags(newTag);
  };
  return (
    <div className="form-container">
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
      >
        <Form.Item name="memory">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 250,
            }}
            placeholder="Search memories"
          />
        </Form.Item>
        <Form.Item name="tags">
          <Input
            onChange={(e) => converTag(e.target.value)}
            style={{
              width: 250,
            }}
            placeholder="Search tag"
          />
        </Form.Item>
        <Button onClick={() => searchPost()}>Search</Button>
      </Form>
    </div>
  );
};
export default Search;
