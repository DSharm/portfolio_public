import React, { useState } from 'react';
import Poster from './Poster.js'
import MovieDetail from './MovieDetail.js'
import SearchBox from './SearchBox.js'
import './App.css'

function App(props) {

  const [listOfMovies, setListOfMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  function handleNowPlayingClick(e) {
    e.preventDefault()
    const url = urlForTMDB("now_playing")

    fetch(url).then((r) => r.json()).then((data) => {
      console.log(data)
      setListOfMovies(data.results)
    });
  }

  function handleTopRatedClick(e) {
    e.preventDefault()
    const url = urlForTMDB("top_rated")

    fetch(url).then((r) => r.json()).then((data) => {
      console.log(data)
      setListOfMovies(data.results)
    });
  }

  function urlForTMDB(resource, search_term) {
    let api_url = null
    const api_key_param = "api_key=bde024f3eb43f597aafe01ed9c9098c6"
    const language_param = "language=en-US"
    const region_param = "region=US"
    const filter_param = "include_adult=false"
    if (resource === 'search') {
      const search_param = `query=${search_term}`
      const base_url = `https://api.themoviedb.org/3/search/movie`
      api_url = `${base_url}?${search_param}&${api_key_param}&${language_param}&${region_param}&${filter_param}`
    } else {
      const base_url = `https://api.themoviedb.org/3/movie/${resource}`
      api_url = `${base_url}?${api_key_param}&${language_param}&${region_param}&${filter_param}`
    }
    return api_url
  }
  function handlePosterClick(movie) {
    setSelectedMovie(movie)
  }

  function handleSearch(term) {
    const url = urlForTMDB("search", term)

    fetch(url).then((r) => r.json()).then((data) => {
      console.log(data)
      setListOfMovies(data.results)
    });
  }
    const posters = listOfMovies.map((movie) => {
      return <Poster key={movie.id} movie={movie} whenClicked={handlePosterClick}/>
    })
    return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col">
          <button onClick={handleTopRatedClick} className="btn btn-primary" href="#">Get Top-Rated Movies</button>
          <button onClick={handleNowPlayingClick} className="ml-3 btn btn-primary" href="#">Now Playing</button>
          <SearchBox submitHandler={handleSearch}/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <MovieDetail movie={selectedMovie}/>
        </div>
        <div className="col-sm-9">
          <div id="wall" className="row">
            {posters}
          </div>
        </div>
      </div>
    </div>
    )

  }





export default App;