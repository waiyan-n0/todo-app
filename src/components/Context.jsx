import {createContext, useEffect, useReducer, useRef} from "react";
import {todoReducer} from './todoReducer.js'
import {db, auth} from './../firebaseConfig.js'
import {query, where, getDocs, collection, deleteDoc, updateDoc,onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
    const deleteTask = async(task) => {
        if (!task || !task.id) return;
        try {
            const user = auth.currentUser;
            if (!user) return;

            const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
            const q = query(tasksCollectionRef, where("id", "==", task.id));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await deleteDoc(docRef);
                dispatch({ type: 'REMOVE_TASK', payload: task.id });
                dispatch({ type: 'SHOW_ALERT', payload: { message: 'TASK DELETED SUCCESSFULLY!', type: 'delete' } });
                setTimeout(() => { dispatch({ type: 'HIDE_ALERT' }); }, 3000);
            }
        } catch (error) {
            console.error('Error deleting :', error);
        }
    }
    const completedTask = async(task) => {
        if(!task || !task.id) {
            console.log("Invalid Task Object: ", task);
            return;
        }
        // console.log(task);
        try{
            const user = auth.currentUser;
            if(!user) return;
            const taskRef = collection(db,"users",user.uid,"tasks");
            const q = query(taskRef,where("id","==",task.id));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                    completed: !task.completed,
                    completedAt: !task.completed ? new Date().toISOString() : null,
                });
                dispatch({ type: 'COMPLETE_TASK', payload: task });
                const alertMsg = !task.completed ? 'TASK MARKED AS COMPLETED!' : 'TASK RESTORED SUCCESSFULLY!';
                dispatch({ type: 'SHOW_ALERT', payload: { message: alertMsg, type: 'complete' } });
                setTimeout(() => {
                    dispatch({ type: 'HIDE_ALERT' });
                }, 3000);
            } else {
                console.error("Task id not identify!!");
            }
            const alertMsg = !task.completed?'TASK MARKED AS COMPLETED!':'TASK RESTORE SUCCESSFULLY!';
            dispatch({type:'SHOW_ALERT', payload: {message: alertMsg, type:'complete'}});
        }catch(error){
            console.error("Error Updating task: ", error);
            dispatch({ type: 'SHOW_ALERT', payload: { message: 'Update Failed!', type: 'delete' } });
        }
    };
    useEffect(() => {
        let unsubscribe = null;
        const authListener = onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(collection(db, "users", user.uid, "tasks"));

                unsubscribe = onSnapshot(q, (snapshot) => {
                    // console.log("Snapshot data:", snapshot.docs.length);
                    const tasksData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    dispatch({ type: 'SET_TASKS', payload: tasksData });
                });
            } else {
                dispatch({ type: 'SET_TASKS', payload: [] });
                if (unsubscribe) unsubscribe();
            }
        });
        return () => {
            authListener();
            if (unsubscribe) unsubscribe();
        };
    }, []);
    return (
        <Context.Provider value={{state, dispatch, inputRef, datetimeRef, deleteTask,completedTask}}>
            {children}
        </Context.Provider>
    );
}