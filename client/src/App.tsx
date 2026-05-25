import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-500">
        <main className="min-h-screen bg-gray-500">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
