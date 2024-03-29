import "./App.css"
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./Pages/Home"
import About from "./Pages/About"
import NotFound from "./Pages/NotFound"
import Alert from "./components/layout/Alert";
import { GithubProvider } from "./context/github/GithubContext";
import { AlertProvider } from "./context/Alert/AlertContext";


import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import User from "./Pages/User";
function App() {
  return (
    <GithubProvider>
    <AlertProvider>
    <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />

          <main className=" container mx-auto px-3 pb-12">
            <Alert />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
    </Router>
    </AlertProvider>
    </GithubProvider>
  );
}

export default App;
