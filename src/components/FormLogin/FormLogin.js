import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './FormLogin.module.scss';
import * as userServices from '~/services/userService';

const cx = classNames.bind(styles);

function FormLogin() {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });

    const setFieldValue = ({ target: { name, value } }) => {
        setFields((fields) => ({
            ...fields,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const fetchApi = async () => {
            try {
                let result = await userServices.login(fields);

                if (result.data) {
                    localStorage.setItem('token', result.meta.token);
                    localStorage.setItem('user', JSON.stringify(result.data));
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    };

    return (
        <form id={cx('form')} className={cx('form')} onSubmit={handleLogin}>
            <h3 className={cx('heading')}>Đăng Nhập</h3>

            <div className={cx('spacer')}></div>
            <div className={cx('form__group')}>
                <label htmlFor="email" className={cx('form__label')}>
                    Email
                </label>
                <input
                    type="email"
                    value={fields.email}
                    className={cx('form__input')}
                    id="email"
                    name="email"
                    placeholder="Vd: abc@gmail.com"
                    onChange={setFieldValue}
                />
            </div>

            <div className={cx('form__group')}>
                <label htmlFor="password" className={cx('form__label')}>
                    Mật khẩu
                </label>
                <input
                    type="password"
                    value={fields.password}
                    className={cx('form__input')}
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={setFieldValue}
                />
            </div>
            <div className={cx('form__group')}>
                <button type="submit" className={cx('form__submit')}>
                    Đăng nhập
                </button>
            </div>
        </form>
    );
}

export default FormLogin;
