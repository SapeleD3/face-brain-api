const handleProfile = (req, res, postgres) => {
    const { id } = req.params;
    postgres.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('not Found')
        }
    })
    .catch(err => res.status(400).json('err getting user'))
}

module.exports = {
    handleProfile: handleProfile
}