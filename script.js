
let div = document.getElementById('show');

let timerId;


let appendMovies = (m) =>{
  show.innerHTML = null;

  m.forEach(({Title}) =>{
      let p = document.createElement('p');

      p.innerText = Title;

      show.append(p);
      
  })
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

  append(movies);

  console.log(movies);
}

//get data from server
let getData = async (n) =>{
  let res = await fetch(`https://api.jikan.moe/v3/search/character?q=${n}`);

  let data = await res.json();

  console.log(data.results);
}

//executes main function after ccertain time
let wait = (f,d) =>{
  if(timerId){
    clearTimeout(timerId);
    // console.log(timerId);
  }

  console.log("OK");

  timerId = setTimeout(() =>{
    f();
  },d)
}