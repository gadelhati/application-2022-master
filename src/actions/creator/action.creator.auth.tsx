import { Dispatch } from "redux";
import { signinStart, signinSuccess, signinError, logoutStart, refreshTokenStart, changePasswordStart, changePasswordSuccess, changePasswordError } from "../type/action.type.auth";
import { constants } from "../../assets/types/constants";
import { signin, logout, refreshToken } from "../../services/service.auth"
import { User } from "../../components/user/user.interface"
import { changePassword } from "../../services/service.auth"
import { Auth } from "../../components/auth/auth.interface"
import { ErrorMessage } from "../type/errorMessage";

export const signinAction = (object: Auth) => {
    return async (dispatch: Dispatch<signinStart | signinSuccess | signinError>) => {
        dispatch({
            type: constants.SIGNIN_START
        });
        try {
            const { data } = await signin(object)
            dispatch({
                type: constants.SIGNIN_SUCCESS,
                payload: data
            });
        } catch(error: any) {
            var errorMessage: ErrorMessage[] = []
            var label: string[] = []
            var value: string[] = []
            if (error.response.data.errors != undefined) {
                error.response?.data.errors.forEach((element: any, index: number) => {
                    let counter: boolean = true
                    label.forEach((name: string, index2: number) => {
                        if (name == element.field) {
                            counter = false
                        }
                    })
                    if (counter) {
                        label.push(element.field)
                    }
                })
                error.response?.data.errors.forEach((element: any, index: number) => {
                    label.forEach((name: string, index3: number) => {
                        if (element.field == name) {
                            value.push(element.defaultMessage)
                            if(errorMessage[index3] == undefined) {
                                errorMessage.push({ field: element.field, defaultMessage: [element.defaultMessage] })
                            } else {
                                errorMessage[index3].defaultMessage.push(element.defaultMessage)
                            }
                        }
                    })
                })
            } else {
                error = error.response.data.error
            }
            dispatch({
                type: constants.SIGNIN_ERROR,
                payload: errorMessage
            });
        }
    }
}

export const logoutAction = () => {
    return async (dispatch: Dispatch<logoutStart>) => {
        logout()
        dispatch({
            type: constants.LOGOUT
        });
    }
}

export const refreshTokenAction = (accessToken: any) => {
    return async (dispatch: Dispatch<refreshTokenStart>) => {
        dispatch({
            type: constants.REFRESH_TOKEN,
            payload: accessToken
        });
    }
}

export const changePasswordAction = (id: string, object: User) => {
    return async (dispatch: Dispatch<changePasswordStart | changePasswordSuccess | changePasswordError>) => {
        dispatch({
            type: constants.CHANGE_PASSWORD_START
        });
        try {
            const { data } = await changePassword(id, object);
            dispatch({
                type: constants.CHANGE_PASSWORD_SUCCESS,
                payload: data
            });
        } catch(error: any) {
            var errorMessage: ErrorMessage[] = []
            var label: string[] = []
            var value: string[] = []
            if (error.response.data.errors != undefined) {
                error.response?.data.errors.forEach((element: any, index: number) => {
                    let counter: boolean = true
                    label.forEach((name: string, index2: number) => {
                        if (name == element.field) {
                            counter = false
                        }
                    })
                    if (counter) {
                        label.push(element.field)
                    }
                })
                error.response?.data.errors.forEach((element: any, index: number) => {
                    label.forEach((name: string, index3: number) => {
                        if (element.field == name) {
                            value.push(element.defaultMessage)
                            if(errorMessage[index3] == undefined) {
                                errorMessage.push({ field: element.field, defaultMessage: [element.defaultMessage] })
                            } else {
                                errorMessage[index3].defaultMessage.push(element.defaultMessage)
                            }
                        }
                    })
                })
            } else {
                error = error.response.data.error
            }
            dispatch({
                type: constants.CHANGE_PASSWORD_ERROR,
                payload: errorMessage
            });
        }
    }
}