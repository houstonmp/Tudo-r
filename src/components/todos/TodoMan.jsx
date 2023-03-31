// import React, { useState } from 'react';
import './TodoMan.css';
import Todo from './Todo'



// const [TodoArr, setTodo] = useState('');

const TodoMan = (props) => {

    return (
        <article className='todo-man'>
            <button className="button">Add Tudo</button>
            {props.TodoArr.map((el) => {
                return <Todo
                    id={el.id}
                    key={el.id}
                    text={el.text}
                    progress={el.progress}
                />;
            })}

        </article>
    )
}
export default TodoMan;