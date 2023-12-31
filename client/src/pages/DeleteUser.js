import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Popconfirm, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const DeleteUser = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const logout = () => {
        console.log('logout function called');
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");
    };

    const [user, setUser] = useState({});
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        const userID = window.localStorage.getItem("userID");
        if (userID) {
        axios
            .get(`https://family-recipe-server.onrender.com/Auth/users/${userID}`, {
            headers: {
                Authorization: `${cookies.access_token}`,
            },
            })
            .then((response) => {
            setUser(response.data);
            })
            .catch((error) => {
            console.error(error);
            });
        }
    }, [cookies.access_token]);

    const deleteAccount = async (values) => {
    try {
        if (user.username !== values.username) {
            message.error("You are not authorized to delete this account.");
            return;
        }

        const result = await axios.delete(
            `https://family-recipe-server.onrender.com/auth/users/${user._id}`,
            {
                data: {
                    username: values.username,
                    password: values.password,
                },
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            }
        );

        console.log('status code:', result.status);

        if (result.status === 200) {
            logout();
        } else if (result.data.message) {
            setMessageText(result.data.message);
        }
    } catch (error) {
        console.error(error);

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message ===
            "Unauthorized. You can only delete your own account."
        ) {
            message.error("You are not authorized to delete this account.");
        } else if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message === "Username or Password is incorrect."
        ) {
            setMessageText("Username or Password is incorrect.");
        }
    }
};

    return (
        <div
        style={{
            backgroundColor: "lightcoral",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
        }}
        >
        <Form
            form={form}
            name="delete_user_form"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, width: "100%", padding: "20px" }}
        >
            <h2>Delete User</h2>
            {messageText && <p>{messageText}</p>}
            <Form.Item
            name="username"
            rules={[
                {
                required: true,
                message: "Please enter your Username!",
                },
            
            ]}
            >
            <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username (Required)"
            />
            </Form.Item>
            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: "Please enter your Password!",
                },
            ]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password (Required)"
            />
            </Form.Item>
            <Form.Item>
            <Popconfirm
                title="Are you sure you want to delete your account? &#9785;"
                onConfirm={() => deleteAccount(form.getFieldsValue())}
                okText="Yes"
                cancelText="No"
            >
                <Button
                    type="primary"
                    danger
                    className="login-form-button"
                >
                    Delete Account
                </Button>
            </Popconfirm>
            Or <Link to="/edituser">Edit User</Link>
            </Form.Item>
        </Form>
        </div>
    );
};