const express = require('express')
const passport = require('passport')
const userManager = require('../managerDaos/user.mongo') 

const router = express.Router()

router.post('/register', async (req, res) => {
    try{
        const { firstName, lastName, email, password, birthday } = req.body

        if(!firstName || !lastName || !email || !password || !birthday) return res.send({status: 'error', message: 'Some information fields are missing.' })

        const existsUser = await userManager.getUserByEmail(email)
        if(existsUser) return res.send({status: 'error', message: 'The email is already registered.' })

        const user = {
            firstName,
            lastName,
            email,
            password,
            birthday
        }
        await userManager.addUser(user)

        res.redirect('/login')
        // res.status(200).send({status: 'succes', message: 'Registered user successfully.'})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const role = (email == 'adminCoder@coder.com' && password == 'adminCod3r123') ? 'admin' : 'user'

        const userDB = await userManager.getUserByLogin(email, password)
        if (!userDB) return res.send({status: 'error', message: 'The user entered does not exist.'})

        req.session.user = {
            firstName: userDB.firstName,
            lastName: userDB.lastName,
            email: userDB.email,
            role
        }

        res.redirect('/products')
        // res.send({status: 'success', message: 'Login success.', session: req.session.user})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if (err) return res.send({status: 'error', message: err})
        // res.send('Successfully logged out.')
        res.redirect('/login')
    })
})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res)=>{
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        birthday: req.user.birthday,
        role: req.user.email == 'adminCoder@coder.com' ? 'admin' : 'user'
    }
    res.redirect('/products')
})

module.exports = router;