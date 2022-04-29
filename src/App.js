import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import Watched from './components/Watched';
import SearchResults from './components/SearchResults';
import NotFound from './components/NotFound';
import Discover from './components/Discover';
import { RootContextProvider } from './context/RootContext';

// const APIKey = 6c95b5c8fd99ea472bb06ae3c2004c44

function App() {
  return (
    <RootContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Watchlist />} />
          <Route exact path="/discover" element={<Discover />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </RootContextProvider>
  );
}

export default App;
