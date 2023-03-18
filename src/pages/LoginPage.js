import React, { useContext, useLayoutEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import main from '../imgs/main.png'
import axios from 'axios'
import Modal from '../components/Modal'

const LoginPage = (props) => {
    let { loginUser } = useContext(AuthContext)
    const [isModal, setModal] = useState(false);
    let [email, setEmail] = useState()

    const w = {
        width: '90%'
    }

    const resetPassword = (e) => {
        axios.post("http://127.0.0.1:8000/auth/users/reset_password/", {
            email: email
        })
            .then((response) => {
                if (response.status == 204) {
                    alert('На вашу почту отправлено письмо. Проверьте её и установите новый пароль.')
                    setModal(false)
                }
                else alert('Ошибочка')

            })
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className='login'>
            <form onSubmit={loginUser}>
                <input type='email' name='email' placeholder='Email' className='input_auth ' />
                <input type='password' name='password' placeholder='Пароль' className='input_auth password log' />
                <NavLink onClick={() => setModal(true)} className='resetpasswordlink'>Забыли пароль?</NavLink>
                <Modal
                    isVisible={isModal}
                    title="Восстановление доступа"
                    content={
                        <div>
                            <label for='email' className='resetpasswordlink'>Введите email. Вам будет отправлено письмо для сброса пароля.</label><br />
                            <input type='email' name='email' id='email' placeholder='Email' className='input_auth' style={w} value={email} onChange={changeEmail} required /><br />
                            <div onClick={resetPassword} className='resetpasswordbtn'>Отправить</div>
                        </div>
                    }
                    onClose={() => setModal(false)}
                />
                <button type='submit' className='btn_auth'>Войти</button>
            </form>

        </div>
    )
}

export default LoginPage