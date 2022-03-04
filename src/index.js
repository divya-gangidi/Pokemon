$(document).ready(()=>{
    console.log("on load")
    $("#pokemonDiv").hide()
    $('.carousel-div').hide()
    

    $("#searchButton").click(()=>{
        let searchValue= $("#search").val()
        if(searchValue == ""){
            alert("Enter a value to search")
        } else {
            console.log(searchValue)
            getPokemonDetails(searchValue)
        }
        
    })

    $("#imageBack, #imageFront").click(()=>{

        $("#imageBack").toggle()
        $("#imageFront").toggle()
    })

    $("#addFavorite").click(()=>{
        
        addFavoritePokemon()
    })

    $( "#searchButton" ).click();

    
  });

  const savedPokemons = []
  let currentData;

  async function getPokemonDetails(searchValue) {

    let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+searchValue);
    let data = await response.json(); 
    loadData(data)
    
  }
  

  let loadData =(data)=>{
      $("#imageBack").hide()
      $("#imageFront").show()
      
    console.log(data)
    console.log(data.sprites.front_default)
    $("#imageFront").attr("src",data.sprites.front_default);

    $("#imageBack").attr('src',data.sprites.back_default);
    $("#name").html(data.species.name)
    $("#order").html(data.order)
    $("#baseExperience").html(data.base_experience)
    $("#pokemonDiv").show()


    currentData = data
  }

  let addFavoritePokemon = ()=>{
    console.log("add to favorite click")
    let name = currentData.species.name
    let spanElement = $("#span-template").clone()
    spanElement.attr('id','span-'+name)
    spanElement.find('img').attr('src',currentData.sprites.front_default).attr('id',name)
    spanElement.find('span').html(name)
    $('.carousel-div').append(spanElement)
    $('.carousel-div').show()

    savedPokemons.push({"name":name, "data":currentData})
  }


  let loadPokemon = (e) =>{
    
    let pokemonName = e.target.id
    console.log(pokemonName)


  }
