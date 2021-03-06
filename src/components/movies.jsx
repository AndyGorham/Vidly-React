import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import Genres from "./genres";
import MoviesTable from "./moviesTable";
import Search from "./common/search";
import _, { orderBy } from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    genres: [],
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    let movies;
    let currentGenre;
    if (genre === "All Genres") {
      movies = getMovies();
      currentGenre = "All Genres";
    } else {
      movies = getMovies().filter((m) => m.genre.name === genre);
      currentGenre = genre;
    }
    this.setState({ movies, currentGenre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      currentGenre,
      genres,
      searchQuery,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    // const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);

    // const movies = paginate(sorted, currentPage, pageSize);

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <Genres
            onGenreChange={this.handleGenreChange}
            currentGenre={currentGenre}
            genres={genres}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary mb-4" to="/movies/new">
            New Movie
          </Link>
          <Search onSearch={this.handleSearch} value={searchQuery} />
          <p>Showing {count} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
