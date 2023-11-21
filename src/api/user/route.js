const express = require('express')
const {createNewUser, updateUserProfile, deleteUser, getAParticularUser} = require('./controller')

const router = express.Router();

router.post('/', createNewUser)
router.route('/:id')
    .put(updateUserProfile)
    .delete(deleteUser)
    .get(getAParticularUser)

module.exports = router;