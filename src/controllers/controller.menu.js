
const listarMenu = (req, res) => {
    res.send('select');
}

const inserirMenu = (req, res) => {
    res.send('insert');
}

const editarMenu = (req, res) => { 
    res.send('edit');
}

const deletarMenu = (req, res) => {
    res.send('delete');
}

export default { listarMenu, inserirMenu, editarMenu, deletarMenu };