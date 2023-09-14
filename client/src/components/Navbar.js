import React from 'react';
import { FloatButton } from 'antd'; 
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, LogoutOutlined, PlusCircleOutlined, HeartOutlined, PlusOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';

export const Navbar = () => {
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
            icon: <span style={{ fontSize: '24px', height: '40px', width: '40px' }}><HomeOutlined /></span>,
            onClick: () => navigate("/"),
            description: 'Home'
        },
        {
            label: 'Signup',
            icon: <span style={{ fontSize: '24px', height: '40px', width: '40px' }}><IdcardOutlined /></span>,
            onClick: () => navigate("/register"),
            description: 'Signup'
        },
    ];

    if (cookies.access_token) {
        buttons.push(
        {
            label: 'Create Recipe',
            icon: <span style={{ fontSize: '24px', height: '40px', width: '40px' }}><PlusCircleOutlined /></span>,
            onClick: () => navigate("/CreateRecipe"),
            description: 'New Recipe',
        },
        {
            label: 'Saved Recipes',
            icon: <span style={{ fontSize: '24px', height: '40px', width: '40px' }}><HeartOutlined /></span>,
            onClick: () => navigate("/SavedRecipes"),
            description: 'View Saved'
        },
        {
            label: 'Edit User',
            icon: <span style={{ fontSize: '24px', height: '40px', width: '40px' }}><EditOutlined /></span>,
            onClick: () => navigate("/EditUser"),
            description: 'Edit Info'
        },
        {
            label: 'Logout',
            icon: <span style={{ fontSize: '24px', height: '40px', width: '40px' }}><LogoutOutlined /></span>,
            onClick: logout,
            description: 'Logout'
        }
        );
    }

    return (
        <>
            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{ right: 24 }}
                icon={<PlusOutlined />}
            >
                {buttons.map(button => <FloatButton key={button.label} {...button} />)}
            </FloatButton.Group>
        </>
    );
};