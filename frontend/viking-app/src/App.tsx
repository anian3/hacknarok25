import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Forum from './pages/Forum/Forum';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow w-full px-4 py-6">
        <Routes>
          <Route path="/" element={<Forum />} />
        </Routes>
      </main>
      <Footer />
    </div>)}

export default App;