// session.jsx

// Function to look for a specific key in the session storage
export const lookInSession = (key) => {
    return sessionStorage.getItem(key);
  };
  
  // Function to store data in the session storage
  export const storeSession = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
  // Function to log out the user by clearing session storage
  export const logOutUser = () => {
    sessionStorage.removeItem('user');
  };
  