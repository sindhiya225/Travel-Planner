import { jwtDecode } from "jwt-decode";

class AuthService {
  // Get the user data from the JWT token
  getUser() {
    try {
      const token = this.getToken();
      if (!token) return null;
      return jwtDecode(token);
    } catch (ex) {
      console.error("Error decoding token:", ex);
      return null;
    }
  }

  // Check if the user is logged in (token exists and is not expired)
  loggedIn() {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      if (!token) return true;
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      }
      return false;
    } catch (ex) {
      console.error("Error checking token expiration:", ex);
      localStorage.removeItem("id_token");
      return true;
    }
  }

  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Save the token to localStorage and redirect to the homepage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Remove the token from localStorage and redirect to the homepage
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();