import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    isOpen: null,
    setUser: () => { },
    setToken: () => { },
    setIsOpen: () => { },
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [isOpen, setIsOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            isOpen,
            setUser,
            setToken,
            setIsOpen,
            isSignUpOpen,
            setIsSignUpOpen,
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);