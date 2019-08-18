import React from "react";

import "./index.scss";

function Favorites({ favorites, onFavorite, onClickLocation }) {
  return (
    <div className="favorites">
      {favorites && !!favorites.length ? (
        favorites.map(({ id, title }) => {
          return (
            <div className="favorites__favorite">
              <span className="favorites__favorite-icon">
                <i
                  onClick={() => onFavorite(id, title)}
                  className={"fas fa-heart"}
                />
              </span>
              <p
                className="favorites__favorite-title"
                onClick={() => onClickLocation(id)}
              >
                {title}
              </p>
            </div>
          );
        })
      ) : (
        <div className="favorites__Nofavorite">
          <p className="favorites__Nofavorite-title">No Favorites</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
