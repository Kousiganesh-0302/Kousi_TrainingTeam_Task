import React from 'react';
import { Layout, Menu, theme } from 'antd';
import {
    HomeOutlined,
    DashboardOutlined,
    UserOutlined,
    UploadOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import authService from '../../API/authService';

const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent = ({ children, currentPage, setCurrentPage, onLogout }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = async (e) => {
        if (e.key === 'logout') {
            try {
                await authService.logout();
                onLogout(); 
            } catch (error) {
                console.error('Logout failed:', error.message);
                alert('Logout failed: ' + error.message); 
            }
        } else {
            setCurrentPage(e.key);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div className="demo-logo-vertical" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px' }} />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[currentPage]}
                    mode="inline"
                    onClick={handleMenuClick}
                    items={[
                        {
                            key: 'home',
                            icon: <HomeOutlined />,
                            label: 'Home',
                        },
                        {
                            key: 'expense-dashboard',
                            icon: <DashboardOutlined />,
                            label: 'Expense Dashboard',
                        },
                        {
                            key: 'profile',
                            icon: <UserOutlined />,
                            label: 'Profile',
                        },
                        {
                            key: 'upload-file',
                            icon: <UploadOutlined />,
                            label: 'Upload File',
                        },
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            danger: true, 
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {/* <h2 style={{ marginTop: '13px' ,paddingLeft: '24px', color: '#333' }}>{currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2> */}
                    <h2 style={{ marginTop: '13px', paddingLeft: '24px', color: '#333' }}>{currentPage.split('-').map(word => word.toUpperCase()).join(' ')}</h2>

                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children} 
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    {/* Expense Tracker ©{new Date().getFullYear()} Created by Kousi */}
                    QBO Expense Tracker Dashboard | Created by Kousi
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;
