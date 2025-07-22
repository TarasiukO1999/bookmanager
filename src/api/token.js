import Cookies from 'js-cookie'

class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(Cookies.get("user")??"{}");
      return user?.refresh;
    }
  
    getLocalAccessToken() {
    const user = JSON.parse(Cookies.get("user")??"{}");
      return user?.access;
    }
  
    updateLocalAccessToken(token) {
      const user = JSON.parse(Cookies.get("user")??"{}");
      user.access = token;
      Cookies.set("user", JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(Cookies.get("user")??"{}");
    }
  
    setUser(user) {
      Cookies.set("user", JSON.stringify(user));
    }
  
    removeUser() {
      Cookies.remove("user");
    }
  }
  
  export default new TokenService();