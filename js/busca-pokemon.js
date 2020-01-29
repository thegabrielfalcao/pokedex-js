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
    
    var div = document.createElement("div");
    
    div.addEventListener("click", function() {
        var classList = this.querySelector("table").classList;
        if (classList.contains("invisivel")){
            classList.remove("invisivel");
        } else {
            classList.add("invisivel");
        }
       
    });
    
    var img = document.createElement("img");
    img.src = resultado.sprites.front_default;
    
    var span = document.createElement("span");
    span.textContent = resultado.name;
    
    var table = montarTabelaStatus(resultado);
    
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(table);
    
    document.querySelector("div").appendChild(div);
}

function montarTabelaStatus(resultado) {
    
    var table = document.createElement("table");
    table.classList.add("invisivel");
    
    var thead = document.createElement("thead");
    thead.appendChild(criarTd("Status Base"));
    
    var tbody = document.createElement("tbody");
    
    resultado.stats.forEach(function(stat){
        var tr = document.createElement("tr");
        tr.appendChild(criarTd(stat.stat.name));
        tr.appendChild(criarTd(stat.base_stat));
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    return table;
}

function criarTd(conteudo) {
    
    var td = document.createElement("td");
    td.textContent = conteudo;
    
    return td;
}