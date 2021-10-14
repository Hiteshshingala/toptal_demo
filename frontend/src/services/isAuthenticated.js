import { getToken } from "./localStorage"
const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    const token = getToken(); 
    if (token) {
      return token;
    } else {
      return false;
    }
  };
  
  export default isAuthenticated;