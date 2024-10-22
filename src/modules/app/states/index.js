import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        breadcrumb: [],
        location: {
            pathName: '',
            prevPathName: '',
            params: {},
            query: {}
        },
        title: " ",
        goToPage: {
            path: "",
            redirected: true
        },
        errorInformation: {
            name: '',
            email: '',
            phone: ''
        },
        isLoadingBtnInformation: false,
        dataChangePassword: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        errorChangePassword: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        isLoadingBtnChangePassword: false,
        isLoadingLogout: false,
    },
    reducers: {
        setBreadcrumb: (state, action) => ({
            ...state,
            breadcrumb: action.payload
        }),
        setLocation: (state, action) => ({
            ...state,
            location: {
                pathName: action.payload.pathName,
                prevPathName: action.payload.prevPathName || null,
                params: { ...(action.payload.params || {}) },
                query: { ...(action.payload.query || {}) }
            }
        }),
        setTitlePage: (state, action) => ({
            ...state,
            title: action.payload
        }),
        goToPage: (state, action) => ({
            ...state,
            goToPage: {
                path: action.payload.path,
                redirected: false
            }
        }),
        goToPageSuccess: (state) => ({
            ...state,
            goToPage: {
                ...state.goToPage,
                redirected: true
            }
        }),
        
        setErrorInformation: (state, action) => ({
            ...state,
            errorInformation: action.payload
        }),
        setErrorChangePassword: (state, action) => ({
            ...state,
            errorChangePassword: action.payload
        }),
        setDataChangePassword: (state, action) => ({
            ...state,
            dataChangePassword: action.payload
        }),
        startRequestUpdateInformation: state => ({
            ...state,
            isLoadingBtnInformation: true
        }),
        startRequestUpdateInformationSuccess: state => ({
            ...state,
            isLoadingBtnInformation: false
        }),
        startRequestUpdateInformationFail: state => ({
            ...state,
            isLoadingBtnInformation: false
        }),
        startRequestChangePassword: state => ({
            ...state,
            isLoadingBtnChangePassword: true
        }),
        requestChangePasswordSuccess: state => ({
            ...state,
            isLoadingBtnChangePassword: false
        }),
        requestChangePasswordFail: state => ({
            ...state,
            isLoadingBtnChangePassword: false
        }),
        startRequestLogout: (state) => ({
            ...state,
            isLoadingLogout: true
        }),
        startRequestLogoutSuccess: (state) => ({
            ...state,
            isLoadingLogout: false
        }),
        startRequestLogoutFail: (state) => ({
            ...state,
            isLoadingLogout: false
        }),
        
    }

})

export const {
    goToPage, goToPageSuccess,
    setBreadcrumb, setLocation, setTitlePage,
    setErrorChangePassword, setDataChangePassword, setErrorInformation,
    startRequestUpdateInformation, startRequestUpdateInformationSuccess, startRequestUpdateInformationFail,
    startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail,
    startRequestLogout, startRequestLogoutSuccess, startRequestLogoutFail,
} = appSlice.actions

export default appSlice.reducer;
