import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SpiderClickEffect from './components/SpiderClickEffect';
import { TransitionProvider } from './context/TransitionContext';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <SpiderClickEffect />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
        <Footer />
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
