import userService from "@/api/service/user.service";
import router from "@/router";
import Cookies from "js-cookie";
import TokenService from "@/api/token";

const userdata = Cookies.get('user')
const user = userdata ? JSON.parse(userdata) : null

const state = user ? {
    user: user.username,
    isAuth: true,
    errors: null,
} : {
    user: null,
    isAuth: false,
    errors: null,
}

// getters
const getters = {
    isAuthenticated: state => {
        return state.isAuth
    },
    errors: state => {
        return state.errors
    }
}

const actions = {
    login({ commit }, payload) {
        return userService.login(payload).then(res => {
            res.username = payload.username
            TokenService.setUser(res)
            commit('saveUserData', payload.username)
            router.push('/books')
            return Promise.resolve(res)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    signup({ commit }, payload) {
        return userService.register(payload).then(res => {
            commit('setErrors', null)
            return Promise.resolve(res)
        }).catch(error => {
            if(error.response.data){
                commit('setErrors', error.response.data)
            }
            return Promise.reject(error)
        })
    },
    logout({ commit }) {
        TokenService.removeUser()
        commit('deleteUserData')
        router.push('/')
    }
}

const mutations = {
    saveUserData(state, { data }) {
        state.user = data
        state.isAuth = true
    },
    setErrors(state, errors) {
        state.errors = errors;
    },
    deleteUserData(state) {
        state.user = null
        state.isAuth = false
    },
    setError(state, { data }) {
        state.error = data
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}