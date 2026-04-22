export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VIEW':
            return {...state, currentView: action.payload, isCategoryView: false};
        case 'SET_CATEGORY_VIEW':
            return {...state, currentView: action.payload, isCategoryView: true};
        case 'SET_SEARCH_TASK':
            return {...state, searchInput: action.payload};
        case 'ADD_TASK':
            return {...state,tasks:[action.payload, ...state.tasks]};
        case 'REMOVE_TASK':
            return {...state, tasks:state.tasks.filter(task => task.id !== action.payload)};
        case 'START_EDIT_TASK':
            return {
                ...state,
                showModal: true,
                isEditing: true,
                editTaskID:action.payload.id
            };
        case 'EDITED_TASK':
            return {
                ...state,
                tasks:state.tasks.map(item=>
                    item.id === state.editTaskID?{...item, tasks:action.payload.tasks, reminder:action.payload.reminder}:{...item}),
                showModal:false,
                isEditing: false,
                editTaskID:null
            };
        case 'COMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(item=>
                item.id === action.payload.id ? {...item, completed:!item.completed}: item)
            }
        case 'MODAL_TOGGLE':
            return {
                ...state,
                showModal: !state.showModal,
                isEditing: false,
                editTaskID:null,
            };
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: {
                    show: true, message: action.payload.message, type: action.payload.type,
                }
            }
        case 'HIDE_ALERT':
            return {
                ...state,
                alert: {...state.alert, show: false}
            }
        default:
            return state;
    }
}