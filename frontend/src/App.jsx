import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import HomePage from "./pages/home.page.jsx";
import UserAuthFormPage from "./pages/userAuthForm.page.jsx";
import { ThemeProvider } from "./themecontext.jsx";
import NavBar from "./components/navbar.component";

export const UserAuthContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    let userInSession = lookInSession('user');
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({
      access_token: null
    });
  }, []);

  const lookInSession = (key) => {
    return sessionStorage.getItem(key);
  };

  return (
    <ThemeProvider>
      <Router>
        <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>
          <Routes>
            <Route element={<NavBar />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route
              path="/sign-in"
              element={<UserAuthFormPage type="sign-in" />}
            />
            <Route
              path="/sign-up"
              element={<UserAuthFormPage type="sign-up" />}
            />
          </Routes>
        </UserAuthContext.Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
