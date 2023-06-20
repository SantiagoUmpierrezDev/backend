const passport = require('passport')
const local = require('passport-local')
const userManager = require('../managerDaos/user.mongo')
const userModel = require('../managerDaos/mongo/models/user.model')
const { createHash, isValidPassword } = require('../utils/bcrypt')
const GitHubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy
const initPassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback: true,usernameField: 'email'},
    async (req, username, password, done) => {
        const { firstName, lastName, email, birthday } = req.body
        try{
            const user = await userManager.getUserByEmail(username)
            if(user) return done(null, false)

            const newUser = {
                firstName,
                lastName,
                birthday,
                email,
                password: createHash(password)
            }
            let result = await userManager.addUser(newUser)
            return done(null, result)
        }catch(error){
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField: 'email'},
    async(username, password, done) => {
        const userDB = await userManager.getUserByEmail(username)
        try{
            if(!userDB) return done(null, false)

            if(!isValidPassword(password, userDB)) return done(null, false)

            return done(null, userDB)
        }catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id)
        done(null, user)
    })
}

const initPassportGithub = () => {
    passport.use('github', new GitHubStrategy({ 
        clientID: 'Iv1.6c2ae1a6d39be692',
        clientSecret: '235a8a7e69879c19c3dfed412efa279b99251fff',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback' },
    async(accessToken, refreshToken, profile, done) => {
        try{
            let user = await userManager.getUserByEmail(profile._json.email)
            if(!user){
                let newUser = {
                    firstName: profile._json.name,
                    lastName: ' ',
                    birthday: ' ',
                    email: profile._json.email,
                    password: ' ',
                }
                const result = await userManager.addUser(newUser)
                return done(null, result)
            }else{
                return done(null, user)
            }
        }catch(error){
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id)
        done(null, user)
    })
}

module.exports = { initPassport, initPassportGithub }