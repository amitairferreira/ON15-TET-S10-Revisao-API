const estabelecimentosModel = require('../models/estabelecimentos.json')

const createBusiness = (req, res) => {
  let bodyReq = req.body

  try {
    if (!bodyReq.nome || bodyReq.nome.trim() == '')
      throw new Error(
        'O nome do estabelecimento é obrigatório para cadastramento'
      )

    let novoEstabelecimento = {
      id: estabelecimentosModel.length + 1,
      likes: bodyReq.likes,
      nome: bodyReq.nome,
      endereco: bodyReq.endereco,
      numero: bodyReq.numero,
      bairro: bodyReq.bairro,
      cidade: bodyReq.cidade,
      telefone: bodyReq.telefone,
      pagamento: bodyReq.pagamento,
      site: bodyReq.site
    }
    estabelecimentosModel.push(novoEstabelecimento)

    res.status(200).send({
      message: 'estabelecimento cadastrado com sucesso',
      novoEstabelecimento
    })
  } catch (error) {
    res.status(400).json({
      message: 'Não foi possivel realizar o cadastro',
      details: error.message
    })
  }
}

const updateAddress = (req, res) => {
  let idReq = req.params.id

  try {
    let newAddress = req.body.endereco

    if (!newAddress || newAddress.trim() == '')
      throw new Error('O preenchimento do campo endereço é obrigatório')

    const estabelecimentoEncontrado = estabelecimentosModel.find(
      estabelecimento => estabelecimento.id == idReq
    )
    estabelecimentoEncontrado.endereco = newAddress

    res.status(200).json({
      message: 'Endereço atualizado com sucesso',
      'Estabelecimento-atualizado': estabelecimentoEncontrado,
      estabelecimentosModel
    })
  } catch (error) {
    res.status(400).json({
      message: 'Não foi possível atualizar o endereço do estabelecimento',
      details: error.message
    })
  }
}

const addLikes = (req, res) => {
  let idReq = req.params.id

  try {
    const estabelecimentoEncontrado = estabelecimentosModel.find(
      estabelecimento => estabelecimento.id == idReq
    )

    if (!estabelecimentoEncontrado)
      throw new Error('Não foi encontrado resultado para esse estabelecimento')
    estabelecimentoEncontrado.likes = estabelecimentoEncontrado.likes + 1

    res.status(200).json({
      message: 'Curtida adicionada',
      'Like no estabelecimento': estabelecimentoEncontrado,
      estabelecimentosModel
    })
  } catch (error) {
    res.status(404).json({
      message: 'Não foi possível adicionar curtida',
      details: error.message
    })
  }
}

const deslike = (req, res) => {
  let idReq = req.params.id
  try {
    const estabelecimentoEncontrado = estabelecimentosModel.find(
      estabelecimento => estabelecimento.id == idReq
    )
    if (!estabelecimentoEncontrado)
      throw new Error('Não foi encontrado resultado para esse estabelecimento')
    estabelecimentoEncontrado.likes = estabelecimentoEncontrado.likes - 1

    res.status(200).json({
      message: 'Curtida removida',
      'Like removido do estabelecimento': estabelecimentoEncontrado,
      estabelecimentosModel
    })
  } catch (error) {
    res.status(404).json({
      message: 'Não foi possível remover curtida',
      details: error.message
    })
  }
}

module.exports = {
  createBusiness,
  updateAddress,
  addLikes,
  deslike
}
