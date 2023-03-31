import './TodoMan.css';

const Todo = (props) => {
    return (
        <aside className={props.progress}>
            <span className='text'>
                <h3 >{props.text}</h3>
            </span>
            <span className="material-symbols-outlined icons">
                edit
            </span>
            <span className="material-symbols-outlined icons">
                delete
            </span>
        </aside>
    )
}
export default Todo;