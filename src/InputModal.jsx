import {useContext, useEffect, useState} from "react";
import {Context} from "./Context.jsx";

function InputModal() {
    const {state, dispatch, inputRef, datetimeRef} = useContext(Context);
    const taskToEdit = state.tasks.find(t => t.id === state.editTaskID);
    const [inputTask, setInputTask] = useState(state.isEditing ? taskToEdit?.tasks || "" : "");
    const [reminder, setReminder] = useState(state.isEditing ? taskToEdit?.reminder || "" : "");
    //auto focus with useRef on component mount
    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    },[inputRef])

    const handleSave = () => {
        if(!inputTask.trim()) return;
        const payloadData = {
            id: state.isEditing ? state.editTaskID : Date.now(),
            tasks: inputTask,
            reminder: reminder,
            completed: state.isEditing?taskToEdit.completed : false,
        };
        if(state.isEditing){
            dispatch({type: 'EDITED_TASK', payload: payloadData});
        }else{
            dispatch({type: 'ADD_TASK', payload: payloadData});
        }
        dispatch({type: 'MODAL_TOGGLE'});
        setInputTask('');
    };

    const handleReminder = () =>{
        if(datetimeRef && datetimeRef.current) datetimeRef.current.showPicker();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-end justify-center z-50" onClick={() => dispatch({ type: "MODAL_TOGGLE" })}>
            <div className='bg-gray-600 w-full rounded-3xl p-6 shadow-2xl animate-slide-up flex flex-col'
                 style={{height: '30vh'}} onClick={(e) => e.stopPropagation()}>
                <div className='flex-1 pb-3 flex'>
                    <input className='border-none outline-0 placeholder:text-2xl p-2 mt-2'
                           type="text" placeholder='Enter task...' value={inputTask} ref={inputRef}
                           onChange={(e) => setInputTask(e.target.value)}
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button onClick={handleReminder}
                            className='w-36 flex items-center justify-evenly rounded-md py-2 text-gray-400 hover:text-white transition-colors cursor-pointer group'>
                        <svg className="w-6 h-6 text-gray-400 hover:text-white transition-colors" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
                        </svg>
                        <span className="text-sm font-medium">Set Reminder</span>
                    </button>
                    <div className='w-1/4 flex items-center justify-center space-x-2'>
                        <button
                            className='bg-red-500 hover:bg-red-700 p-2 rounded-xl text-white font-bold cursor-pointer'
                            onClick={() => dispatch({type: 'MODAL_TOGGLE'})}>Cancel
                        </button>
                        <button
                            className='bg-green-500 hover:bg-green-700 p-2 rounded-xl text-white font-bold cursor-pointer'
                            onClick={handleSave}>{state.isEditing ? 'Update' : 'Save'}</button>
                    </div>
                </div>
                <input className='absolute invisible w-0 h-0'
                       type="datetime-local" ref={datetimeRef} value={reminder}
                       onChange={(e) => setReminder(e.target.value)}/>
                {reminder && <p className='flex text-sm text-cyan-200'>{new Date(reminder).toLocaleString()}</p>}
                <div
                    className='text-center pt-6 text-[10px] uppercase tracking-widest text-gray-400 opacity-70'>designed
                    & developed by Wai Yan Naing
                </div>
            </div>
        </div>
    );
}

export default InputModal;