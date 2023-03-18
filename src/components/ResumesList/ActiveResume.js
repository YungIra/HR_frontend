import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ActiveResume = (props) => {
    let { authToken, user } = useContext(AuthContext)
    const location = useLocation();
    let path = `/resume/edit/${location.state.id}`
    let nav = useNavigate()

    let notPublish = () => {
        let data = location.state
        data.status = 'N_P'
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/resumes/${location.state.id}/`,
            headers: {
                Authorization: `Bearer ${String(authToken.access)}`,
            },
            params: {
                status: 'my'
            },
            data: {
                id:location.state.id,
                status: 'N_P'
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.status===200) nav('/resumes')
            })
    }
    let publish = () => {
        let data = location.state
        data.status = 'Y_P'
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/resumes/${location.state.id}/`,
            headers: {
                Authorization: `Bearer ${String(authToken.access)}`,
            },
            params: {
                status: 'my'
            },
            data: {
                id:location.state.id,
                status: 'Y_P'
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.status===200) nav('/resumes')
            })
    }

    let sendRequest = () => {
        let data = {
            status: '2',
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
                    else alert('Вы уже отправили заявку на это резюме')
                }
            })
    }

    return (
        <div className="container">
            {(location.state.user.id == user.id && location.state.status !== 'Y_P') &&
                <div>
                    <div className="steps">
                        <h3>Черновик резюме</h3>
                        <p><span>Шаг 2</span> из 3</p>
                    </div>
                    <div className="bar_2"></div>
                </div>
            }
            {(location.state.user.id == user.id && location.state.status === 'Y_P') &&
                <div>
                    <div className="steps">
                        <h3>Резюме опубликовано</h3>
                        <p><span>Шаг 3</span> из 3</p>
                    </div>
                    <div className="bar_3"></div>
                </div>
            }
            <NavLink to="/resumes" className='back'>Назад</NavLink>
            {location.state.user.id == user.id && <NavLink to={path} state={location.state} className='grey edit_resume'>Редактировать</NavLink>}
            <div className="active_resume">
                <div className="active_block_resume ">
                    <div className="active_info">
                        <h2 className="active_block_item">{location.state.user.full_name}</h2>
                        <p className="active_block_item">Email: {location.state.user.email}</p>
                        <p className="active_block_item">Желаемая зарплата: {location.state.salary} руб</p>
                        <p className="active_block_item">Опыт работы: {location.state.exp_work}</p>
                        <p>{location.state.about_me}</p>

                    </div>
                    <div className="active_files">
                        <img className='photo' src={location.state.image} />
                        <a href={location.state.file} download target='_blank' className="see grey">Смотреть резюме</a>
                    </div>
                </div>
            </div>
            {location.state.user.id !== user.id &&
                <div className="send_request_resume">
                    <button onClick={sendRequest} className="btn_resume orange " title="На почту сотрудника будет отправлено письмо о том, что вы заинтересовались его резюме.">Отправить заявку</button>
                </div>

            }
            {(location.state.user.id === user.id && location.state.status !== 'Y_P') && <button className="btn_resume orange " onClick={publish}>Опубликовать</button>}
            {(location.state.user.id === user.id && location.state.status === 'Y_P') && <button className="btn_resume orange " onClick={notPublish}>Снять с публикации</button>}
        </div>
    )

}

export default ActiveResume;