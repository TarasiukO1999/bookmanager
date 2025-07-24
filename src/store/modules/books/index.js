import bookService from "@/api/service/book.service"
import router from "@/router";

// initial state
// shape: [{ id, quantity }]
const state = {
  data: {
    items: [],
    total: 0
  },
  item: null
}

// getters
const getters = {
  books: state => {
    return state.items
  },
  book: state => {
    return state.item
  }
}

// actions
const actions = {
  getBooks({commit}, payload){
    return bookService.getBooks(payload).then(res=>{
      commit('setBooks', res)
      Promise.resolve(res)
    }).catch(error=>{
      Promise.reject(error)
    })
  },
  createBook({commit}, payload){
    return bookService.createBook(payload).then(res=>{
      router.push(`/books/${res.slug}`)
      commit('setBook', res)
      Promise.resolve(res)
    }).catch(error=>{
      Promise.reject(error)
    })
  },
  editBook({commit}, payload){
    return bookService.editBook(payload).then(res=>{
      router.push(`/books/${res.slug}`)
      commit('setBook', res)
      Promise.resolve(res)
    }).catch(error=>{
      Promise.reject(error)
    })
  },
  deleteBook({commit}, slug) {
    return bookService.deleteBook(slug).then(() => {
      commit('deleteBook', slug)
    })
  },
  getBook({commit}, slug) {
    return bookService.getBook(slug).then((res) => {
      commit('setBook', res)
    })
  }
}

// mutations
const mutations = {
  setBooks(state, data){
    state.data.items = data.results
    state.data.total = data.count
  },
  deleteBook(state, slug){
    state.data.items = state.items || state.data.items.filter(obj => obj.slug !== slug)
  },
  setBook(state, book){
    state.item = book
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}