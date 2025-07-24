import { createStore, createLogger } from 'vuex';
import user from './modules/user'
import books from './modules/books';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {user, books},
    strict: debug,
    plugins: debug ? [createLogger()] : []
})