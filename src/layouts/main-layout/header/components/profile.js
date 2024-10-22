import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { passwordService, profileService } from './schema';
import { validate } from 'utils/validates/validate-joi';
import _ from 'lodash';
import MessError from 'components/mess-error';
import { changePassword, updateProfile } from 'modules/auth/api';
import { setDataChangePassword, setErrorChangePassword, setErrorInformation } from 'modules/app/states';

const Profile = ({ authUser }) => {
    const dispatch = useDispatch();
    const dataChangePassword = useSelector(state => state.app.dataChangePassword);
    const errorChangePassword = useSelector(state => state.app.errorChangePassword);
    const errorInformation = useSelector(state => state.app.errorInformation);
    const [dataInformation, setDataInformation] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (authUser) {
            setDataInformation({
                name: authUser.name,
                phone: authUser.phone,
                email: authUser.email,
            })
        }
    }, [authUser])

    const handleChangePassword = (scheme) => {
        validate(scheme, dataChangePassword, {
            onSuccess: () => {
                dispatch(changePassword(dataChangePassword))
            },
            onError: (error) => dispatch(setErrorChangePassword(error))
        });
    }

    const handleChangeProfile = (scheme) => {
        validate(scheme, dataInformation, {
            onSuccess: () => {
                dispatch(updateProfile(dataInformation))
            },
            onError: (error) => dispatch(setErrorInformation(error))
        });
    }

    const handleChangeInput = (e, type, key = 'profile') => {
        let value = e.target.value;
        if (key === 'password') {
            let data = _.cloneDeep(dataChangePassword);
            data[type] = value;
            dispatch(setDataChangePassword(data));
        } else {
            let data = _.cloneDeep(dataInformation);
            data[type] = value;
            setDataInformation(data);
        }
    }

    const handleForcusInput = (type, key = 'profile') => {
        if (key === 'password') {
            let data = _.cloneDeep(errorChangePassword);
            data[type] = '';
            dispatch(setErrorChangePassword(data));
        } else {
            let data = _.cloneDeep(errorInformation);
            data[type] = '';
            dispatch(setErrorInformation(data));
        }
    }

    return (
        <div>
            <div>
                <div className={`input-wrap`}>
                    <div className={'label-wrap'}>
                        Tên tài khoản <span className={'required'}>*</span>
                    </div>
                    <Input
                        className={`main-input`}
                        placeholder={'Nhập tên tài khoản'}
                        value={dataInformation.name}
                        onChange={(e) => handleChangeInput(e, 'name')}
                        onFocus={()=> handleForcusInput('name')}
                    />
                    <MessError message= {errorInformation?.name} />
                </div>
                <div className={`input-wrap`}>
                    <div className={'label-wrap'}>Email <span className={'required'}>*</span></div>
                    <Input
                        className={`main-input`}
                        placeholder={'Nhập email'}
                        value={dataInformation.email}
                        readOnly
                        onChange={(e) => handleChangeInput(e, 'email')}
                        onFocus={()=> handleForcusInput('email')}
                    />
                    <MessError message= {errorInformation?.email} />
                </div>
                <div className={`input-wrap`}>
                    <div className={'label-wrap'}>Số điện thoại</div>
                    <Input
                        className={`main-input`}
                        placeholder={'Nhập số điện thoại'}
                        value={dataInformation.phone}
                        onChange={(e) => handleChangeInput(e, 'phone')}
                        onFocus={()=> handleForcusInput('phone')}
                    />
                    <MessError message= {errorInformation?.phone} />
                </div>

                <div className={`flex justify-end`}>
                    <Button
                        type="primary"
                        size={'large'}
                        className={`!w-auto `}
                        block
                        onClick={() => {handleChangeProfile(profileService)}}
                    >Lưu thông tin
                    </Button>
                </div>
            </div>
            <div>
                <div className={`input-wrap mt-5`}>
                    <div className={'label-wrap'}>
                        Mật khẩu hiện tại <span className={'required'}>*</span>
                    </div>
                    <Input.Password
                        className={`main-input`}
                        placeholder={'Nhập mật khẩu hiện tại'}
                        value={dataChangePassword.currentPassword}
                        onChange={(e) => handleChangeInput(e, 'currentPassword', 'password')}
                        onFocus={()=> handleForcusInput('currentPassword', 'password')}
                    />
                    <MessError message= {errorChangePassword?.currentPassword} />
                </div>

                <div className={`input-wrap mt-5`}>
                    <div className={'label-wrap'}>
                        Mật khẩu mới <span className={'required'}>*</span>
                    </div>
                    <Input.Password
                        className={`main-input`}
                        placeholder={'Nhập mật khẩu'}
                        value={dataChangePassword.password}
                        onChange={(e) => handleChangeInput(e, 'password', 'password')}
                        onFocus={()=> handleForcusInput('password', 'password')}
                    />
                    <MessError message= {errorChangePassword?.password} />
                </div>

                <div className={`input-wrap mt-5`}>
                    <div className={'label-wrap'}>
                        Xác nhận mật khẩu mới <span className={'required'}>*</span>
                    </div>
                    <Input.Password
                        className={`main-input`}
                        placeholder={'Xác nhận mật khẩu'}
                        value={dataChangePassword.confirmPassword}
                        onChange={(e) => handleChangeInput(e, 'confirmPassword', 'password')}
                        onFocus={()=> handleForcusInput('confirmPassword', 'password')}
                    />
                    <MessError message= {errorChangePassword?.confirmPassword} />
                </div>

                <div className={`flex justify-end`}>
                    <Button
                        type="primary"
                        size={'large'}
                        className={`!w-auto`}
                        block
                        onClick={() => {handleChangePassword(passwordService)}}
                    >Thay đổi mật khẩu
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Profile
