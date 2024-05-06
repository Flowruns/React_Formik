import React from 'react';


// Компонент для текста ошибки
const TextError = (props) => {
    
    // Возвращаем JSX элемент, который содержит структуру компонента для текста ошибки
    return (
        <div className='error'>
            {props.children}
        </div>
    );
};

// Экспортируем компонент TextError
export default TextError;