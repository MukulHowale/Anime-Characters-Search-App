
let show = document.getElementById('show');

let timerId;


let appendMovies = (m) =>{
  show.innerHTML = null;

  console.log(m);

  m.forEach(({name,anime,manga}) =>{
      let div = document.createElement('div');

      let h3 = document.createElement('h3');
      h3.innerText = name;

      let p2 = document.createElement('p');
      p2.style.float = "left";

      let p1 = document.createElement('p');
      p1.style.float = "right";

      if(anime.length != 0){
        p1.textContent = "Anime";
        if(anime[0].name.length >= 25){
          p2.setAttribute('class','dots');
        }
        p2.textContent = anime[0].name;
      }
      else{
        p1.textContent = "Manga";
        if(manga[0].name.length >= 25){
          p2.setAttribute('class','dots');
        }
        p2.textContent = manga[0].name;
      }

      let value = document.getElementById('val');
      value.style.borderBottomLeftRadius = "0px";
      value.style.borderBottomRightRadius = "0px";

      div.append(h3,p2,p1);

      show.append(div);
      
  })

  if(m.length >= 5){
    show.style.overflow = "scroll";
    show.style.overflowX = "hidden";
    show.style.border = "1px solid black";
    show.style.borderBottomRightRadius = "5px";
  }
  else if(m.length == 4){
    show.style.border = "1px solid black";
    show.style.borderBottomRightRadius = "20px";
    if(show.style.overflowY){
      show.style.overflowY = "hidden";
    }
  }
  else{
    let temp = show.firstChild;
    while(temp != show.lastChild){
      temp.style.borderLeft = "1px solid black";
      temp.style.borderRight = "1px solid black";
      temp = temp.nextSibling;
    }
    show.style.overflow = "hidden";
    show.lastChild.style.borderLeft = "1px solid black";
    show.lastChild.style.borderRight = "1px solid black";
    show.lastChild.style.borderBottom = "1px solid black";
    show.lastChild.style.borderBottomLeftRadius = "20px";
    show.lastChild.style.borderBottomRightRadius = "20px";
    show.style.border = "0px";
  }
}

// get input value and calls append function
let main = async () =>{
  let name = document.getElementById('val').value;

  if(name.length < 3){
      return false;
  }

  let movies = await getData(name);

  if(movies === undefined){
      return false;
  }

  appendMovies(movies);

  // console.log(movies);
}

//get data from server
let getData = async (n) =>{
  let res = await fetch(`https://api.jikan.moe/v3/search/character?q=${n}`);

  let data = await res.json();

  return data.results;

  // console.log(data.results);
}

//executes main function after ccertain time
let wait = (f,d) =>{
  if(timerId){
    clearTimeout(timerId);
    // console.log(timerId);
  }

  timerId = setTimeout(() =>{
    f();
  },d)
}