import AuthLayout from 'layouts/auth-layout';
import React from 'react';
import styles from './styles.module.scss';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
	const navigate = useNavigate(); 

	return (
		<AuthLayout>
			<div className={styles.loginWrap}>
				<h1>Quên Mật Khẩu</h1>
				<p className={styles.text}>Nhập email để thiết lập lại mật khẩu</p>
				<div className={styles.field}>
					<div className={styles.label}>Email</div>
					<Input placeholder='Nhập email' />
				</div>
				<Button className={styles.btnLogin} type='primary'>Gửi Yêu Cầu</Button>
				<p className={styles.forgot} onClick={() => navigate('/login')}>Quay lại trang đăng nhập</p>
				
			</div>
		</AuthLayout>
	);
}

export default ResetPassword;
