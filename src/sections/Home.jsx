import Sidebar from "./../components/Sidebar.jsx"
import Search from "./../components/Search.jsx";
import Lists from "./../components/Lists.jsx";
import AddTask from "./../components/AddTask.jsx";
import InputModal from "./../components/InputModal.jsx";
import { Context } from "./../components/Context";
import { useContext } from "react";

const Home = () => {
    const { state } = useContext(Context);

    return (
        <main className="flex flex-row w-full">
            <aside className='bg-gray-900/50 border-r border-[var(--border)] h-screen sticky top-0'>
                <Sidebar/>
            </aside>
            <div className='w-full'>
                <h1 className='flex px-8 text-3xl font-bold my-4'>Tasks</h1>
                <Search/>
                <Lists/>
            </div>

            {state.showModal && <InputModal key={state.editTaskID || 'new-task'}/>}
            <div className='fixed bottom-8 right-8 z-40'>
                <AddTask/>
            </div>
        </main>
    );
};

export default Home;