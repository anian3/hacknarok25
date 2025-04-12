import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Forum from "./pages/Forum/Forum";
import ChooseAMuse from "./pages/ChooseAMuse/ChooseAMuse";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-orange-100">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/muse" element={<ChooseAMuse />} />
          <Route path="/forum/:categoryId" element={<Forum />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
