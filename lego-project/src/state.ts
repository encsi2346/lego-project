import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    mode: 'light',
    token: null,
    language: 'hu',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuth = true;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
        },
        setLanguage: (state, action) => {
            state.language = action.payload.language;
        },
    }
})

export const { setLogin, setLogout,  setMode, setLanguage} = authSlice.actions;
export default authSlice.reducer;