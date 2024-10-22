import React, { useState } from 'react';
import { Drawer, Layout, Popover } from 'antd';
import styles from './styles.module.scss';
import Profile from './components/profile';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'modules/auth/api';
const { Header } = Layout;
const HeaderLayout = () => {
    const dispatch = useDispatch()
    const authUser = useSelector(state => state.auth.authUser);
    const [isShowInformation, setIsShowInformation] = useState(false);
    const handleShowProfile = () => {
        setIsShowInformation(true)
    }

    return (
        <Header className={styles.headerWrap}>
            <div className={styles.headerRight}>
                <span className={styles.itemName}>{authUser.name}</span>
                <Popover
                    overlayClassName={styles.popoverWrap}
                    content={<div className={styles.mainModalInfoWrap}>
                        <ul className={styles.menuInfoWrap}>
                            <li onClick={() => handleShowProfile()}>
                                <div>
                                    <span className={styles.text}>Thông tin cá nhân</span>
                                </div>
                            </li>
                            <li onClick={()=> dispatch(logout())}>
                                <div>
                                    <span className={styles.text}>Đăng xuất</span>
                                </div>
                            </li>
                        </ul>
                    </div>}
                    trigger="click"
                    placement="bottomRight"
                >
                    <span className={styles.avatarWrap}>
                        <svg fill='currentColor'
                            viewBox="-51.2 -51.2 614.40 614.40" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z">
                                </path>
                            </g>
                        </svg>
                    </span>
                </Popover>
            </div>
            <Drawer
                title="Thông tin cá nhân"
                placement={'right'}
                closable={true}
                onClose={() => setIsShowInformation(false)}
                open={isShowInformation}
                key={'right'}
                width={520}
                // classNames={{
                //     header: styles.profileDrawerHeader
                // }}
            >
                <Profile authUser={authUser}/>
            </Drawer>
        </Header>
    );
}

export default HeaderLayout
