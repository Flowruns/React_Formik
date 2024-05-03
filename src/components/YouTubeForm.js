import React from 'react';
import {useFormik} from 'formik'

/**
 * Компонент форма для ютуб
 */
const YouTubeForm = () => {
    
    // Импортируем хук для управления состоянием
    const formik = useFormik({
        
        // Объект, соджержащий начальные значения для всех полей формы
        initialValues: {
            name: 'Иван',
            email: '',
            channel: ''
        },
        
        // Метод, принимающий состояние формы 
        // Всегда получает последнее значение формы в качестве аргумента
        onSubmit: values => {
            console.log('Данные формы', values)
        }
    })
    
    //console.log("Значения формы", formik.values)
    
    // Возвращаем JSX элемент, который содержит структуру компонента из трех полей
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>

                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email}/>

                <label htmlFor='channel'>Channel</label>
                <input type='text' id='channel' name='channel' onChange={formik.handleChange} value={formik.values.channel}/>
                
                <button type='submit'>Submit</button>
            </form>

        </div>
    );
};

// Импортируем компонент YouTubeForm
export default YouTubeForm;