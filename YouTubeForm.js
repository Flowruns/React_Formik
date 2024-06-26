﻿import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import * as Yup from 'yup'
import TextError from "./TextError";


// Объект, соджержащий начальные значения для всех полей формы
const initialValues = {
    name: 'Иван',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

// Объект, соджержащий сохраненные значения для всех полей формы
const savedValues = {
    name: 'Иван',
    email: 'Ivan@mail.ru',
    channel: 'Vanko',
    comments: 'This is true comment',
    address: '35 Kirova street',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

/**
 * Метод, принимающий состояние формы
 * Всегда получает последнее значение формы в качестве аргумента
 */
const onSubmit = (values, onSubmitProps ) => {
    console.log('Данные формы', values)
    console.log('Данные для отправки', onSubmitProps)
    
    // Активируем кнопку "Отправить"
    onSubmitProps.setSubmitting(false)
    
    // Сбрасываем форму после отправки данных
    onSubmitProps.resetForm()
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
 * Валидация на уровне поля
 * @param value - значение из поля, в котором присутствует функция
 * @returns {string} - строка, указывающая об ошибке
 */
const validateComments = value => {
    
    // Объявляем ошибку
    let error
    
    // Проверяем пусто ли значение
    if (!value) {
        
        // Присваиваем ей сообщение
        error = 'Поле не заполнено'
    }
    
    // Возвращаем ошибку
    return error
} 

/**
 * Компонент форма для ютуб
 */
const YouTubeForm = () => {

    // Состояние значений полей формы
    const [formValues, setFormValues] = useState(null)
    
    // Возвращаем JSX элемент, который содержит структуру компонента из трех полей
    return (
        <Formik
            initialValues={formValues || initialValues }
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                console.log('Пропсы формика', formik)
                return (
            <Form>
                <div className='form-control'>
                    <label htmlFor='name'>Имя</label>
                    <Field
                        type='text'
                        id='name'
                        name='name'
                    />
                    <ErrorMessage name='name' component={TextError}/>
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <Field
                        type='email'
                        id='email'
                        name='email'
                    />
                    <ErrorMessage name='email'>
                        {
                            (errorMsg) => <div className='error'>{errorMsg}</div>
                        }
                    </ErrorMessage>
                </div>
                <div className='form-control'>
                    <label htmlFor='channel'>Канал</label>
                    <Field
                        type='text'
                        id='channel'
                        name='channel'
                    />
                    <ErrorMessage name='channel'/>
                </div>
                <div className='form-control'>
                    <label htmlFor='comments'>Комментарии</label>
                    <Field
                        as='textarea'
                        id='comments'
                        name='comments'
                        validate={validateComments}
                    />
                    <ErrorMessage name='comments' component={TextError} />
                </div>
                <div className='form-control'>
                    <label htmlFor='address'>Адрес</label>
                    <Field name='address'>
                        {
                            (props) => {
                                const {field, form, meta} = props
                                console.log("Пропс", props)
                                return (
                                    <div>
                                        <input type='text' id='address' {...field}/>
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )
                            }
                        }
                    </Field>
                    <ErrorMessage name='channel'/>
                </div>
                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook profile</label>
                    <Field
                        type='text'
                        id='facebook'
                        name='social.facebook'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='twitter'>Twitter profile</label>
                    <Field
                        type='text'
                        id='twitter'
                        name='social.twitter'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary phone number</label>
                    <Field
                        type='text'
                        id='primaryPh'
                        name='phoneNumbers[0]'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                    <Field
                        type='text'
                        id='secondaryPh'
                        name='phoneNumbers[1]'
                    />
                </div>
                <div className='form-control'>
                    <label>List of phone numbers</label>
                    <FieldArray name='phNumbers'>
                        {fieldArrayProps => {
                            const {push, remove, form} = fieldArrayProps
                            const {values} = form
                            const {phNumbers} = values
                            // console.log('Пропсы массивов', fieldArrayProps)
                            // console.log('Форма ошибки', form.errors)
                            return (
                                <div>
                                    {phNumbers.map((phNumber, index) => (
                                        <div key={index}>
                                            <Field name={`phNumbers[${index}]`}/>
                                            {index > 0 && (
                                                <button type='button' onClick={() => remove(index)}>
                                                    -
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type='button' onClick={() => push('')}>
                                        +
                                    </button>
                                </div>
                            )
                        }}
                    </FieldArray>
                </div>
                <button type='reset'>Отмена</button>
                <button type='button' onClick={() => setFormValues(savedValues)}>Загрузить</button>
                <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Отправить</button>
            </Form>
                )
            }}
        </Formik>
)
}

// Импортируем компонент YouTubeForm
export default YouTubeForm;