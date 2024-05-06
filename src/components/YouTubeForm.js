import React from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'


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

// Определяем схему объекта проверки с помощью библиотеки Yup
const validationSchema = Yup.object({
    
    // Для поля имени
    name: Yup.string().required('Поле не заполнено'),
    
    // Для поля почты, тут устанавливаем еще и проверку на верный формат почты
    email: Yup.string().email('Неверный формат почты').required('Поле не заполнено'),
    
    // Для поля канала
    channel: Yup.string().required('Поле не заполнено')
})

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
        //validate,
        validationSchema
    })

    // Возвращаем JSX элемент, который содержит структуру компонента из трех полей
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name'
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>
                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input 
                        type='text' 
                        id='channel' 
                        name='channel'
                        {...formik.getFieldProps('channel')}
                    />
                    {formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
                </div>
                <button type='submit'>Submit</button>
            </form>

        </div>
    );
};

// Импортируем компонент YouTubeForm
export default YouTubeForm;