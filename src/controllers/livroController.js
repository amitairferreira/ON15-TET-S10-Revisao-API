const livrosModel = require('../models/livrosModels.json')

//------------------ Encontrar por autor / titulo ----------

const findAllEbooks = (req, res) => {
  const { title = null, page = null, autor = null } = req.query

  try {
    let filterEbooks = livrosModel.slice()

    if (filterEbooks.length == 0) {
      return res.status(200).json({
        message: 'Ainda não temos livros cadastrado em nossa biblioteca'
      })
    }

    if (autor) {
      filterEbooks = filterEbooks.filter(currentEbook =>
        currentEbook.autor
          .toLocaleLowerCase()
          .includes(autor.toLocaleLowerCase())
      )
    }
    if (title) {
      filterEbooks = filterEbooks.filter(currentEbook =>
        currentEbook.titulo
          .toLocaleLowerCase()
          .includes(title.toLocaleLowerCase())
      )
    }

    if (filterEbooks.length === 0) {
      throw new Error('não foi encontrado resultado para essa busca')
    }

    res.status(200).json(filterEbooks)
  } catch (error) {
    console.error(error)
    console.log('query recebida: ', req.query)

    res.status(404).json({
      message: error.message,
      details: 'query invalida: ',
      query: req.query
    })
  }
}

//----------------- Encontrar livro por Id -------------------

const findById = (req, res) => {
  const { id } = req.params.id
  //const findAllEbooks = livrosModel[id] //poderia ser assim pq é um array, e o id ser um indice numérico
  //ou
  try {
    const findEbook = livrosModel.find(ebook => ebook.id == id) //pesquisa mais sofisticada

    if (!findEbook)
      throw new Error(`não foi possivel encontrar o livro com id ${id}`)

    res.status(200).json(findEbook)
  } catch (error) {
    console.error(error)
    res.status(404).json({
      message: 'Poxa. desculpa, ainda não temos esse livro no nosso catalogo.',
      details: error.message
    })
  }
}

//--------------------Encontrar um livro pelo titulo -------

const findOneEbookByTitle = (req, res) => {
  const { title = '"vazio"' } = req.query

  try {
    if (!title)
      throw new Error('Nenhum parametro inserido para realizar a busca')

    const findEbook = livrosModel.find(
      currentEbook =>
        currentEbook.titulo.toLocaleLowerCase() == title.toLocaleLowerCase()
    )

    if (!findEbook)
      throw new Error(
        `não foi possivel encontrar o livro com o titulo ${title}`
      )

    res.status(200).json(findEbook)
  } catch (error) {
    console.error(error)
    res.status(404).json({
      message: 'desculpa, ainda não temos livros com esse titulo.',
      details: error.message
    })
  }
}

//------------------------------- Criar novo livro --------------------------------------------------

const createEbook = (req, res) => {
  const { titulo, paginas, autor } = req.body

  try {
    const id = livrosModel.length

    if (titulo === null || titulo === undefined || titulo.trim() == '') {
      throw {}
    }

    const findEbookByTitle = livrosModel.find(
      ebook => ebook.titulo.toLocaleLowerCase() == titulo.toLocaleLowerCase()
    )

    if (
      findEbookByTitle &&
      findEbookByTitle.autor.toLocaleLowerCase() == autor.toLocaleLowerCase()
    ) {
      throw {
        statusCode: 409,
        message: 'Já existe um livro com o mesmo titulo e autor.',
        details: 'já existe no sistema um livro com o mesmo titulo e autor'
      }
    }

    const newEbook = { id, titulo, paginas, autor }

    console.log(newEbook)

    livrosModel.push(newEbook)

    console.table(livrosModel)

    res.status(201).json(newEbook)
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode).json(error)
    else res.status(500).json({ message: error.message })
  }
}

module.exports = {
  findAllEbooks,
  findById,
  findOneEbookByTitle,
  createEbook
}
