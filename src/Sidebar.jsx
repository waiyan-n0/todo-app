import {useContext, useState} from "react";
import {Context} from "./Context.jsx";

function Sidebar(){
    const {state,   dispatch} = useContext(Context);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => setIsExpanded(!isExpanded);

    return (
        <div
            className={`flex flex-col backdrop-blur-md text-gray-300 p-6 space-y-8 border-r border-gray-800 text-left`}>
            <div className='flex flex-row items-center'>
                <h1 className={`sm:block text-2xl font-bold text-white ${isExpanded ? 'block' : 'hidden'}`}>
                    Menu
                </h1>
                <button onClick={toggleSidebar}
                        className='sm:hidden text-white hover:text-sky-400 cursor-pointer'>
                    <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                              d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
                    </svg>
                </button>
            </div>
            <div className='flex flex-col'>
                <p>Tasks</p>
                <div className='flex flex-col gap-1 '>
                    <span
                        className={`group flex gap-2 font-semibold px-2 py-1 opacity-70 text-sm cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 ${state.currentView === 'All' ? 'bg-sky-500/20 text-sky-400 opacity-100' : 'opacity-70'}`}
                        onClick={() => dispatch({type: 'SET_VIEW', payload: 'All'})}>
                        <svg
                            className="w-6 h-6 shrink-0 text-gray-800 dark:text-white transition-transform duration-200 group-hover:scale-110"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/>
                        </svg>
                        <span className={`${isExpanded ? 'block' : 'hidden'} sm:block font-medium text-sm whitespace-nowrap`}>All</span>
                    </span>
                    <span
                        className={`group flex gap-2 font-semibold px-2 py-1 opacity-70 text-sm cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 ${state.currentView === 'Today' ? 'bg-sky-500/20 text-sky-400 opacity-100' : 'opacity-70'}`}
                        onClick={() => dispatch({type: 'SET_VIEW', payload: 'Today'})}>
                        <svg className="w-6 h-6 shrink-0 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
                        </svg>
                        <span className={`${isExpanded ? 'block' : 'hidden'} sm:block font-medium text-sm whitespace-nowrap`}>Today</span>
                    </span>
                    <span
                        className={`group flex gap-2 font-semibold px-2 py-1 opacity-70 text-sm cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 ${state.currentView === 'Upcoming' ? 'bg-sky-500/20 text-sky-400 opacity-100' : 'opacity-70'}`}
                        onClick={() => dispatch({type: 'SET_VIEW', payload: 'Upcoming'})}>
                        <svg
                            className="w-6 h-6 shrink-0 text-gray-800 dark:text-white transition-transform duration-200 group-hover:scale-110"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
                        </svg>
                        <span className={`${isExpanded ? 'block' : 'hidden'} sm:block font-medium text-sm whitespace-nowrap`}>Upcoming</span>
                    </span>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <p>Lists</p>
                <div className='flex flex-col gap-1'>
                    <span onClick={()=> dispatch({type:'SET_CATEGORY_VIEW', payload: 'Personal'})}
                        className={`group flex gap-2 font-semibold px-2 py-1 opacity-70 text-sm cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 shadow-[inset_0_0_10px_rgba(14,165,233,0.1) ${state.currentView === 'Personal' ? 'bg-sky-500/20 text-sky-400 opacity-100' : 'opacity-70'}`}>
                        <svg
                            className="w-6 h-6 shrink-0 text-gray-800 dark:text-white transition-transform duration-200 group-hover:scale-110"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                          <path fillRule="evenodd"
                                d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z"
                                clipRule="evenodd"/>
                        </svg>
                        <span className={`${isExpanded ? 'block' : 'hidden'} sm:block font-medium text-sm whitespace-nowrap`}>Personal</span>
                    </span>
                    <span onClick={()=> dispatch({type:'SET_CATEGORY_VIEW', payload: 'Work'})}
                        className={`group flex gap-2 font-semibold px-2 py-1 opacity-70 text-sm cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 shadow-[inset_0_0_10px_rgba(14,165,233,0.1) ${state.currentView === 'Work' ? 'bg-sky-500/20 text-sky-400 opacity-100' : 'opacity-70'}`}>
                        <svg
                            className="w-6 h-6 shrink-0 text-gray-800 dark:text-white transition-transform duration-200 group-hover:scale-110"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                          <path fillRule="evenodd"
                                d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                                clipRule="evenodd"/>
                        </svg>
                        <span className={`${isExpanded ? 'block' : 'hidden'} sm:block font-medium text-sm whitespace-nowrap`}>Work</span>
                    </span>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <p>History</p>
                <div className='flex flex-col gap-1'>
                    <span onClick={()=> dispatch({type:'SET_VIEW', payload: 'Completed'})}
                        className={`group flex gap-2 font-semibold px-2 py-1 opacity-70 text-sm cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 shadow-[inset_0_0_10px_rgba(14,165,233,0.1) ${state.currentView === 'Completed' ? 'bg-sky-500/20 text-sky-400 opacity-100' : 'opacity-70'}`}>
                        <svg className="w-6 h-6 shrink-0 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24">
                          <path fillRule="evenodd"
                                d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                                clipRule="evenodd"/>
                        </svg>
                        <span className={`${isExpanded ? 'block' : 'hidden'} sm:block font-medium text-sm whitespace-nowrap`}>Completed</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;