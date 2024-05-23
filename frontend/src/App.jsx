import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar.component';
import HomePage from './pages/home.page.jsx';
import UserAuthFormPage from './pages/userAuthForm.page.jsx';
import { ThemeProvider } from './themecontext.jsx';

const App = () => {


  return (
    <ThemeProvider>
      <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<UserAuthFormPage type="sign-in" />} />
            <Route path="/sign-up" element={<UserAuthFormPage type="signup" />} />
          </Routes>
      </Router>
      </ThemeProvider>
  );
};

export default App;
