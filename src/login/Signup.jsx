import {useContext, useState} from "react";
import { auth } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "./../components/Context.jsx";

const Signup = () => {
    const {dispatch} = useContext(Context)
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        console.log("Email:", email);
        console.log("Password:", password);
        try {
            const userData = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userData.user, {displayName: userName});
            console.log("User Created:", userData.user);
            navigate("/home");
            dispatch({type: 'SHOW_ALERT', payload: {message:'ACCOUNT CREATED SUCCESSFULLY!', type:'success'}});
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already in used!");
            } else if (err.code === "auth/weak-password") {
                setError("Password must be at least 6 characters!");
            } else {
                console.log(`Error Message:${err.message}|Error Code:${err.code}`);
                setError("Error Account Creating");
            }
        }
    };

    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <form onSubmit={handleSignUp} className='border-2 p-6 rounded-xl shadow-md bg-white w-80'>
                <h2 className="text-xl font-bold mb-4 text-center">Create An Account</h2>

                {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

                <div className='flex flex-col space-y-4 my-2'>
                    <input type='text' placeholder='Username' required value={userName}
                        className='border-b-2 p-2 outline-none'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input type="email" placeholder='Email' required value={email}
                        className='border-b-2 p-2 outline-none'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder='Password' required autoComplete='false' value={password}
                        className='border-b-2 p-2 outline-none'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='w-full mt-6 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-colors cursor-pointer'>
                    Create An Account
                </button>
                <Link to="/login" className='hover:underline'>Already have an account?<br/> Login Here!</Link>
            </form>
        </div>
    );
};

export default Signup;