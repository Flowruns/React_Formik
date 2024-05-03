import React from 'react';
import {useFormik} from 'formik'


// Объект, соджержащий начальные значения для всех полей формы
const initialValues = {
    name: 'Иван',
    email: '',
    channel: ''
}

/**
 * Метод, принимающий состояние формы
 * Всегда получает последнее значение формы в качестве аргумента
 */
const onSubmit = values => {
    console.log('Данные формы', values)
}

// Функция валидации полей
const validate = values => {

    // Создаем объект 
    let errors = {}

    // Если имя не заполнено
    if (!values.name) {

        // Тогда поле имени является обязательным для заполнения
        errors.name = 'Required'
    }

    // Если почта не заполнена
    if (!values.email) {

        // Тогда поле ввода почты является обязательным для заполнения
        errors.email = 'Required'

        // Иначе если заполнено, то проверяем введенный формат почты
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неверный формат почты'
    }

    // Если канал не заполнен
    if (!values.channel) {

        // Тогда поле ввода канала является обязательным для заполнения
        errors.channel = 'Required'
    }

    // Возвращаем олбъект
    return errors
}


/**
 * Компонент форма для ютуб
 */
const YouTubeForm = () => {

    // Импортируем хук для управления состоянием
    const formik = useFormik({

        // Начальные значения полей
        initialValues,

        // Получение введенных значений
        onSubmit,

        // Валидация полей
        validate,
    })

    // Возвращаем JSX элемент, который содержит структуру компонента из трех полей
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>

                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email}/>

                <label htmlFor='channel'>Channel</label>
                <input type='text' id='channel' name='channel' onChange={formik.handleChange}
                       value={formik.values.channel}/>

                <button type='submit'>Submit</button>
            </form>

        </div>
    );
};

// Импортируем компонент YouTubeForm
export default YouTubeForm;