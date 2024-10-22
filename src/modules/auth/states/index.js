import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        dataLogin: {
            email: 'admin@zent.vn',
            password: 'Zent@123.edu.vn'
        },
        isLoadingBtnLogin: false,
        authUser: {},
        isAuthSuccess: false,
       
    },
    reducers: {
        setDataLogin: (state, action) => ({
            ...state,
            dataLogin: action.payload
        }),
        startRequestLogin: (state) => ({
            ...state,
            isLoadingBtnLogin: true
        }),
        startRequestLoginSuccess: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        startRequestLoginFail: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        setAuthSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: action.payload
        }),
        startRequestGetMe: (state) => ({
            ...state,
        }),
        startRequestGetMeSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: true,
            authUser: action.payload.data
        }),
        startRequestGetMeFail: (state) => ({
            ...state,
            isAuthSuccess: false,
            authUser: {}
        }),
    }

})

export const {
    setDataLogin, startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
    setAuthSuccess, startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
} = authSlice.actions

export default authSlice.reducer;
