const search = document.querySelector(".search");
const matchList = document.querySelector(".match-list");

// search states
const searchStates = async text => {
  const response = await fetch("../data/states.json");
  const states = await response.json();

  // get matchs to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${text}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex); 
  });

  if(text.length == 0){
    matches = [];
    matchList.innerHTML = "";
  }

  outputHTML(matches);
}

const outputHTML = matches => {
  if(matches.length > 0){
    const html = matches.map(state => `
      <div class="card card-body mb-4">
        <h4 class="">${state.name} (${state.abbr}) <span class="text-primary">${state.capital}</span></h4>
        <small>Lat: ${state.lat} / Long ${state.long}</small>
      </div>
    `).join("");
    matchList.innerHTML = html;
  } 
};

search.addEventListener("keyup", () => searchStates(search.value));

