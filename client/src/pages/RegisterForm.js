// import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const checkUsername = await axios.post("http://localhost:3001/auth/check-username", {
                username: values.username,
            });

            if (checkUsername.data.message === "Username already exists") {
                alert("Username already exists. Please choose a different one.");
            } else {
                await axios.post("http://localhost:3001/auth/register", {
                    username: values.username,
                    password: values.password,
                });
                alert("Registration Completed! Now login.");
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: "aliceblue", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
            <Form
                form={form}
                name="normal_register"
                className="register-form"
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600, width: "100%", padding: "20px" }}
            >
                <h2>Register</h2>
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
                <Button type="primary" htmlType="submit" className="register-form-button" style={{ width: "50%", margin: "0 auto" }}>
                    Register
                </Button>
                Or <Link to="/login">login now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;
