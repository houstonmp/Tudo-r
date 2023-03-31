import React, { useState } from 'react';
import './TodoMan.css';
import Todo from './Todo'



// const [TodoArr, setTodo] = useState('');

const TodoMan = (props) => {


    return (
        <article className='todo-man'>
            {!props.isDisplay ? <h2>What are you going <span>Tudo</span> today?</h2> : props.TodoArr.map((el) => {
                return <Todo
                    id={el.id}
                    key={el.id}
                    text={el.text}
                    progress={el.progress}
                    onDel={props.delTodo}
                />;
            })}

        </article>
    )
}
export default TodoMan;