import {useContext} from "react";
import {Context} from "./Context.jsx";

function Alert() {
    const {state} = useContext(Context);
    if (!state.alert || !state.alert.show) return null;
    const bgColors = {
        success: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
        edit: 'bg-sky-500/20 border-sky-500/50 text-sky-400',
        delete: 'bg-rose-500/20 border-rose-500/50 text-rose-400',
    };
    return (

        <div
            className={`w-full flex items-center justify-center top-5 z-50 mt-2 px-6 p-2 border-2 rounded-xl text-white shadow-2xl animate-bounce-in gap-3 ${bgColors[state.alert.type]}`}>
            <span>
                {state.alert.type === 'success'}
                {state.alert.type === 'edit'}
                {state.alert.type === 'delete'}
            </span>
            <span className='flex items-center p-2 gap-2 justify-center'>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
                {state.alert.message}</span>
        </div>
    )
}

export default Alert;