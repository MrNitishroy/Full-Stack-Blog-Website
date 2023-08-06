import { Row, Tabs, Col } from "antd";
import React, { useEffect, useState } from "react";
import "./ProfileStyle.css";
import { Avatar, Button, List, Skeleton } from "antd";
import pic from "../../assets/blog/blog15.jpg";
import { tab } from "@testing-library/user-event/dist/tab";
import Title from "antd/es/skeleton/Title";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
function Profile() {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const fetchBlog = async () => {
    try {
      const response = await fetch(
        "https://localhost:7084/api/Post/GetAllPost"
      );
      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const jsonData = await response.json();
      setBlogData(jsonData);
      console.log(blogData); // This will show the previous value of blogData, not the updated one.
    } catch (ex) {
      console.log("Error fetching data:", ex);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <Row justify={"center"} className="profilepicBox">
        <img src={pic} width={150} height={150} className="profilePic" />
      </Row>
      <Row justify={"center"}>
        <h3 className="ProfileName">Nitish kumar</h3>
      </Row>
      <br></br>
      <br></br>

      <Row justify={"center"}>
        <Col>
          <h2 className="LargeHeading">Your All Posts </h2>
          <div className="divider"></div>
        </Col>
      </Row>
      <div className="postBox">
        {blogData.map((e) => (
          <Row justify={"space-between"} className="postList">
            <img src={e.coverImage} className="postCOver" />
            <h3 className="postt">{e.title}</h3>
            <button className="del">Delete</button>
          </Row>
        ))}
      </div>
    </>
  );
}
export default Profile;
