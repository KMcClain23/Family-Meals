import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, LoginOutlined, LogoutOutlined, PlusCircleOutlined, HeartOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/Auth");
  };

  const items = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
      path: "/"
    },
  ];

  if (cookies.access_token) {
    items.push(
      {
        label: 'Recipes',
        key: 'recipes',
        icon: <HeartOutlined />,
        children: [
          {
            label: 'Create Recipe',
            key: 'create',
            icon: <PlusCircleOutlined />,
            path: "/create"
          },
          {
            label: 'Saved Recipes',
            key: 'saved',
            icon: <HeartOutlined />,
            path: "/saved"
          },
        ]
      },
      {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
        path: "/logout",
        onClick: logout
      }
    );
  } else {
    items.push({
      label: 'Login/Register',
      key: 'auth',
      icon: <LoginOutlined />,
      path: "/login"
    });
  }

  return (
    <Menu mode="horizontal" theme="dark">
      {items.map(item => (
        item.children ? (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map(subItem => (
              <Menu.Item key={subItem.key} icon={subItem.icon} onClick={() => navigate(subItem.path)}>
                {subItem.label}
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick || (() => navigate(item.path))}>
            {item.label}
          </Menu.Item>
        )
      ))}
    </Menu>
  );
};