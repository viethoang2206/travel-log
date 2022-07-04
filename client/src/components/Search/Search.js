import { useState } from "react";

import { useLocation } from "react-router-dom";

import "./search.scss";
const { Form, Input, Button } = require("antd");
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Search = ({ searchPost }) => {
  const [form] = Form.useForm();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [formLayout, setFormLayout] = useState("vertical");
  const query = useQuery();

  const searchQuery = query.get("searchQuery");

  //console.log(searchPorst);

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
        <Button onClick={() => searchPost(searchQuery, tags)}>Search</Button>
      </Form>
    </div>
  );
};
export default Search;
