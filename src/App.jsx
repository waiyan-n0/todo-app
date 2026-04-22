import './App.css'
import Lists from "./Lists.jsx";
import AddTask from "./AddTask.jsx";
import {useContext} from "react";
import {Context} from "./Context";
import InputModal from "./InputModal.jsx";
import Alert from "./Alert.jsx";
import Search from "./Search.jsx";
import Sidebar from "./Sidebar.jsx";

function App() {
  const {state} = useContext(Context);

  return (
      <>
          <div className='fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none'>
              <Alert />
          </div>
          <main className="flex flex-row w-full">
              <aside className='bg-gray-900/50 border-r border-[var(--border)] h-screen sticky top-0'>
                  <Sidebar/>
              </aside>
              <div className='w-full'>
                  <h1 className='flex px-8 text-3xl font-bold my-4'>Tasks</h1>
                  <Search/>
                  <Lists/>
              </div>
          </main>
          {state.showModal && <InputModal key={state.editTaskID || 'new-task'}/>}
          <div className='fixed bottom-8 right-8 z-40'>
              <AddTask/>
          </div>
      </>
  )
}

export default App
