import {createContext, useEffect, useReducer, useRef} from "react";
import {todoReducer} from './todoReducer.js'

export const Context  = createContext();
const initialState = {
    tasks: [],
    currentView: 'All',
    isCategoryView: false,
    showModal: false,
    searchInput: '',
    isEditing: false,
    editTaskID: null,
    alert: {
        show: false,
        message: '',
        type: '',
    }
}

export const Provider = ({ children }) => {
    const inputRef = useRef(null);
    const datetimeRef = useRef(null);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        const autoDeleting = setInterval(() => {
            const now = new Date().getTime();
            const expirationTime = 24 * 60 * 60 * 1000;
            state.tasks.forEach(task => {
                if(task.completed && task.completedAt) {
                    const deleteTimer = now - new Date(task.completedAt).getTime();
                    if(deleteTimer > expirationTime){
                        dispatch({type:'REMOVE_TASK', payload: task.id});
                    }
                }
            });
        },60000);
        return ()=> clearInterval(autoDeleting);
    },[state.tasks]);

    return (
        <Context.Provider value={{state, dispatch, inputRef, datetimeRef}}>
            {children}
        </Context.Provider>
    );
}