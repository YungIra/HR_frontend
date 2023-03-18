import React, { useContext, useLayoutEffect } from 'react'

const Recover = () => {
    return(
        <div className='recover_item'>
            <p>Для восстановления доступа введите email, на который будет выслано письмо для подтверждения:</p>
            <input type='text' name='email' placeholder='Email' className='input_recover'></input>
            <div className='btns_recover'>
                <button className='grey to_enter'>Вернуться к входу</button>
                <button className='orange send'>Отправить</button>
            </div>
        </div>
    )
}

export default Recover;