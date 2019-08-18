import React, { useState } from "react";

import "./index.scss";

function Header({ isOnShowFavorites, onClickMyFavorites, onSumbitSearch }) {
  const [query, setQuery] = useState(null);

  function enterPressed(event) {
    const code = event.keyCode || event.which;
    if (code === 13) {
      onSumbitSearch(query);
    }
  }

  return (
    <div className="header">
      <div className="header__container">
      {window.innerWidth > 576 ?
        <i className="logo">Simply Weather</i>
        :
        <i className="logo">SW</i>
      }
        <div className="header__form">
          <button
            className="header__iconSearch"
            onClick={() => onSumbitSearch(query)}
          >
            <i className="fas fa-search" />
          </button>
          <input
            className="header__search"
            onChange={e => setQuery(e.target.value)}
            onKeyPress={enterPressed}
          />
          <button
            className="header__favoritesButton"
            onClick={() => onClickMyFavorites(!isOnShowFavorites)}
          >
            {window.innerWidth > 576 ? (
              <p>My Favorites</p>
            ) : (
              <span>
                <i className={"fas fa-heart"} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
