import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./AlbumShop.css";

const initialAlbums = [
  { id: 1, title: "Midnights – Taylor Swift", artist: "Taylor Swift", price: 350, img: "/assets/Midnights.jpg" },
  { id: 2, title: "Folklore – Taylor Swift", artist: "Taylor Swift", price: 400, img: "/assets/Folklore.jpg" },
  { id: 3, title: "Proof – BTS", artist: "BTS", price: 500, img: "/assets/Proof.jpg" },
  { id: 4, title: "BE – BTS", artist: "BTS", price: 450, img: "/assets/BE.jpg" },
  { id: 5, title: "1989 – Taylor Swift", artist: "Taylor Swift", price: 300, img: "/assets/1989.jpg" },
  { id: 6, title: "Lover – Taylor Swift", artist: "Taylor Swift", price: 320, img: "/assets/Lover.jpg" },
  { id: 7, title: "That's Showbiz Baby! – JADE", artist: "JADE", price: 420, img: "/assets/WINGS.jpg" },
  { id: 8, title: "Red – Taylor Swift", artist: "Taylor Swift", price: 360, img: "/assets/Red.jpg" },
  { id: 9, title: "Speak Now – Taylor Swift", artist: "Taylor Swift", price: 340, img: "/assets/SpeakNow.jpg" },
  { id: 10, title: "Love Yourself – BTS", artist: "BTS", price: 460, img: "/assets/LoveYourself.jpg" },
  { id: 11, title: "Persona – BTS", artist: "BTS", price: 490, img: "/assets/Persona.jpg" }
];

function AlbumShop({ onBack }) {

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const albumsPerPage = 4; // Gidugangan ang albums per page

  // ✅ FILTER
  const filteredAlbums = useMemo(() => {
    if (filter === "All") return initialAlbums;
    return initialAlbums.filter(album => album.artist === filter);
  }, [filter]);

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // ✅ PAGINATION
  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);
  const currentAlbums = filteredAlbums.slice(
    (currentPage - 1) * albumsPerPage,
    currentPage * albumsPerPage
  );

  // ✅ ADD TO CART
  const addToCart = useCallback((album) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === album.id);

      if (existing) {
        return prev.map(item =>
          item.id === album.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...album, quantity: 1 }];
    });
  }, []);

  // ✅ REMOVE
  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const item = prev.find(prod => prod.id === id);

      if (item.quantity > 1) {
        return prev.map(prod =>
          prod.id === id ? { ...prod, quantity: prod.quantity - 1 } : prod
        );
      }
      return prev.filter(prod => prod.id !== id);
    });
  }, []);

  const clearCart = () => setCart([]);

  // ✅ TOTAL LOGIC
  const totalPrice = useMemo(() =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // ✅ ARTIST LIST
  const artists = useMemo(() => {
    return ["All", ...new Set(initialAlbums.map(a => a.artist))];
  }, []);

  const FilterButton = ({ isActive, children, onClick }) => (
    <button 
      className={`filter-button ${isActive ? "sidebar-button-active" : ""}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="album-shop-wrapper">
      {/* 🛑 GITANGTANG: Ang .album-app container giwala aron ang content mo-stretch */}

      {/* HEADER - Gikinahanglan gyud ni para makita ang Home button ug Cart */}
      <header className="shop-header">
        <div className="header-left">
          <button className="cart-btn" onClick={onBack}>🏠 Home</button> 
          <img src="/assets/logo.png" alt="logo" className="shop-logo" />
          <h1 className="shop-name">Melodify</h1>
        </div>
        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          🛒 {totalItems}
        </button>
      </header>

      {/* CART */}
      {showCart && (
        <div className="cart-dropdown">
          <h3>🛍 Cart</h3>

          {cart.length === 0 ? <p>Cart is empty.</p> :
            cart.map(item => (
              <div key={item.id} className="cart-row">
                <span>{item.title} ({item.quantity})</span>
                <span>₱{item.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)}>➖</button>
              </div>
            ))
          }

          <div className="cart-total-row">
            <strong>Total: ₱{totalPrice}</strong>
            <button className="clear-cart-btn" onClick={clearCart}>Clear</button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT - Wala na'y sidebar */}
      <div className="shop-main">

        {/* 🛑 BAG-O: Gibalhin ang Filter Buttons dinhi, sa ibabaw sa grid */}
        <div className="filter-row">
          <h4>Filter by Artist:</h4>
          {artists.map(name => (
            <FilterButton
              key={name}
              isActive={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </FilterButton>
          ))}
        </div>
        
        {/* CONTENT */}
        <div className="shop-content">

          <div className="album-grid">
            {currentAlbums.map(album => (
              <div className="album-card" key={album.id}>
                {/* Image Component (Gihimo na ni og square sa CSS) */}
                <img src={album.img} alt={album.title} /> 
                <h3>{album.title}</h3>
                <p>₱{album.price}</p>
                <button onClick={() => addToCart(album)}>Add to Cart</button>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>«</button>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>

              {[...Array(totalPages)].map((_, i) => (
                <button key={i}
                  className={currentPage === i + 1 ? "page-active" : ""}
                  onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))}

              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>»</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AlbumShop;