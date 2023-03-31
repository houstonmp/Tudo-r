import './Todo.css';

const Todo = () => {
    return (
        <article className='todo-man'>
            <button className="button">Add Tudo</button>
            <aside className={'finished'}>
                <h3>Cook Dinner</h3>
            </aside>
            <aside className='progress'>
                <h3>Cook Dinner</h3>
            </aside>
            <aside className='unfinished'>
                <h3>Cook Dinner</h3>
            </aside>
        </article>
    )
}
export default Todo;