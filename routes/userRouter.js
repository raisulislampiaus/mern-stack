const router = require('express').Router()
const userCtrl = require('../controllers/userCtlr')
const auth = require('../middleware/auth')


router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/refresh_token', userCtrl.refreshToken)
router.get('/piaus', auth, userCtrl.getUser)



module.exports = router