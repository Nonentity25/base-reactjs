import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import logo from 'assets/images/logo.png';
import routeMap from 'router/routeMap';
import { useLocation, useNavigate } from 'react-router-dom';
const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    const activeItem = routeMap.flatMap(item => item.children ? [item, ...item.children] : item)
      .find(item => item.active.includes(location.pathname));

    if (activeItem) {
      setSelectedKey(activeItem.key);
    }
  }, [location]);

  const onClick = (e) => {
    const flatItems = routeMap.flatMap(item => item.children ? [item, ...item.children] : [item]);
    const clickedItem = flatItems.find(item => item.key === e.key);

    if (clickedItem && clickedItem.path) {
        navigate(clickedItem.path, { replace: true });
    }
  };
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className='text-white font-bold flex items-center justify-center text-2xl h-16'>
                <img className='h-14 w-auto' src={logo} alt='' />
            </div>
            <Menu theme="dark"  selectedKeys={[selectedKey]} mode="inline" items={routeMap}  onClick={onClick} />
        </Sider>
    );
}

export default Sidebar
