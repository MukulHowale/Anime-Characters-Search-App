var b = document.body;
b.style.backgroundImage = "url('https://wallpaperaccess.com/full/44772.jpg')";
b.style.backgroundSize = "cover";

let show = document.getElementById('show');

let timerId;

let showDetails = (e) =>{
  let big = document.getElementById('bigCont');
  big.style.display = "flex";
  big.style.flexDirection = "column";
  big.style.alignItems = "center";

  let data = e.target;

  let img = document.createElement('img');
  img.style.borderRadius = "10px";
  img.src = data.value;

  let name = data.firstChild;
  name.style.textAlign = "center";
  name.style.color = "white";
  name.style.marginTop = "10px";
  name.style.fontSize = "28px";
  name.style.textShadow = "4px 4px 4px rgb(173, 92, 92)";

  let back = document.createElement('button');
  back.style.width = "100px";
  back.style.height = "40px";
  back.style.backgroundColor = "transparent";
  back.style.marginLeft = "47%";
  back.innerText = "Go Back";
  back.style.border = "2px solid yellow";
  back.style.color = "Yellow";

  back.onmouseover = () =>{
    back.style.cursor = "pointer";
  }

  back.onclick = () =>{
    back.style.border = "2px solid rgb(158, 158, 3)";
    location.reload();
  }

  big.replaceChildren(img, name);

  big.insertAdjacentElement('afterend',back);

  console.log(data.value);
  console.log(data.firstChild);
}


let appendMovies = (m) =>{
  show.innerHTML = null;

  console.log(m);

  m.forEach(({name,anime,manga,image_url}) =>{
      let div = document.createElement('div');
      div.addEventListener('click',showDetails);

      div.value = image_url;

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

      div.style.backgroundColor = "rgb(245, 238, 228)";
      div.style.cursor = "pointer";

      div.append(h3,p2,p1);

      show.append(div);
      
  })

  if(m.length >= 5){
    show.style.overflow = "scroll";
    show.style.overflowX = "hidden";
    show.style.borderBottomRightRadius = "5px";
  }
  else if(m.length == 4){
    show.style.borderBottomRightRadius = "20px";
    if(show.style.overflowY){
      show.style.overflowY = "hidden";
    }
  }
  else{
    let temp = show.firstChild;
    while(temp != show.lastChild){
      temp = temp.nextSibling;
    }
    show.style.overflow = "hidden";
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