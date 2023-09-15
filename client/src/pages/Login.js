import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const result = await axios.post("http://localhost:3001/auth/login", {
                username: values.username,
                password: values.password,
            });

            if (result.data.message === "User does not exist.") {
                // Handle the case when the user does not exist
                message.error("User does not exist. Please check your username.");
            } else if (result.data.message === "Username or Password is incorrect.") {
                // Handle the case when the password is incorrect
                message.error("Username or Password is incorrect. Please try again.");
            } else {
                // Login successful
                setCookies("access_token", result.data.token);
                window.localStorage.setItem("userID", result.data.userID);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: "aliceblue", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, width: "100%", padding: "20px" }}
        >
            <h2>Login</h2>
            <Form.Item
            name="username"
            rules={[
                {
                required: true,
                message: "Please input your Username!",
                },
            ]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: "Please input your Password!",
                },
            ]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
            </Form.Item>
            <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
                Forgot password
            </a>
            </Form.Item>

            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "50%", margin: "0 auto" }}>
                Login
            </Button>
            Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
        </div>
    );
};

export default Login;
