$(document).ready(()=>{
   
    hideOnload()
    //localStorage.clear()
    

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

    loadPokemons()
    //testLoad()
    
  });

  let savedPokemons = []
  let currentData;

  hideOnload =()=>{
    $("#pokemonDiv").hide()
    $('.carousel-div').hide()
    $('.error-div').hide()
    $('.template-remove').hide()
  }

  loadPokemons =()=>{

    for(var i=0;i<localStorage.length; i++) {
      var key = localStorage.key( i );
      var item = JSON.parse( localStorage.getItem( key ) );
      console.log(item)
      currentData = item
      addClonedDiv()
    }

  }


  async function getPokemonDetails(searchValue) {

    let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+searchValue);
    try{
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+searchValue);
      let data = await response.json(); 
      loadData(data)
    } catch(e){
      $("#pokemonDiv").hide()
      $('.error-div').show()
    }
    
  }
  

  loadData =(data)=>{
      $("#imageBack").hide()
      $("#imageFront").show()
      
    console.log(data)
    //console.log(data.sprites.front_default)
    $("#imageFront").attr("src",data.sprites.front_default);

    $("#imageBack").attr('src',data.sprites.back_default);
    $("#name").html(data.species.name)
    $("#order").html(data.order)
    $("#baseExperience").html(data.base_experience)
    $("#pokemonDiv").show()
    $('.error-div').hide()


    currentData = data
  }

  addFavoritePokemon = ()=>{
    //console.log("add to favorite click")
    
    addClonedDiv()
    let name = currentData.species.name
    localStorage.setItem(name, JSON.stringify(currentData));
  }


  addClonedDiv =()=>{
    let name = currentData.species.name
    let spanElement = $("#span-template").clone()
    spanElement.attr('id','span-'+name)
    spanElement.find('img').attr('src',currentData.sprites.front_default)
              .attr('id',name)
              .attr('title',name);
    spanElement.find('span').attr('class','remove').show();
    $('.carousel-div').append(spanElement)
    $('.carousel-div').show()
  }



  loadPokemon = (e) =>{
    
    let pokemonName = e.target.id
    console.log(pokemonName)

    let data = localStorage.getItem(pokemonName);
    loadData(JSON.parse(data))
  }

  removePokemon =(e)=>{
    let pokemonName = $(e.target).siblings('img').attr('id')
    console.log(pokemonName)
    //console.log(savedPokemons)
    localStorage.removeItem(pokemonName)
    // savedPokemons = savedPokemons.filter(pk => pk.name !== pokemonName)
    //console.log(savedPokemons)
    $('#span-'+pokemonName).remove()
    if(currentData.species.name == pokemonName ){
      $("#pokemonDiv").hide()
    }
  }

testLoad = ()=>{
    
    $("#search").val('pikachu')
    $( "#searchButton" ).click();
    
    setTimeout(()=>{
      $("#addFavorite").click();
      $("#search").val('paras')
      $( "#searchButton" ).click();
    }, 1000);

    setTimeout(()=>{
      $("#addFavorite").click();
      $("#search").val('ditto')
      $( "#searchButton" ).click();
    }, 2000);
  }
