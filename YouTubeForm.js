import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'


// Объект, соджержащий начальные значения для всех полей формы
const initialValues = {
    name: 'Иван',
    email: '',
    channel: '',
    comments: ''
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

    // Возвращаем JSX элемент, который содержит структуру компонента из трех полей
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <Field
                        type='text'
                        id='name'
                        name='name'
                    />
                    <ErrorMessage name='name'/>
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <Field
                        type='email'
                        id='email'
                        name='email'
                    />
                    <ErrorMessage name='email'/>
                </div>
                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <Field
                        type='text'
                        id='channel'
                        name='channel'
                    />
                    <ErrorMessage name='channel'/>
                </div>
                <div className='form-control'>
                    <label htmlFor='comments'>Comments</label>
                    <Field
                        component = 'textarea'
                        id='comments'
                        name='comments'
                    />
                    <ErrorMessage name='channel'/>
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    );
};

// Импортируем компонент YouTubeForm
export default YouTubeForm;