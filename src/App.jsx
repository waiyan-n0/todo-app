import './App.css'
import {useContext} from "react";
import {Routes, Route} from 'react-router-dom'
import {Context} from "./components/Context.jsx";
import Alert from "./components/Alert.jsx";
import Login from "./login/Login.jsx";
import Signup from "./login/Signup.jsx";
import Home from "./sections/Home.jsx"
import Error from "./sections/Error.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const {state} = useContext(Context);
  return (
      <>
          <div className='fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none'>
              <Alert />
          </div>

          <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
              } />
              <Route path="*" element={<Error />} />
          </Routes>
      </>
  )
}

export default App
