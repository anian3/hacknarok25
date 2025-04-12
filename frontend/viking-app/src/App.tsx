import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Forum from './pages/Forum/Forum';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum" element={<Forum />} />
    </Routes>
  );
}

export default App;
