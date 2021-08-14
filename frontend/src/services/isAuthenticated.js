const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    const token = localStorage.getItem("jwt"); 
    if (token) {
      return token;
    } else {
      return false;
    }
  };
  
  export default isAuthenticated;