import {useEffect, useState} from "react";
import { onAuthStateChanged} from "firebase/auth";
import {auth} from "./../firebaseConfig.js";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
           setLoading(false);
       });
       return ()=> unsubscribe();
    },[])
    if (loading) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
    if(!user){
        return <Navigate to="/" replace />;
    }
    return children;
};
export default ProtectedRoute;