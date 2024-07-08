document.addEventListener("DOMContentLoaded", () => {
  let userInput = document.getElementById("userInput");
  const api_key = "U57EjmM9fOth6BBbD3hrv8orByvwKG1T";
  const baseUrl = "https://api.giphy.com/v1/gifs/";
  let gifDiv = document.getElementById("gifList");
  let buttons = document.getElementsByTagName("button");
  console.log(buttons);

  getTrendingGifs();

  //input event handler
  userInput.addEventListener("keyup", (e) => {
    gifDiv.innerHTML = "";
    let searchTerm = userInput.value.trim();
    if (searchTerm) {
      const endpoint = `${baseUrl}search?api_key=${api_key}&limit=12&q=${searchTerm}`;

      fetch(endpoint)
        .then((response) => {
          if (response.ok) return response.json();
          throw Error(`Response status: ${response.status}`);
        })
        .then((data) => {
          gifDiv.innerHTML = "";
          data.data.forEach((item) => {
            let gif = document.createElement("img");
            gif.src = item.images.fixed_height.url;
            gifDiv.appendChild(gif);
          });
        })
        .catch((error) => console.error("Error fetching GIFs:", error));
    }
  });

  //event listener for trending button
  buttons[0].addEventListener("click", (e) => {
    userInput.value = "";
    getTrendingGifs();
  });
  //event handlers for other buttons - loop over the other buttons and add an event listener.  Use data-searchTerm attribute to set the correct endpoint for each button
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
      userInput.value = "";
      gifDiv.innerHTML = "";
      e.preventDefault();
      let searchTerm = e.target.getAttribute("data-searchTerm");
      const endpoint = `${baseUrl}search?api_key=${api_key}&limit=12&q=${searchTerm}`;
      fetch(endpoint)
        .then((response) => {
          if (response.ok) return response.json();
          throw Error(`Response status: ${response.status}`);
        })
        .then((data) => {
          gifDiv.innerHTML = "";
          data.data.forEach((item) => {
            let gif = document.createElement("img");
            gif.src = item.images.fixed_height.url;
            gifDiv.appendChild(gif);
          });
        })
        .catch((error) => console.error("Error fetching GIFs:", error));
    });
  }

  function getTrendingGifs() {
    const endpoint = `${baseUrl}trending?api_key=${api_key}&limit=12`;

    fetch(endpoint)
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(`Response status: ${response.status}`);
      })
      .then((data) => {
        gifDiv.innerHTML = "";
        data.data.forEach((item) => {
          let gif = document.createElement("img");
          gif.src = item.images.fixed_height.url;
          gifDiv.appendChild(gif);
        });
      })
      .catch((error) => console.error("Error fetching trending GIFs:", error));
  }
});
