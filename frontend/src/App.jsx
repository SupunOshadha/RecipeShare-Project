import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-240px)] mt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;