var paginaAtual = null;

chamadaRest("GET", "https://pokeapi.co/api/v2/pokemon/", montaHtml);

function chamadaRest(metodo, url, callback) {
    
    var xhr = new XMLHttpRequest();
    var resposta = null;
    
    xhr.open(metodo, url, true);
    xhr.send();
    xhr.addEventListener("load", function(){
       
        if (xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        } else {
            
            var erro = {
                mensagem    : 'Erro ao efetuar chamada',
                status      : xhr.status 
            }
            
            callback(erro);
        }
    });
    
}

function proximaPagina() {
    chamadaRest("GET", paginaAtual.next, montaHtml);
}

function paginaAnterior() {
    if (paginaAtual.previous != null) {
        chamadaRest("GET", paginaAtual.previous, montaHtml);    
    }
    
}

function montaHtml(resultado) {
    
    paginaAtual = resultado;
    document.querySelector("div").innerHTML = '';
    
    resultado.results.forEach(function(pokemon) {
        chamadaRest("GET", pokemon.url, obtemImagem);
    });
}

function obtemImagem(resultado) {
    
    var img = document.createElement("img");
    img.src = resultado.sprites.front_default;
    
    document.querySelector("div").appendChild(img);
}