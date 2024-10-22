import React from "react";
import {
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const routeMap = [
    {
        key: "1",
        label: 'Tổng quan',
        icon: <HomeOutlined />,
        path: '/',
        active: ['/'],
    },
    {
        key: "2",
        icon: <UserOutlined />,
        label: 'Quản lý người dùng  ',
        path: '/user-management',
        active: ['/user-management'],
    },
    {
        key: "3",
        label: 'Navigation One',
        icon: <TeamOutlined />,
        children: [
            {
                key: "4",
                label: 'Option 5',
                active: ['/'],
            },
            {
                key: "5",
                label: 'Option 6',
                active: ['/'],
            },
        ],
    },
]

export default routeMap
