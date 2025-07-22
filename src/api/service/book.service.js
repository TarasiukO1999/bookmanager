import api from '@/api/axios'
import { jsonHeader, filewithHeader } from "@/api/header";


export default {
  getBooks(payload) {
    return api.get('books/', {
      params: {
        ...payload
      },
      headers: jsonHeader(),
    })
    .then(response => response.data);
  },  
  getBook(slug) {
    return api.get(`books/${slug}/`, { headers: jsonHeader() })
      .then(response => response.data)
  },
  deleteBook(slug) {
    return api.delete(`books/${slug}/`, { headers: jsonHeader() })
      .then(response => response.data)
  },
  createBook(payload){
    return api.post(`books/`, payload , {headers: filewithHeader()})
      .then(response => response.data)
  },
  editBook(payload){
    return api.put(`books/${payload.slug}/`, payload.data , {headers: filewithHeader()})
    .then(response => response.data)
  }
}