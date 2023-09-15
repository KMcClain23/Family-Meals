import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
import { HomeOutlined, LogoutOutlined, PlusCircleOutlined, HeartOutlined, UserOutlined, EditOutlined, IdcardOutlined, BulbOutlined } from '@ant-design/icons';

export const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");
    };

    const buttons = [
        {
        label: 'Home',
        icon: <span style={{ fontSize: '20px' }}><HomeOutlined /></span>,
        onClick: () => navigate("/"),
        description: 'Home',
        type: "primary"
        },
        {
            label: 'Toggle Theme',
            icon: <span style={{ fontSize: '20px' }}><BulbOutlined /></span>,
            onClick: toggleTheme,
            description: 'Toggle Theme',
            type: "primary"
        }
    ];

    if (!cookies.access_token) {
        buttons.push(
        {
            label: 'Signup',
            icon: <span style={{ fontSize: '20px' }}><IdcardOutlined /></span>,
            onClick: () => navigate("/register"),
            description: 'Signup',
            type: "primary"
        }
        );
    }

    if (cookies.access_token) {
        buttons.push(
        {
            label: 'Create Recipe',
            icon: <span style={{ fontSize: '20px' }}><PlusCircleOutlined /></span>,
            onClick: () => navigate("/CreateRecipe"),
            description: 'New Recipe',
            type: "primary"
        },
        {
            label: 'Saved Recipes',
            icon: <span style={{ fontSize: '20px' }}><HeartOutlined /></span>,
            onClick: () => navigate("/SavedRecipes"),
            description: 'View Saved',
            type: "primary"
        },
        {
            label: 'Edit User',
            icon: <span style={{ fontSize: '20px' }}><EditOutlined /></span>,
            onClick: () => navigate("/EditUser"),
            description: 'Edit Info',
            type: "primary"
        },
        {
            label: 'Logout',
            icon: <span style={{ fontSize: '20px' }}><LogoutOutlined /></span>,
            onClick: logout,
            description: 'Logout',
            type: "primary"
        }
        );
    }

    return (
        <>
        <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{ right: 35 }}
            icon={<UserOutlined />}
        >
            {buttons.map(button => <FloatButton key={button.label} {...button} />)}
        </FloatButton.Group>
        </>
    );
};
