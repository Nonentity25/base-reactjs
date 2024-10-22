import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import AuthLayout from 'layouts/auth-layout';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataLogin } from 'modules/auth/states';
import _ from 'lodash';
import { login } from 'modules/auth/api';
function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dataLogin = useSelector(state => state.auth.dataLogin);
	const isAuthSuccess = useSelector(state => state.auth.isAuthSuccess);

	const handleChangeInput = (valueInput, type) => {
		let value = valueInput.target.value;
		let data = _.cloneDeep(dataLogin);
		data[type] = value;
		dispatch(setDataLogin(data));
	}

	const handleLogin = () => {
		dispatch(login(dataLogin));
	}

	useEffect(() => {
		if (isAuthSuccess) {
		  navigate('/')
		}
	  }, [isAuthSuccess, navigate])

	return (
		<AuthLayout>
			<div className={styles.loginWrap}>
				<h1>Đăng Nhập</h1>
				<div className={styles.field}>
					<div className={styles.label}>Tài khoản</div>
					<Input 
					placeholder='Nhập email'
					value={dataLogin?.email} 
					onChange={(e) => handleChangeInput(e, 'email')}
					/>
				</div>
				<div className={styles.field}>
					<div className={styles.label}>Mật khẩu</div>
					<Input 
					placeholder='Nhập mật khẩu'
					value={dataLogin?.password} 
					onChange={(e) => handleChangeInput(e, 'password')}
					/>
				</div>
				<p className={styles.forgot} onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</p>
				<Button className={styles.btnLogin} type='primary' onClick={handleLogin}>Đăng Nhập</Button>
			</div>
		</AuthLayout>

	);
}

export default Login;
