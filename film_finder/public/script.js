const tmdbBaseUrl = 'https://api.themoviedb.org';
const playBtn = document.getElementById('playBtn');
const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'earer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWQ1MTRlNmQ3NTRhNTZkYTNkNjM1MTRmMTkwZWMzYiIsIm5iZiI6MTczMDM4NjUwOS4zODIzNjksInN1YiI6IjY3MjI2ODBlMWRmNzBmNzkyMGZlZDJiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2hmkaE3_V4dKWopACTv_YVuodCJfTRjpL8_YSVqgTM'
    }
}

const getGenres = async () => {
  const genresRequestEndpoint = '/3/genre/movie/list';
  const langParams = '?language=en'
  const urlToFetch = `${tmdbBaseUrl}${genresRequestEndpoint}${langParams}`;

  try {
    const response = await fetch(urlToFetch, options);
    if(response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  };
};
  

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/3/discover/movie';
  const requestParams = `?with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies
    }
  } catch (error) {
    console.log(error);
  }

};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/3/movie/${movieId}`;
  const requestParams = '?language=en-US';
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
  const response = await fetch(urlToFetch, options);
  if (response.ok) {
    const movieInfo = await response.json();
    return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;