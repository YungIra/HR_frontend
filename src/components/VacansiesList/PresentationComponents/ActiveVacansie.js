import axios from "axios";
import React, { useContext, useLayoutEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const ActiveVacansie = (props) => {
    const location = useLocation();
    let { user, authToken } = useContext(AuthContext)
    let nav = useNavigate()

    let path = `/vacansie/edit/${location.state.id}`

    let notPublish = () => {
        let data = location.state
        data.status = 'N_P'
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/vacancies/${location.state.id}/`,
            headers: {
                Authorization: `Bearer ${String(authToken.access)}`,
            },
            params: {
                status: 'my'
            },
            data: data
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    nav('/vacansies')
                }
            })
    }
    let publish = () => {
        let data = location.state
        data.status = 'Y_P'
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/vacancies/${location.state.id}/`,
            headers: {
                Authorization: `Bearer ${String(authToken.access)}`,
            },
            params: {
                status: 'my'
            },
            data: data
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    nav('/vacansies')
                }
            })
    }
    let sendRequest = () => {
        let data = {
            title: location.state.title,
            status: '1',
            destination: location.state.user.id
        }
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/requests/`,
            headers: {
                Authorization: `Bearer ${String(authToken.access)}`,
            },
            data: data
        })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.err === undefined) {
                        alert('Ваша заявка отправлена!')
                    }
                    else alert('Вы уже отправили заявку на эту вакансию')
                }
            })
    }

    return (
        <div className="container">
            {(location.state.user.id == user.id && location.state.status !== 'Y_P') &&
                <div>
                    <div className="steps">
                        <h3>Черновик вакансии</h3>
                        <p><span>Шаг 2</span> из 3</p>
                    </div>
                    <div className="bar_2"></div>
                </div>
            }
            {(location.state.user.id == user.id && location.state.status === 'Y_P') &&
                <div>
                    <div className="steps">
                        <h3>Вакансия опубликована</h3>
                        <p><span>Шаг 3</span> из 3</p>
                    </div>
                    <div className="bar_3"></div>
                </div>
            }
            <NavLink to="/vacansies" className='back'>Назад</NavLink>
            {(location.state.user.id == user.id && location.state.status !== 'Y_P') && <NavLink to={path} state={location.state} className="grey edit_vacansie">Редактировать</NavLink>}
            <div className="active_block_vacansie">
                <h2 className="active_block_item">{location.state.title}</h2>
                <p className="active_block_item">Департамент: {location.state.department}</p>
                <p className="active_block_item">Минимальная зарплата: {location.state.salary} руб.</p>
                <p className="active_block_item">Стаж работы: {location.state.exp_work}</p>
                <p className="active_block_item">{location.state.description}</p>
            </div>
            {(location.state.user.id !== user.id) &&
                <div className="send_request_vacansie">
                    <button onClick={sendRequest} className="btn_vacansie orange" title="На почту сотрудника будет отправлено письмо о том, что вы заинтересовались его вакансией.">Отправить заявку</button>
                    {/* <p className="send_alert_vacansie">На почту сотрудника будет отправлено письмо<br></br> о том, что вы заинтересовались его вакансией.</p> */}
                </div>
            }
            {(location.state.user.id === user.id && location.state.status !== 'Y_P') && <button className="btn_vacansie orange" onClick={publish}>Опубликовать вакансию</button>}
            {(location.state.user.id === user.id && location.state.status === 'Y_P') && <button className="btn_vacansie orange" onClick={notPublish}>Снять с публикации</button>}
        </div>
    )

}

export default ActiveVacansie;
