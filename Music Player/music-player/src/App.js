import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Card from './components/card';

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getVal = async () => {
    try {
      if (keyword.trim() === "") {
        alert("Please enter a valid search keyword");
        return;
      }

      const response = await fetch(
        `https://v1.nocodeapi.com/kushal_patil/spotify/msYFokHWYGxslaVH/search?q=${keyword}&type=track`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand">Navbar</a>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
          />
          <button onClick={getVal} className="btn btn-outline-success">Search</button>
        </div>
      </nav>

      <h1 className="new-releases-heading">New Releases</h1>
      <div className="container">
        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-lg-3 col-md-6 py-2">
              <Card
                link={track.album.images[1]?.url || 'placeholder.jpg'} // Provide a fallback image
                name={track.name}
                info={track.album.artists[0].name}
                date={track.album.release_date}
                song={track.preview_url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
