import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import Favourites from './components/Favourites';
import './App.css';

function AppContent() {
  const location = useLocation();

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('estateFavourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('estateFavourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((property) => {
    setFavourites(prev => {
      if (!prev.some(fav => fav.id === property.id)) {
        return [...prev, property];
      }
      return prev;
    });
  }, []);

  const removeFromFavourites = useCallback((propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  }, []);

  const clearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  return (
    <div className="app">
      {/* Modern Sticky Header */}
      <header className="app-header sticky-header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <div className="logo-wrapper">
              <span className="logo-icon">🏡</span>
              <div className="logo-text">
                <h1>Estate<span>Pro</span></h1>
                <span className="tagline">Your Dream Home Awaits</span>
              </div>
            </div>
          </Link>

          <nav className="main-nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-icon">🔍</span>
              Search Properties
            </Link>

            <Link 
              to="/favourites" 
              className={`nav-link favourites-link ${location.pathname === '/favourites' ? 'active' : ''}`}
            >
              <span className="nav-icon">❤️</span>
              Favourites
              {favourites.length > 0 && (
                <span className="favourites-badge">{favourites.length}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <div className="container main-container">
          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  favourites={favourites}
                  onAddToFavourites={addToFavourites}
                />
              }
            />
            <Route
              path="/property/:id"
              element={
                <PropertyPage
                  favourites={favourites}
                  onAddToFavourites={addToFavourites}
                />
              }
            />
            <Route
              path="/favourites"
              element={
                <Favourites
                  favourites={favourites}
                  onRemoveFromFavourites={removeFromFavourites}
                  onClearFavourites={clearFavourites}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} EstatePro • Advanced Client-side Web Development
          </p>
          <p className="footer-note">
            University of Westminster • 5COSC026W Coursework
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <AppContent />
    </Router>
  );
}

export default App;