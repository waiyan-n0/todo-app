import {useContext, useRef, useState} from "react";
import { Context } from "./Context.jsx";

function Search() {
    const { dispatch } = useContext(Context);
    const [currentVal, setCurrentVal] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const timerRef = useRef(null);

    //handling search data with debouncing by using useRef
    const handleSearch = (e) => {
        setCurrentVal(e.target.value);
        setIsSearching(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            dispatch({ type: 'SET_SEARCH_TASK', payload: e.target.value });
            setIsSearching(false);
        }, 1000);
    };

    return (
        <div className="px-8 mt-4">
            <input
                type="text"
                placeholder="Search tasks..."
                className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 outline-none focus:border-sky-500 transition-all shadow-inner"
                value={currentVal}
                onChange={handleSearch}
            />
            {isSearching && (
                <div className="flex justify-center items-center gap-2 p-2">
                    <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className='text-xs'>Searching...</span>
                </div>
            )}
        </div>
    );
}

export default Search;