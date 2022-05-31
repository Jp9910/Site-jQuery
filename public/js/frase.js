let botaoFrase = $('#botao-frase')
let frase = $('.frase')

botaoFrase.click(fraseAleatoria)

function fraseAleatoria() {
    $.get('http://localhost:3000/frases', novaFrase) //requisição GET. executa a função novaFrase() assim que obter o retorno. também pode ser função anônima
}

function novaFrase(data) {
    console.log(data)
    let num = Math.floor(Math.random() * data.length)
    console.log(num)
    atualizarInformacoes(data[num])
}