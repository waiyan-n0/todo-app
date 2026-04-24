import {useContext} from "react";
import {Context} from "./Context.jsx";

function Lists(){
    const {state, dispatch} = useContext(Context);
    const todayDate = new Date().toISOString().split("T")[0];
    const filteredByView = state.tasks.filter((task) => {
        const taskDate = task.reminder ? task.reminder.split("T")[0] : "";
        switch (state.currentView) {
            case 'All': {return !task.completed}
            case 'Today':{ return taskDate === todayDate && !task.completed;}
            case 'Upcoming':{ return taskDate > todayDate && !task.completed;}
            case 'Personal': return task.category === 'Personal' && !task.completed;
            case 'Work': return task.category === 'Work' && !task.completed;
            case 'Completed': return task.completed ===true;
            default: return true;
        }
    })
    const filteredTasks = filteredByView.filter((task) => {
        return task.tasks.toLowerCase().includes(state.searchInput.toLowerCase());
    });

    const handleDelete = (task) => {
        dispatch({type: 'REMOVE_TASK', payload: task.id});
        dispatch({type: 'SHOW_ALERT', payload:{message:'TASK DELETED SUCCESSFULLY!', type:'delete'}});
        setTimeout(() => {
            dispatch({ type: 'HIDE_ALERT' });
        }, 3000);
    }
    const handleCompleted = (task) => {
        dispatch({type: 'COMPLETE_TASK', payload: task});
        const alertMsg = !task.completed?'TASK MARKED AS COMPLETED!':'TASK RESTORE SUCCESSFULLY!';
        dispatch({type:'SHOW_ALERT', payload: {message: alertMsg, type:'complete'}});
        setTimeout(() => {
            dispatch({type: 'HIDE_ALERT'});
        },3000)
    };
    return (
        <div >
            {filteredTasks.length === 0 && <p className='py-2'>{state.searchInput? `Does not matched any results with "${state.searchInput}"!` : 'No Tasks yet. Add one!'}</p>}
            <ul className='flex flex-col gap-3 p-8'>
                <div className={`text-left flex gap-2 items-center`}>{state.currentView} Tasks
                    {(state.currentView==='Completed') && <span className={`text-sm text-red-500 opacity-70 blink-text font-semibold`}>(Completed tasks will be deleted in next 24 hours!)</span>}
                </div>
                {filteredTasks.map((task) =>(
                    <li key={task.id} className='flex flex-row items-center justify-between bg-gray-500 rounded-md p-4'>
                        <span className={`flex items-center gap-4 text-gray-700 transition-all ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            <span className={`w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all duration-20 shrink-0 ${task.completed ? 'bg-white shadow-md' : ''}`}
                                  onClick={()=>handleCompleted(task)}>
                                    {task.completed && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                            </span>
                            <div className='flex flex-col text-left'>
                                <span className='text-white'>{task.tasks}</span>
                                {task.reminder && (
                                    <span className='flex flex-row items-center gap-1 text-gray-400 font-semibold text-xs sm:text-base'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                        {new Date(task.reminder).toLocaleString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                </span>
                                )}
                            </div>
                        </span>
                        <div className='flex flex-row space-x-3'>
                            <button className='cursor-pointer'
                                    onClick={() => dispatch({type: 'START_EDIT_TASK', payload: task})}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-blue-800" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                            </button>
                            <button className='cursor-pointer'
                                    onClick={()=>handleDelete(task)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Lists;