const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'a818206da38842e4ab6341b4dfa162d8'
});

const handleApiCall = (req, res,) => {
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL,})
    .then(generalModel => {
      return generalModel.predict(req.body.input);
    })
    .then(data => {
        res.json(data);
    }).catch(err => res.status(400).json('not communitcationg with the api'))
}

const updateImage = (req, res, postgres) => {
    const { id } = req.body;
    postgres('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    updateImage: updateImage,
    handleApiCall: handleApiCall
}