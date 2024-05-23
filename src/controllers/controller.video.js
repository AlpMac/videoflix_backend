
const listarVideo = (req, res) => {
    res.send('select2');
}

const inserirVideo = (req, res) => {
    res.send('insert');
}

const editarVideo = (req, res) => { 
    res.send('edit');
}

const deletarVideo = (req, res) => {
    res.send('delete');
}

export default { listarVideo, inserirVideo, editarVideo, deletarVideo };