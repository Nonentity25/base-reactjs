import React from 'react';

import { Breadcrumb, Layout, theme } from 'antd';
import HeaderLayout from './header';
import Sidebar from './sidebar';
const { Content } = Layout;



function MainLayout(props) {
    const { children } = props;

    const breadcrumbItems = [
        { title: 'User' },
        { title: 'Bill' },
      ];
  
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sidebar /> 
            <Layout>
                <HeaderLayout />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                        items={breadcrumbItems}
                    />
                        
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
            </Layout>
        </Layout>
    );
}

export default MainLayout;
