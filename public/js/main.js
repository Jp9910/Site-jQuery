let frase = jQuery('.frase') // '$()' é um alias para 'jQuery()'
let textoDaFrase = frase.text()

let vetorDePalavras = textoDaFrase.split(' ')
qntPalavras = vetorDePalavras.length

let elementoQntPalavras = $('#tamanho-frase')

elementoQntPalavras.text(qntPalavras) //função text serve para get e set

let campoTexto = $('#campo-digitacao')
let qntCaracteresDigitados = $('#caracteres-digitados')
let qntPalavrasDigitadas = $('#palavras-digitadas')

campoTexto.on('input', function(){
    conteudo = campoTexto.val()
    qntCaracteresDigitados.text(conteudo.replace(/\s+/g,'').length)
    qntPalavrasDigitadas.text(conteudo.split(/\s+/).length-1)
})