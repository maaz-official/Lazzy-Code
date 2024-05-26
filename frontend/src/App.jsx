import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import HomePage from "./pages/home.page.jsx";
import UserAuthFormPage from "./pages/userAuthForm.page.jsx";
import { ThemeProvider } from "./themecontext.jsx";
import NavBar from "./components/navbar.component";
import { lookInSession, storeSession, logOutUser } from "./common/session.jsx";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({ access_token: null });

  useEffect(() => {
    const userInSession = lookInSession('user');
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
          <NavBar />
          <Routes>
            <Route path="/" element={userAuth.access_token ? <HomePage /> : <Navigate to="/sign-in" />} />
            <Route path="/sign-in" element={<UserAuthFormPage type="sign-in" />} />
            <Route path="/sign-up" element={<UserAuthFormPage type="sign-up" />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
