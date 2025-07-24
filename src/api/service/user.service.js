import api from '@/api/axios'
import { jsonHeader } from "@/api/header";

export default {
  login(payload) {
    return api.post(`auth/login/`, payload, { headers: jsonHeader() })
              .then(response => response.data)
  },
  register(payload) {
    return api.post(`auth/register/`, payload, { headers: jsonHeader() })
              .then(response => response.data)
  },
}