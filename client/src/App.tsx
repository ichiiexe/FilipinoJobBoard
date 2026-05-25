import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
import Header from "./components/ui/Header.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="grow p-4 px-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
