import { Col, Row, Input, Select, message, Upload, Button, Form } from "antd";
import "./NewPostStyle.css";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
const { TextArea } = Input;

const options = [
  {
    label: "AI",
    value: "Ai",
  },
  {
    label: "Blog",
    value: "Blog",
  },
  {
    label: "Tech news",
    value: "Tech news",
  },
  {
    label: "Trandings",
    value: "Trandings",
  },
];

const { Dragger } = Upload;

function NewPost() {
  const [loadings, setLoadings] = useState([]);
  const [Tags, setTags] = useState([]);
  const [file, setFile] = useState();
  const [PostData, setPostData] = useState();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
   
  };
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setTags(value);
  };
  async function handleFileSelect(e) {
    var f = await toBase64(e.target.files[0]);
    setFile(f);
    console.log(f);
  }

  const CreatePost = (e) => {
    console.log(e.posttitle);

    setPostData({
      title: e.posttitle,
      description: e.description,
      author: "Nitish Kumar",
      coverImage: file,
      views: 0,
      likes: 0,
      rating: 0,
      isPrivate: true,
      tags: Tags,
    });

    // // e.preventDefault();
    fetch("https://localhost:7084/api/Post/CreatePost", {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PostData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post created:", data);
        message.success("Post added");
        // Do something with the response data, e.g., show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Handle the error, e.g., show an error message.
      });

      
  };
  return (
    <>
      <Row className="mainBox" justify={"center"} align={"middle"}>
        <Col className="box">
          <h2 className="LargeHeading">New Post </h2>
          <div className="divider"></div>
          <br></br>
          <br></br>
          <Form
            name="PostForm"
            onFinish={CreatePost}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="posttitle"
              rules={[
                {
                  required: true,
                  message: "Please input your Post Title ",
                },
              ]}
            >
              <input
                className="PostTitle"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Item>
            <br></br>
            <br></br>
            <br></br>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your Post description ",
                },
              ]}
            >
              <TextArea
                className=""
                rows={4}
                showCount
                maxLength={900}
                placeholder="Write here. . . "
              />
            </Form.Item>
            <br></br>
            <br></br>
            <br></br>
            <Form.Item
              name="Category"
              rules={[
                {
                  required: true,
                  message: "Please input your Post Category ",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Category Select"
                defaultValue={["Unlisted"]}
                onChange={handleChange}
                options={options}
              />
            </Form.Item>
            <br></br>
            <br></br>
            <br></br>
            <Form.Item
              name="coverImage"
              rules={[
                {
                  required: true,
                  message: "Upload Image ",
                },
              ]}
            >
              <input
                className="UploadButton"
                type="file"
                accept=".jpg, .png, image/jpeg, image/png"
                required
                onChange={handleFileSelect}
              />
            </Form.Item>
            <Row justify={"center"}>
              {file == null ? (
                <div className="UploadCoverImage">Upload image</div>
              ) : (
                <img src={file} className="UploadCoverImage" />
              )}
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <Row align={"middle"} justify={"center"}>
              <Button
                type="primary"
                className="postBtn"
                icon={<SaveOutlined />}
                htmlType="submit"
                onClick={() => enterLoading(1)}
              >
                Public
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default NewPost;
