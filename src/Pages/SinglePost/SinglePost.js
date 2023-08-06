import { Col, Row, Tag, Rate, Form, message } from "antd";
import "./SingleStylePost.css";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import coverImage from "../../assets/blog/blog19.jpg";
import print from "../../assets/icons/print.svg";
import share from "../../assets/icons/share.png";
import like from "../../assets/icons/LIKE.png";
import comment from "../../assets/icons/comment.png";
import view from "../../assets/icons/view.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SidebarSear from "./widgts/sidebarSearchBar";
import ConnectWithUs from "./widgts/ConnectWithUs";
import Category from "./widgts/Category";
import CommentSection from "./widgts/CommentSection";
import ContactSection from "../Contact/ContactCom";
import ImportPageList from "./widgts/ImportPageList";
import compic from "../../assets/blog/blog1.jpg"
import { useEffect, useState } from "react";
const customIcons = {
  1: <FrownOutlined size={"400px"} />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
var commentList = [
  {
    name: "Nitish kumar",
    comment: "this is bahut achha website hai",
    time: "10 hours ago",
    profileUrl: "",
  },
  {
    name: "Rishi kumar",
    comment: "this is bahut achha website hai",
    time: "10 hours ago",
    profileUrl: "pic2",
  },
  {
    name: "Vikash kumar",
    comment: "this is bahut achha website hai",
    time: "10 hours ago",
    profileUrl: "pic3",
  },
  {
    name: "Saloni kumar",
    comment: "this is bahut achha website hai",
    time: "10 hours ago",
    profileUrl: "pic4",
  },
];
const onPrint = () => {
  window.print();
  print("print");
};

function SinglePost() {
  const [comment, SetComment] = useState();
  const location = useLocation();
  const blogData = location.state;
  const Tags = blogData.tags;
  const Comments = blogData.comments;
  function addComment(e) {
    SetComment({
      userName: e.name,
      comment: e.comment,
    });
    const encodedBlogId = encodeURIComponent(blogData.id);
    fetch(`https://localhost:7084/api/Post/Add%20Comment?id=${encodedBlogId}`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment"); // Handle error response here
        }
        return response.text(); // If you expect a text response
      })
      .then((data) => {
        message.success("Comment added");
        console.log(`blog id : ${blogData.id} `);
        console.log(`user Name : ${e.name} `);
        console.log(`blog comment : ${e.comment} `);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here (e.g., show an error message to the user)
      });
    message.success("Comment added");
  }

  return (
    <>
      <Row className="SinglePost" justify={"space-between"}>
        <Col span={15}>
          <img
            src={blogData.coverImage}
            width={860}
            height={400}
            className="CoverImage"
            key={blogData.id}
          />
          <Col className="PostDetails" span={24}>
            <h1 className="BlogHeading">{blogData.title}</h1>
            <Row justify={"space-between"} className="IconBox">
              <Row align={"middle"}>
                <Row align={"top"} justify={"center"} to="">
                  <div className="IconDIv">
                    <img className="Icons" src={like} width={18} />{" "}
                    {blogData.likes}
                  </div>
                </Row>

                <Row align={"top"} justify={"center"} to="">
                  <div className="IconDIv">
                    <img className="Icons" src={comment} width={18} /> 200
                  </div>
                </Row>
                <Row align={"top"} justify={"center"} to="">
                  <div className="IconDIv">
                    <img className="Icons" src={view} width={18} />{" "}
                    {blogData.views}
                  </div>
                </Row>
              </Row>

              <Row align={"middle"}>
                <Rate
                  className="Icons"
                  defaultValue={blogData.rating}
                  character={({ index }) => customIcons[index + 1]}
                />
                <Link to="">
                  <img className="Icons" src={share} width={18} height={18} />
                </Link>
                <img
                  className="Icons"
                  src={print}
                  width={18}
                  height={18}
                  onClick={onPrint}
                />{" "}
              </Row>
            </Row>
            {blogData.description}
            <Row>
              <div className="has">#</div>
              <div className="tags">Tags : </div>
            </Row>
            <Row>
              {Tags == null ? (
                <div></div>
              ) : (
                Tags.map((e) => <Tag color="error">{e}</Tag>)
              )}
            </Row>
          </Col>

          {/* Comment start */}
          <Row className="commentMainBox" justify={"center"} align={"middle"}>
            <Col style={{ width: "100%" }} className="commentBox" span={18}>
              <h2 className="LargeHeading">Comment ❤️ </h2>
              <br />
              <Form
                name="CommentForm"
                onFinish={addComment}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please Name ",
                    },
                  ]}
                >
                  <input
                    className="CommentName"
                    type="text"
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: "Empaty Comment ",
                    },
                  ]}
                >
                  <textarea
                    className="TextField message"
                    placeholder="Write comment . .  "
                    type="email"
                  />
                </Form.Item>
                <br />
                <br />
                <button className="btn"> Comment 📁 </button>
              </Form>
              <br />
              <br />
              <br />
              <br />
              {Comments == null ? (
                <div></div>
              ) : (
                Comments.map((e) => (
                  <Row className="allCommentBox" align={"middle"}>
                    <img
                      className="profilePic"
                      src={compic}
                      width={50}
                      height={50}
                    />
                    <Col className="info">
                      <p className="CommentName">{e.userName}</p>
                      <p className="Comments">{e.comment}</p>
                      <p className="Comments">{e.dateTime}</p>
                    </Col>
                  </Row>
                ))
              )}
            </Col>
          </Row>
        </Col>
        {/* comment section end */}
        <Col className="SideBar" span={8}>
          <SidebarSear />
          <br></br>
          <br></br>
          <br></br>
          <ConnectWithUs />
          <br></br>
          <Category />
          <br></br>
          <ContactSection />
          <br></br>
          <ImportPageList />
        </Col>
      </Row>
    </>
  );
}

export default SinglePost;
