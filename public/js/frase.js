let botaoFrase = $('#botao-frase')
let botaoFraseId = $('#botao-frase-id')
let frase = $('.frase')

botaoFrase.click(fraseAleatoria)
botaoFraseId.click(fraseEspecifica)

function fraseAleatoria() {
    $('#spinner').show();
    $.get('http://localhost:3000/frases', novaFrase) //requisição GET. executa a função novaFrase() assim que obter o retorno. também pode ser função anônima
        .fail(function() {
            let erro = $('.erro')
            erro.show();
            setTimeout(() => {
                erro.fadeOut(1000);
            }, 2000);
        })
        .always(function(){
            $('#spinner').hide(); //AJAX é assíncrono. não é o mesmo que colocar depois da instrução do .get. always será executado *depois* do sucesso ou falha
        });
}

function fraseEspecifica() {
    $('#spinner').show();

    fraseId = { id: $('#frase-id').val() } //dados passados na requisição precisam ser ou String ou Objeto
    $.get('http://localhost:3000/frases', fraseId, novaFraseEspecifica) //a rota foi configurada para caso receber um parâmetro 'id', retornar apenas os dados com esse id
        .fail(function(){
            let erro = $('.erro')
            erro.show();
            setTimeout(() => {
                erro.fadeOut(1000);
            }, 2000);
        })
        .always(function(){
            $('#spinner').hide();
        });
}


function novaFrase(data) {
    console.log(data)
    let num = Math.floor(Math.random() * data.length)
    console.log(num)
    atualizarInformacoes(data[num])
}

function novaFraseEspecifica(data) {
    console.log(data)
    atualizarInformacoes(data)
}