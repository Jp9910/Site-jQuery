function removerLinha (event) {
    event.preventDefault();
    //$(this) transforma o objeto em um objeto jQuery
    $(this).parent().parent().remove();
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>"); //cria um elemento tr
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    
    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    // Icone dentro do <a>
    link.append(icone);
    
    // <a> dentro do <td>
    colunaRemover.append(link);
    
    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    
    return linha
}

function atualizarPlacar() {
    let tbodyPlacar = $('.placar').find('tbody');
    nome = "JP"
    //montando a linha como string:
        //botaoRemover = `<a href="#"><i class="small material-icons">delete</i></a>`
        //row = `<tr><td>${nome}</td><td>${qntPalavrasDigitadas.text()}</td><td>${botaoRemover}</td><tr>`;
    
    //criar uma linha como objeto jQuery 
        row = novaLinha(nome,qntPalavrasDigitadas.text())
    //adicionar evento de remover ao botao de delete
        row.find('.botao-remover').click(removerLinha)
    tbodyPlacar.prepend(row);
}

//$("h1").parent(".vermelha").remove();
// pega todos os pais de h1, tais que esses pais têm a classe 'vermelha'

//var itemDaLista = $("<li>");
//$("ul").append(itemDaLista);