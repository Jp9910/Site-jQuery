$('#botao-placar').click(togglePlacar);
$('#botao-salvar-placar').click(salvarPlacar);

function getPlacar() {
    $.get('http://localhost:3000/placar',function(data){
        let tbodyPlacar = $('.placar').find('tbody');
        data.forEach(element => { //ou $.each(data, function() {}. no $.each usa-se this para acessar cada elemento, e no forEach do js usa-se o parâmetro da função
            let row = novaLinha(element.usuario,element.pontos)
            row.find('.botao-remover').click(removerLinha)
            tbodyPlacar.prepend(row)
        });
    })
}

function salvarPlacar() {
    placar = []
    pontuacoes = $('tbody>tr'); //obtem todos os tr's que são filhos diretos de tbody
    pontuacoes.each(function() { //não funciona com arrow function??
        let usuario = $(this).find('td:nth-child(1)').text(); //td que o 1-ésimo filho de this
        let palavras = $(this).find('td:nth-child(2)').text(); //td que o 2-ésimo filho de this
        placar.push({usuario: usuario, pontos: palavras});
    });
    $.post('http://localhost:3000/placar', {placar});
    mostrarInfo('Placar Salvo!')
}

function scrollPlacar () {
    posicaoPlacar = $('.placar').offset().top; //pegar offset entre o topo e o elemento
    $('html').animate({scrollTop: posicaoPlacar+'px'}, 1000);
}

function togglePlacar () {
    //$(".placar").css("display", "block"); //alterar o css diretamente
    //$(".placar").show(); //função do jquery para mostrar
    //$(".placar").hide(); //função do jquery para esconder
    //$(".placar").toggle(); //função do jquery para toggle de mostrar/esconder
    $(".placar").stop().slideToggle(600); //stop() para a animação atual. slidetoggle(): função do jquery para toggle de mostrar/esconder com uma animação de tantos milisegundos. também tem o slideUp() para esconder e slideDown() para mostrar
}

function removerLinha (event) {
    event.preventDefault();
    //$(this) transforma o objeto em um objeto jQuery
    linha = $(this).parent().parent();
    //linha.fadeOut(1000); //também existe fadeIn() fadeToggle()
    //setTimeout( () => {
    //    linha.remove();
    //}, 1000)
    linha.fadeOut(function() {
        linha.remove();
    })
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
    nome = $('#usuarios').val()
    //montando a linha como string:
        //botaoRemover = `<a href="#"><i class="small material-icons">delete</i></a>`
        //row = `<tr><td>${nome}</td><td>${qntPalavrasDigitadas.text()}</td><td>${botaoRemover}</td><tr>`;
    
    //criar uma linha como objeto jQuery 
        row = novaLinha(nome,qntPalavrasDigitadas.text())
    //adicionar evento de remover ao botao de delete
        row.find('.botao-remover').click(removerLinha)
    tbodyPlacar.prepend(row);
    $('.placar').slideDown(600);
    scrollPlacar()
}

//$("h1").parent(".vermelha").remove();
// pega todos os pais de h1, tais que esses pais têm a classe 'vermelha'

//var itemDaLista = $("<li>");
//$("ul").append(itemDaLista);