import React from "react";
import { useContext, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios"

function Profile(props) {
    let { authToken } = useContext(AuthContext)

    useLayoutEffect(() => {
        axios.get("http://127.0.0.1:8000/api/profile/", {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${String(authToken.access)}`
            }
        }).then(response => {
            console.log(response.data.user)
            props.setUser(response.data.user)
        })
    }, [])
    
    let { user } = useContext(AuthContext)
    console.log(user)
    return (
        <div className="container">
            <h3>Профиль</h3>
            <NavLink to="/vacansies" className='back'>Назад</NavLink>
            <div className="cart">
                <div >
                    <p className="name_user">{user.full_name}</p>
                    <p className="name_role">{user.is_header_dep ? 'Глава департамента' : 'Сотрудник'}</p>
                    <div className="form_photo">
                        <div className="data">
                            <p>E-mail: {user.email}</p>
                            <p>Телефон: 88005553535</p>
                        </div>
                        <div className="photo">
                            <img src={user.image}></img>
                        </div>
                    </div>
                    <div className="buttons_profile">
                        <NavLink to="/profile/edit" className='edit_data_btn orange'>Изменить данные</NavLink>
                        <button className="change_password grey">Изменить пароль</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile;