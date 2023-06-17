let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // Set up cards in window
  GetDisplayToyData();

  // Add toy btns

  document.getElementsByClassName('submit')[0]
  .addEventListener("click", event => AddNewToy(event));

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function DisplayCard(name, url, id)
{
  /*
  document.getElementById('toy-collection').innerHTML +=
  `<div class="card">
  <h2>${name}</h2>
  <img src= ${url} class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id=${id}>Like ❤️</button>
  </div>`;
*/

  let toyCollection = document.getElementById('toy-collection');
  let card = document.createElement('div');
  card.className = 'card';

  // h2, name
  let nameHeader = document.createElement('h2');
  nameHeader.textContent = name;
  card.append(nameHeader);

  // img
  let image = document.createElement('img');
  image.src = url;
  image.className = 'toy-avatar';
  card.append(image);

  // p like count
  let likeCount = document.createElement('p');
  likeCount = '4 Likes';
  card.append(likeCount);

  // like button
  let likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  likeBtn.id = `${id}`;
  likeBtn.textContent = 'Like ❤️';
  card.append(likeBtn);

  toyCollection.append(card);

  likeBtn.addEventListener("click", event => console.log(event));
}

function GetDisplayToyData()
{
  fetch('http://localhost:3000/toys')
  .then((result) => result.json())
  .then(data => 
  {
    for(let i = 0; i < data.length; i++)
    {
      DisplayCard(data[i].name, data[i].image, data[i].id);
    }
  })
  .catch((err) => {
    alert(err);
  });
}

function AddNewToy(event)
{
  event.preventDefault();

  const  nameField = document.getElementsByClassName('input-text')[0];
  const imageField = document.getElementsByClassName('input-text')[1];

  const toy = {
      name: `${nameField.value}`,
      image: `${imageField.value}`,
      likes: 0,

    };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  }
  )
  .then(result => result.json())
  .then(data => console.log(data));

  // Clear fields
  nameField.value = '';
  imageField.value = '';
}

function UpdateLike(event)
{
  console.log(`UpdateLike`);
}