// import React, { useState } from 'react';

// function Navbar(props) {
//   const [keyword, setKeyword] = useState("");
//   const getVal = async () => {
//     try {
//       const response = await fetch(
//         `https://v1.nocodeapi.com/kushal_patil/spotify/msYFokHWYGxslaVH/search?q=${keyword}&type=track`);
//       const data = await response.json();
//       console.log(data.tracks.items)
//       setTracks(data.tracks.items);
     
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   return (
   
    
//     <>
//       <nav className="navbar bg-body-tertiary">
//         <div className="container-fluid d-flex align-items-center">
//           <a className="navbar-brand">Navbar</a>
//           {/* <form className="d-flex" role="search"> */}
//             <input
//               value={keyword}
//               onChange={(event) => setKeyword(event.target.value)}
//               className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
//             />
//             <button onClick={getVal} className="btn btn-outline-success">Search</button>
//           {/* </form> */}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;
