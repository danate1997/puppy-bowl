async function fetchAllPlayers() {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players`);
  const data = await response.json();
  return data.data.players;
}

async function fetchSinglePlayer(id) {
  try{
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players/`+id+`/`);
    const data = await response.json();
    return data.data.player
  }catch{
    console.log("error")
  }
}

function createElement(dt) {
  const element=document.createElement("div");

  const name= document.createElement("h1");
  name.innerHTML=dt.name;

  const id= document.createElement("h2");
  id.innerHTML=dt.id;

  const image= document.createElement("img");
  image.src = dt.imageUrl;
  image.alt = dt.name;

  element.appendChild(name);
  element.appendChild(id);
  element.appendChild(image);

  const deleteButton = document.createElement('button');
  deleteButton.innerText= "Delete";
  deleteButton.addEventListener('click', () => {
    element.remove();
  });
  const moreInfoButton = document.createElement('button');
  moreInfoButton.innerText= "More Info";
  moreInfoButton.addEventListener('click', () => {
    renderSinglePlayer(dt.id);
  });
  element.appendChild(moreInfoButton)
  element.appendChild(deleteButton);
  document.querySelector(".wrapper").appendChild(element);
} 

function renderAllPlayers() {
  document.querySelector(".wrapper").innerHTML="";
  fetchAllPlayers().then(response => {
    response.forEach(i =>{
      createElement(i);
    });
  });
}

function renderSinglePlayer(id) {


  
document.querySelector(".wrapper").innerHTML="";
const backButton = document.createElement('button');
backButton.innerText="Back to All Players";
backButton.addEventListener('click', () => {
  renderAllPlayers();
});
document.querySelector(".wrapper").appendChild(backButton);
fetchSinglePlayer(id).then(response => {
  createElement(response);
})
}

document.getElementById("button").addEventListener("click", function() {
  renderAllPlayers();
});
