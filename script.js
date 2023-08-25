// let wrapper = document.querySelector(".wrapper");
// console.log(wrapper);

async function fetchAllPlayers() {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players`);
  const data = await response.json();
  return data.data.players;
}
console.log(fetchAllPlayers())

async function fetchSinglePlayer(id) {
  try{
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players/`+id+`/`);
    const data = await response.json();
    return data.data.player
  }catch{
    console.log("error")
  }
}
console.log(fetchSinglePlayer(737))

function createElement(dt) {
  this.element=document.createElement("div");

  this.name= document.createElement("h1");
  //this.name.innerHTML=dt.name;
  this.id= document.createElement("h2");
  this.id.innerHTML=dt.id;
  this.image= document.createElement("img");
  this.image.src = dt.imageUrl;
  this.image.alt = dt.name;

  this.element.append(this.name);
  this.element.appendChild(this.id);
  this.element.appendChild(this.image);

  document.querySelector(".wrapper").appendChild(element);
} 

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
function renderAllPlayers() {
  document.querySelector(".wrapper").innerHTML="";
  fetchAllPlayers().then(response=>{
    response.forEach((i) =>{
      createElement(i)
    })
  })
}

function renderSinglePlayer(id) {
  document.querySelector(".wrapper").innerHTML="";
  fetchSinglePlayer(id).then(response=>{
    createElement(response)
  })
}

document.getElementById("button").addEventListener("click", function() {
  renderAllPlayers();
})
/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers();

};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}