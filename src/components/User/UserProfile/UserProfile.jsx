import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { putUpdateUser, getUserById } from "../../../services/userService";
import { useSelector } from "react-redux";
import "./UserProfile.scss";
import PracticeResults from "./PracticeResults";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.userReducer.account.userid);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    createdAt: "",
  });

  const fetchUserInfo = async () => {
    try {
      const response = await getUserById(userId);
      const data = response.DT;
      setUserInfo({
        firstName: data.FirstName || "",
        lastName: data.LastName || "",
        email: data.Email || "",
        username: data.Username || "",
        createdAt: data.CreatedAt || "",
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleEditClick = () => setIsEditing(true);

  const handleBackClick = () => setIsEditing(false); // Nút quay lại

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await putUpdateUser({
        UserID: userId,
        Username: userInfo.username,
        Email: userInfo.email,
        FirstName: userInfo.firstName,
        LastName: userInfo.lastName,
      });

      if (updatedUser) {
        setIsEditing(false);
        fetchUserInfo(); // reload thông tin
      } else {
        alert("Cập nhật không thành công. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin!");
    }
  };

  return (
    <div className="user-profile">
      <div className="cover-photo">
        <img
          src="https://storage.googleapis.com/a1aa/image/gJRV9shtD4KeRqAYanivewgGLebkAEHffgDGMMZPELeyBzz9E.jpg"
          alt="Cover"
        />
        <div className="profile-picture">
          <img
            src="https://storage.googleapis.com/a1aa/image/qY5nADnvUP7kHFEQl7ThdqcRPWIlhP3XdPsx3vkGyMQBzz9E.jpg"
            alt="Profile"
          />
        </div>
      </div>

      <div className="profile-info">
        <h1>
          {userInfo.firstName} {userInfo.lastName}
        </h1>
        <p>Trang công khai</p>
      </div>

      <div className="tabs">
        <a
          href="#"
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => handleTabChange("courses")}
        >
          Khoá học
        </a>
        <a
          href="#"
          className={activeTab === "results" ? "active" : ""}
          onClick={() => handleTabChange("results")}
        >
          Kết quả luyện thi
        </a>
        <a
          href="#"
          className={activeTab === "personalInfo" ? "active" : ""}
          onClick={() => handleTabChange("personalInfo")}
        >
          Thông tin cá nhân
        </a>
      </div>

      <div className="tab-content">
        {activeTab === "courses" && (
          <div>Danh sách khoá học sẽ được hiển thị ở đây.</div>
        )}
        {activeTab === "results" && <PracticeResults />}
        {activeTab === "personalInfo" && (
          <div className="personal-info">
            <h2>Thông tin cá nhân</h2>
            {isEditing ? (
              <div className="edit-form">
                <Form>
                  <Row>
                    <Col md={4}>
                      <Form.Label>Họ</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Label>Tên</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}></Col>
                    <Col md={3}>
                      <Button variant="primary" onClick={handleSave}>
                        Lưu
                      </Button>
                    </Col>
                    <Col md={3}>
                      <Button variant="secondary" onClick={handleBackClick}>
                        Quay lại
                      </Button>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </Form>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Họ và Tên:</strong> {userInfo.firstName}{" "}
                  {userInfo.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Username:</strong> {userInfo.username}
                </p>
                <p>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(userInfo.createdAt).toLocaleDateString()}
                </p>
                <button onClick={handleEditClick}>Chỉnh sửa</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
