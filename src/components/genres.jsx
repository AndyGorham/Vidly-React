import React, { Component } from "react";

class Genres extends Component {
  render() {
    const { onGenreChange, currentGenre, genres } = this.props;
    return (
      <React.Fragment>
        <ul className="list-group">
          {genres.map((genre) => (
            <li
              key={genre._id || 1234}
              onClick={() => onGenreChange(genre.name)}
              className={
                genre.name === currentGenre
                  ? "list-group-item clickable active"
                  : "list-group-item clickable"
              }
            >
              {genre.name}
            </li>
          ))}
        </ul>

        {/* <ul class="list-group">
          <li
            className="list-group-item"
            onClick={() => onGenreChange("All Genres")}
          >
            All Genres
          </li>
          <li
            className="list-group-item"
            onClick={() => onGenreChange("Action")}
          >
            Action
          </li>
          <li
            className="list-group-item"
            onClick={() => onGenreChange("Comedy")}
          >
            Comedy
          </li>
          <li
            className="list-group-item"
            onClick={() => onGenreChange("Thriller")}
          >
            Thriller
          </li>
        </ul> */}
      </React.Fragment>
    );
  }
}

export default Genres;
