import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const EditUser = () => {
    const [cookies] = useCookies(["access_token"]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        // Fetch user data based on userID from localStorage
        const userID = window.localStorage.getItem("userID");
        if (userID) {
            // Fetch user data using the user's ID from your API
            axios.get(`http://localhost:3001/Auth/users/${userID}`, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
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

    const onFinish = async (values) => {
        try {
            const result = await axios.put(`http://localhost:3001/auth/users/${user._id}`, {
                username: values.username,
                password: values.password,
                newPassword: values.newPassword, // If you want to update the password
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
    
            if (result.data.message) {
                setMessageText(result.data.message);
            } else {
                // Successfully updated user information
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === "Username is already taken.") {
                // Handle the case where the new username is already taken
                setMessageText("Username is already taken. Please choose a different username.");
            } else {
                console.error(error);
            }
        }
    };
    

    return (
        <div style={{ backgroundColor: "aliceblue", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
        <Form
            form={form}
            name="edit_user_form"
            initialValues={{
                username: user.username,
            }}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, width: "100%", padding: "20px" }}
        >
            <h2>Edit User Information</h2>
            {messageText && <p>{messageText}</p>}
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Change Username or enter your current Username (Required)" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Current Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Current Password (Required)"
                />
            </Form.Item>
            <Form.Item
                name="newPassword"
                rules={[
                    {
                        required: false,
                        message: 'Please input your New Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="New Password (optional)"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Update
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default EditUser;