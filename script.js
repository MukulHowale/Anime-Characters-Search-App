async function getData(){
  let res = await fetch("https://api.jikan.moe/v3/search/character?q=naru");

  let data = await res.json();

  console.log(data);
}

// ok
