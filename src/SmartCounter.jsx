// import React, { useState } from "react";
// import "./SmartCounter.css";
// import AlbumShop from "./AlbumShop";

// function SmartCounter() {
//   const [showAlbumShop, setShowAlbumShop] = useState(false);

//   return (
//     <div className="home-container">
//       {!showAlbumShop ? (
//         <div className="home-card">
//           <h1 className="home-title">WELCOME TO MELODIFY</h1>
//           <p className="home-subtitle">
//             Enjoy shopping your favorite albums with style!
//           </p>

//           <button
//             className="home-btn"
//             onClick={() => setShowAlbumShop(true)}
//           >
//             Start Shopping →
//           </button>
//         </div>
//       ) : (
//         <AlbumShop onBack={() => setShowAlbumShop(false)} />
//       )}
//     </div>
//   );
// }

// export default SmartCounter;


import React, { useState, useEffect } from "react";

export default function RandomDog() {
  const [img, setImg] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(r => r.json())
      .then(data => {
        if (!cancelled) setImg(data.message);
      });
    return () => {
      // cleanup if component unmounts
      cancelled = true;
    };
  }, []); // empty deps → run once on mount

  return img ? <img src={img} alt="random dog" style={{maxWidth:300}} /> : <p>Loading...</p>;
}



