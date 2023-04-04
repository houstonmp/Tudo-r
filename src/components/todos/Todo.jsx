import './TodoMan.css';

const Todo = (props) => {
    return (
        <aside id={props.id} className={props.progress}>
            <span className='text'>
                <h3 >{props.text}</h3>
            </span>
            <a href=""></a>
            <a className="icons" onClick={props.onEdit}>
                <span className="material-symbols-outlined ">
                    edit
                </span>
            </a>
            <a className="icons" onClick={props.onDel}>
                <span className="material-symbols-outlined ">
                    delete
                </span>
            </a>

        </aside>
    )
}
export default Todo;