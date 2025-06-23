import { useEffect, useState } from 'react'
const useLocalStorage = (key,initialState) => {
    const [data,setLocalStorageData] = useState(initialState);

    useEffect(()=>{
        const existingData = JSON.parse(localStorage.getItem(key));
        if(existingData){
            updateLocalStorage(existingData)
        }else{
            localStorage.setItem(key,JSON.stringify(initialState))
        }
    },[])   

    function updateLocalStorage(newData){
        if(typeof newData === 'function'){
            localStorage.setItem(key,JSON.stringify(newData(data)))
        }else{
            localStorage.setItem(key,JSON.stringify(newData))
        }
        
        setLocalStorageData(newData)
    }

    return [data,updateLocalStorage];
}

export default useLocalStorage
