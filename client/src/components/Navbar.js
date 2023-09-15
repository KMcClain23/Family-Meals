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
            icon: <span style={{ fontSize: '20px',  }}><HomeOutlined /></span>,
            onClick: () => navigate("/"),
            description: 'Home',
            type: "primary"
            }
        ];

    if (!cookies.access_token) {
        // Only push the "Signup" button when the user is not logged in
        buttons.push(
            {
                label: 'Signup',
                icon: <span style={{ fontSize: '20px',  }}><IdcardOutlined /></span>,
                onClick: () => navigate("/register"),
                description: 'Signup',
                type: "primary"
            }
            );
        }
        
        if (cookies.access_token) {
            buttons.push(
            // Add other buttons for logged-in users here
            {
                label: 'Create Recipe',
                icon: <span style={{ fontSize: '20px', }}><PlusCircleOutlined /></span>,
                onClick: () => navigate("/CreateRecipe"),
                description: 'New Recipe',
                type: "primary"
            },
            {
                label: 'Saved Recipes',
                icon: <span style={{ fontSize: '20px', }}><HeartOutlined /></span>,
                onClick: () => navigate("/SavedRecipes"),
                description: 'View Saved',
                type: "primary"
            },
            {
                label: 'Edit User',
                icon: <span style={{ fontSize: '20px', }}><EditOutlined /></span>,
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
                icon={<PlusOutlined />}
            >
                {buttons.map(button => <FloatButton key={button.label} {...button}/>)}
            </FloatButton.Group>
        </>
    );
};