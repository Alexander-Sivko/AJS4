"use strict";

// 1 //

// AJAX (Asynchronous JavaScript and XML) – технологія, що дозволяє здійснювати асинхронний обмін даними між клієнтом та сервером без потреби перезавантажувати сторінку.
//  Завдяки AJAX можна оновлювати окремі частини сторінки безпосередньо на клієнті.

// Отримання списку фільмів
fetch("https://ajax.test-danit.com/api/swapi/films")
  .then((res) => res.json())
  .then((films) => {
    const filmsContainer = document.createElement("div");
    document.body.appendChild(filmsContainer);

    films.forEach((film) => {
      const filmContainer = document.createElement("div");
      filmContainer.classList.add("film-container");
      filmsContainer.appendChild(filmContainer);

      const filmInfo = document.createElement("div");
      filmInfo.innerText = `
        Episode ID: ${film.episodeId}
        Name: ${film.name}
      `;
      filmContainer.appendChild(filmInfo);

      const charactersList = document.createElement("ul");
      filmContainer.appendChild(charactersList);

      // Отримання персонажів для даного фільму
      film.characters.forEach((characterURL) => {
        fetch(characterURL)
          .then((res) => res.json())
          .then((character) => {
            const characterItem = document.createElement("li");
            characterItem.innerText = character.name;
            charactersList.appendChild(characterItem);
          })
          .catch((error) => {
            console.log("Error fetching character data:", error);
          });
      });

      const filmInfo2 = document.createElement("div");
      filmInfo2.innerText = `
        Opening Crawl: ${film.openingCrawl}
      `;
      filmContainer.appendChild(filmInfo2);
    });
  })
  .catch((error) => {
    console.log("Error fetching film data:", error);
  });
