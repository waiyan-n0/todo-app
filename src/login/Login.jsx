import { auth } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate, Link} from "react-router-dom";
import {useContext,useState} from "react";
import {Context} from "./../components/Context.jsx";

const Login = () => {
    const {dispatch} = useContext(Context);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        dispatch({type: 'SHOW_ALERT', payload: {message:'ACCOUNT LOGGED IN SUCCESSFULLY!', type:'success'}});
        try{
            const userData = await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        }catch(error){
            console.error("Error from login: ",error.code);
            if(error.code === "auth/invalid-credential"){
                setError("Wrong Email or Password");
            }else{
                setError("Login Error!");
            }
        }
    }
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <form onSubmit={handleSubmit} className='border-2 p-2'>
                <label>Login Form</label>
                {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                <div className='flex flex-col space-y-6 my-2'>
                    <input type="text" placeholder='Email' required className='border-b-2 outline-0'
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <input type="password" placeholder="Password" required autoComplete='false' className='border-b-2 outline-0'
                    onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </div>
                <div className='flex flex-col space-y-6'>
                    <button type='submit' className='border-2 rounded-lg px-2 py-1 cursor-pointer'>Login</button>
                    <Link to="/signup" className='hover:underline'>SignUp Here!</Link>
                </div>
            </form>
        </div>
    );
}
export default Login;