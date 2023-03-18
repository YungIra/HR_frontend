import React, { useContext, useLayoutEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import main from '../imgs/main.png'
import logo from '../imgs/logo.png'

const Activate = () => {
    const { uid, token } = useParams()
    let nav = useNavigate()

    let [block, setBlock] = useState(
        <div className='activate_item'>
            <h3>Нажмите на кнопку активации учетной записи</h3>
        </div>
    )

    let activate = () => {
        axios.post("http://127.0.0.1:8000/auth/users/activation/", {
            uid: uid,
            token: token
        })
            .then((response) => {
                if (response.status == 204) {
                    setBlock(
                        <div className='activate_item'>
                            <h3>Ваша учётная запись подтверждена!</h3>
                            <button onClick={() => nav('/')} className='orange activate'>Перейти на сайт</button>
                        </div>
                    )
                }
            })
    }
    useLayoutEffect(() => {
        setBlock(
            <div className='activate_item'>
                <h3>Нажмите на кнопку для активации учетной записи</h3>
                <button onClick={activate} className='orange activate'>Активировать</button>
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

export default Activate;
