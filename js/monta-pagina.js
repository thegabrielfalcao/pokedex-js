criarPagina();

function montaHtml(resultado) {
    
    paginaAtual = resultado;
    document.querySelector("div").innerHTML = '';
    
    isPaginaAnteriorExistente(resultado);
    
    resultado.results.forEach(function(pokemon) {
        chamadaRest("GET", pokemon.url, criaPokemon);
    });
}

function criaPokemon(resultado) {
    
    var div = document.createElement("div");
    
    div.addEventListener("click", function() {
        var classList = this.querySelector("table").classList;
        if (classList.contains("invisivel")){
            classList.remove("invisivel");
        } else {
            classList.add("invisivel");
        }
       
    });
    
    var figure = montaFigurePokemon(resultado);
    
    var table = montarTabelaStatus(resultado);
    div.appendChild(figure);
    div.appendChild(table);
    
    document.querySelector("div").appendChild(div);
}

function montarTabelaStatus(resultado) {
    
    var table = document.createElement("table");
    table.classList.add("invisivel");
    
    var tbody = document.createElement("tbody");
    
    resultado.stats.forEach(function(stat){
        var tr = document.createElement("tr");
        tr.appendChild(criarTd(capitalizar(stat.stat.name)));
        tr.appendChild(criarTd(stat.base_stat));
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    
    return table;
}

function criarTd(conteudo) {
    
    var td = document.createElement("td");
    td.textContent = conteudo;
    
    return td;
}

function montaFigurePokemon(resultado) {
    var figure = document.createElement("figure");
    
    var img = document.createElement("img");
    img.src = resultado.sprites.front_default;
    
    var span = document.createElement("figcaption");
    span.textContent = capitalizar(resultado.name);
    
    figure.appendChild(img);
    figure.appendChild(span);
    
    return figure;
}

function capitalizar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function criarPagina() {
    
    var h1 = document.createElement("h1");
    h1.textContent = "Pokémon - Status Base";
    
    var divPokemons = document.createElement("div");
    divPokemons.setAttribute("id", "pokemons");
    divPokemons.classList.add("grid");
    divPokemons.classList.add("bg");
    
    var divButtons = document.createElement("div");
    var button = document.createElement("button");
    button.setAttribute("onclick", "paginaAnterior()");
    button.setAttribute("id", "botao-pagina-anterior");
    button.textContent = "Página anterior";
    divButtons.appendChild(button);
    
    button = document.createElement("button");
    button.setAttribute("onclick", "proximaPagina()");
    button.textContent = "Próxima página";
    divButtons.appendChild(button);
    
    
    document.querySelector("body").appendChild(h1);
    document.querySelector("body").appendChild(divPokemons);
    document.querySelector("body").appendChild(divButtons);
}

function isPaginaAnteriorExistente(resultado) {
    var buttonAnterior = document.querySelector("#botao-pagina-anterior");
    if (resultado.previous == null) {
        buttonAnterior.classList.add("disabled");
    } else {
        buttonAnterior.classList.remove("disabled");
    }
}