let campoTexto = $('#campo-digitacao')
let qntCaracteresDigitados = $('#caracteres-digitados')
let qntPalavrasDigitadas = $('#palavras-digitadas')

let segundosRestantes = $('#segundos-restantes')
let tempoInicial = segundosRestantes.text()
let campoDigitacao = $('#campo-digitacao')
let botaoReinicar = jQuery('#botao-reiniciar')
let idIntervalo = 0

$(document).ready(function() { //função chamada ao carregar a página. tem o alias '$(function{...})'
    atualizarTamanhoFrase()
    iniciarContadoresDigitacao()
    idIntervalo = iniciarCronometro()
    iniciarMarcadoresDeAcerto()
    botaoReinicar.click(reiniciar)
    $('section').find('table').find('tbody').find('tr').find('a').click(removerLinha)
    getPlacar()
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
})

function atualizarInformacoes(elemento)
{
    frase.text(elemento.texto)
    atualizarTamanhoFrase()
    atualizarTempoInicial(elemento.tempo)
}

function atualizarTempoInicial(tempo)
{
    tempoInicial = tempo
    $('#segundos-restantes').text(tempo)
}

function atualizarTamanhoFrase()
{
    let frase = jQuery('.frase') // '$()' é um alias para 'jQuery()'
    let textoDaFrase = frase.text()
    let vetorDePalavras = textoDaFrase.split(' ')
    qntPalavras = vetorDePalavras.length
    let elementoQntPalavras = $('#tamanho-frase')
    elementoQntPalavras.text(qntPalavras) //função text serve para get e set
}

function iniciarContadoresDigitacao()
{
    campoTexto.on('input', function(){
        conteudo = campoTexto.val()
        qntCaracteresDigitados.text(conteudo.replace(/\s+/g,'').length)
        qntPalavrasDigitadas.text(conteudo.split(/\s+/).length-1)
    })
}


function iniciarCronometro()
{
    //evento com 'one' só acontece 1 vez
    campoTexto.one('focus', function(){
        contador = tempoInicial
        idIntervalo = setInterval(funcID, 1000)
        console.log('id:'+idIntervalo)
    })
}

var funcID = function() {
    contador = contador - 1
    segundosRestantes.text(contador)
    if(contador == 0) {
        gameOver()
    }
}

function reiniciar()
{
    campoDigitacao.attr('disabled',false) //> campoDigitacao.removeAttr("disabled"); também funcionaria
    campoDigitacao.val('')
    qntPalavrasDigitadas.text(0)
    qntCaracteresDigitados.text(0)
    segundosRestantes.text(tempoInicial)
    if(idIntervalo){
        clearInterval(idIntervalo)
        idIntervalo = null
        iniciarCronometro()
    }
    campoDigitacao.removeClass('campo-desabilitado')
    campoDigitacao.removeClass('borda-vermelha')
    campoDigitacao.removeClass('borda-verde')
}

function gameOver()
{
    clearInterval(idIntervalo) //desabilitar setInterval
    campoDigitacao.attr('disabled',true) //desabilitar campo de digitacao
    campoDigitacao.addClass('campo-desabilitado')
    atualizarPlacar()
}


function iniciarMarcadoresDeAcerto()
{
    campoDigitacao.on('input', function(){
        let frase = $('.frase').text()
        let digitado = campoDigitacao.val()
        let comparavel = frase.substring(0, digitado.length)
        if( digitado == comparavel ) { //if (frase.startsWith(digitado))
            console.log('i')
            campoDigitacao.addClass('borda-verde')
            campoDigitacao.removeClass('borda-vermelha')
        } else {
            console.log('d')
            campoDigitacao.addClass('borda-vermelha')
            campoDigitacao.removeClass('borda-verde')
        }
        /*Seria equivalente ao if:
            var correto = (digitado == comparavel);
            campoDigitacao.toggleClass("borda-verde", correto);
            campoDigitacao.toggleClass("borda-vermelha", !correto);
        */
    })
}
//$('textarea').css("border","2px solid red"); //adiciona uma nova propriedade css
//var a = $('div').css(["background-color","width"])
//console.log(a.width)

function mostrarInfo(texto){
    info = $('.info')
    info.text(texto)
    info.fadeIn()
    setTimeout(function(){
        info.fadeOut()
    }, 2000);
}