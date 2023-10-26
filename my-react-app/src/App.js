import React, { useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
//e7abc08e
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e7abc08e'

// const movie1 = {
//  "Poster":"https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
//   "Title":"The Shawshank Redemption",
//   "Type":"movie",
//   "Year":"1994",
//   "imdbID":"tt0111161"
// }

function App() {
  const [movies,setMovies] = useState([]);
  const [searchItem , setSearchItem] = useState('')

  const searchMovies = async (title) => {
    const responce = await fetch(`${API_URL}&s=${title}`)
    const data = await responce.json()
    setMovies(data.Search)
  }
  useEffect(()=>{
    searchMovies('SpiderMan')
  },[])
    return (
      <div className="app">
        <h1>MovieLand</h1>

        <div className='search'>
          <input 
            placeholder='Search for movies'
            value={searchItem}
            onChange={(e)=> setSearchItem(e.target.value)}
          />
          <img src={SearchIcon} 
            alt="search" 
              onClick={()=> {searchMovies(searchItem)}}
            />
        </div>

        {
          movies.length > 0 ? 
          (<div className='container'>
              {movies.map((movie) => <MovieCard movie={movie}/>)}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No Movie Found</h2>
            </div>
          ) 

        }
      </div>
    );
}

export default App;
