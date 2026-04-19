import {createContext, useReducer, useRef} from "react";
import {todoReducer} from './todoReducer.js'

export const Context  = createContext();
const initialState = {
    tasks: [],
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
    return (
        <Context.Provider value={{state, dispatch, inputRef, datetimeRef}}>
            {children}
        </Context.Provider>
    );
}