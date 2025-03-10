async function getPokemon(){
  try{
    const pokename = document.getElementById("pokename").value.toLowerCase();
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);
    if(!res.ok){
      throw new Error("Data Not Found");
    }
    else{
      let data = await res.json();
      const img = document.getElementById("img");
      const frontimg = data.sprites.front_default;

      img.src = frontimg;
      img.style.display = "block";
    }
  }
  catch(err){
    console.error(err);
  }
}
