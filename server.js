const app = require('./src/app')//api em express

const PORT  = 8000//define uma porta para o servidor escutar

//1 parametro -> escutar > api exposta no nosso servidor
//2 parametro -> callback > imprimi mensagem falando q a api rodou
app.listen(PORT, () => console.log('fé no pai, que agora vai na porta 8000'))

