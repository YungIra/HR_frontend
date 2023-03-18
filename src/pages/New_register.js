import React, { useContext, useState, useLayoutEffect, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../imgs/logo.png'
import AuthContext from '../context/AuthContext'
import main from '../imgs/main.png'

const New_register = () => {
    const { uid, token } = useParams()
    let nav = useNavigate()
    let [block, setBlock] = useState()
    let [password, setPas] = useState()
    let [password2, setPas2] = useState()

    const changePas = (e) => {
        password = e.target.value

    }

    const changePas2 = (e) => {
        password2 = e.target.value
    }

    let submitNewPass = () => {
        console.log(password, password2)
        if (password !== password2) {
            alert('Пароли не совпадают')
            return
        }
        axios.post("http://127.0.0.1:8000/auth/users/reset_password_confirm/", {
            uid: uid,
            token: token,
            new_password: password,
        })
            .then((response) => {
                if (response.status == 204) {
                    setBlock(
                        <div className='register'>
                            <div className='auth_form'>
                                <h3>Пароль успешно изменён!</h3>
                                <button onClick={() => nav('/')} className='orange activate'>Перейти на сайт</button>
                            </div>
                        </div>
                    )
                }
            })
    }
    useEffect(() => {
        setBlock(
            <div className='register'>
                <div className='auth_form'>
                    <h3>Установите новый пароль</h3>

                    <input type='password' name='password' placeholder='Введите новый пароль' className='input_reg password' value={password} onChange={changePas} required />
                    <input type='password' name='password2' placeholder='Повторите пароль' className='input_reg password' value={password2} onChange={changePas2} required />
                    <button onClick={submitNewPass} className='btn_reg'>Сохранить</button>
                </div>
            </div>
        )
    }, [])
    return (
        <div className='auth-page'>
            <div className='auth'>
                <img src={logo} className='logo' />
                {block}
            </div>
            <div className='plitka'>
                <img src={main} />
            </div>
        </div>

    )
}

export default New_register;