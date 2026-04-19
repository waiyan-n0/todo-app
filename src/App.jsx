import './App.css'
import Lists from "./Lists.jsx";
import AddTask from "./AddTask.jsx";
import {useContext} from "react";
import {Context} from "./Context";
import InputModal from "./InputModal.jsx";
import Alert from "./Alert.jsx";

function App() {
  const {state} = useContext(Context);

  return (
      <>
          <Alert />
          <h1 className='flex px-8'>Tasks</h1>
          <main className="pb-24">
              <Lists/>
          </main>
          {state.showModal && <InputModal key={state.editTaskID || 'new-task'}/>}
          <div className='fixed bottom-8 right-8 z-40'>
              <AddTask/>
          </div>
      </>
  )
}

export default App
