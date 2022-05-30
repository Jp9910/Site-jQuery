let campoTexto = $('#campo-digitacao')
let qntCaracteresDigitados = $('#caracteres-digitados')
let qntPalavrasDigitadas = $('#palavras-digitadas')

let segundosRestantes = $('#segundos-restantes')
const tempoInicial = segundosRestantes.text()
let campoDigitacao = $('#campo-digitacao')
let botaoReinicar = jQuery('#botao-reiniciar')
let idIntervalo = 0

$(document).ready(function() { //função chamada ao carregar a página. tem o alias '$(function{...})'
    atualizarTamanhoFrase()
    iniciarContadoresDigitacao()
    idIntervalo = iniciarCronometro()
})

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
        campoDigitacao.attr('disabled',true) //desabilitar campo de digitacao
        clearInterval(idIntervalo) //desabilitar setInterval
    }
}

botaoReinicar.click(reiniciar)
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
}