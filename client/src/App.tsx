import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp.tsx";
import Header from "./components/ui/Header.tsx";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <div className="min-h-screen flex flex-col bg-bg">
            <Header />

            <main className="grow p-4 px-20 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
              </Routes>
            </main>
          </div>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
