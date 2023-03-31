import './Todo.css';

const Todo = () => {
    return (
        <article className='todo-man'>
            <aside className={'finished'}>
                Cook Dinner
            </aside>
            <aside className='progress'>
                Eat Dinner
            </aside>
            <aside className='unfinished'>
                Wash Dishes
            </aside>
        </article>
    )
}
export default Todo;