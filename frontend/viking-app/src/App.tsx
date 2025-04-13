import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Forum from "./pages/MainPage/MainPage";
import ChooseAMuse from "./pages/ChooseAMuse/ChooseAMuse";
import Profile from "./pages/Profile/Profile";
import "./styles.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-beige-200">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/muse" element={<ChooseAMuse />} />
          <Route path="/:categoryId" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profile/:profileType/:categoryId"
            element={<Profile />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
