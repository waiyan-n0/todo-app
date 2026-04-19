import {useContext} from "react";
import {Context} from "./Context.jsx";

function Lists(){
    const {state, dispatch} = useContext(Context)

    return (
        <div >
            {state.tasks.length === 0 && <p className='py-2'>No Tasks yet. Add one!</p>}
            <ul className='flex flex-col gap-3 p-8'>
                {state.tasks.map((task) =>(
                    <li key={task.id} className='flex flex-row items-center justify-between bg-gray-500 rounded-md p-4'>
                        <span className={`flex items-center gap-4 text-gray-700 transition-all ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            <span className={`w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all duration-20 shrink-0 ${task.completed ? 'bg-white shadow-md' : ''}`}
                                  onClick={() => dispatch({type: 'COMPLETE_TASK', payload: task})}>
                                    {task.completed && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                            </span>
                            <div>
                                <span className='text-white'>{task.tasks}</span>
                                {task.reminder && (
                                    <span className='flex flex-row items-center gap-1 text-gray-400 text-sm font-semibold'>
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
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                            </button>
                            <button className='cursor-pointer'
                                    onClick={() => dispatch({type: 'REMOVE_TASK', payload: task.id})}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
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