import { jwtDecode } from "jwt-decode";
import { createContext,useEffect,useState } from "react";








export let UserTokenContext = createContext();


export default function UserTokenContextProvider(props){
    function convertToken(){
        let data =jwtDecode(window.localStorage.getItem("token"))
        setUserId(data.id)
        // console.log("data",data);
    }

    let[token,setToken] = useState()
    let[userId,setUserId] = useState()

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(window.localStorage.getItem("token"))
            convertToken()
            // 
            
        }
    },[])

    return <UserTokenContext.Provider value={{token,setToken,convertToken,userId,setUserId}}>
        {props.children}
    </UserTokenContext.Provider>
}