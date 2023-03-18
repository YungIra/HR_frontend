import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const OpenBlock = () => {
    let { logoutUser, user } = useContext(AuthContext)

    return (
        <div className="openblock">
            <div className="headblock">
                {/* <img className="avatar" src={user.image}></img> */}
                {/* <NavLink to="/profile" className="fullname">{user.full_name}</NavLink> */}
                {/* <img src="../imgs/down.png"></img> */}
                
            </div>
            <div className="linkblock">
                <NavLink to="/profile" className="fullname">Профиль</NavLink>
                {user.is_admin && <a href="http://127.0.0.1:8000/admin/" target="_blank">Админка</a>}
                <NavLink className='' onClick={logoutUser} to="">Выйти</NavLink>
            </div>
            
        </div>
    )
}

export default OpenBlock;