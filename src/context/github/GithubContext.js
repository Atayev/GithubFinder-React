import { createContext,useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext()

const Github_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState ={
        users:[],
        user: {},
        loading: false
    }

    const [state,dispatch] = useReducer(githubReducer,initialState)
    
    const searchUsers = async (text)=> {
        setLoading()

        const params = new URLSearchParams({
            q:text
        })
        const response =await fetch(`${Github_URL}/search/users?${params}`)
        const {items} =await response.json()
       
        dispatch({
            type:'GET_USERS',
            payload:items,
        })
    }

    const getUser = async (login)=> {
        setLoading()

        const response =await fetch(`${Github_URL}/users/${login}`)
       
        if(response.status===404) {
            window.location = '/notfound'
        } else {
            const data =await response.json()
       
        dispatch({
            type:'GET_USER',
            payload: data,
        })
        }
        
    }

    const clearUsers = () => {
        dispatch({
            type:'CLEAR_USERS',
        })
    }

    const setLoading = () => dispatch({type:'SET_LOADING'})
    return <GithubContext.Provider value={{
        users:state.users,
        loading:state.loading,
        user:state.user,
        searchUsers,
        clearUsers,
        getUser,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext