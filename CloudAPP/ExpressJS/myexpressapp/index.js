//router -> get post
//middleware -> use
//templates ->use another file

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const app = new express();
app.use(express.static('External_modules'))
var loginRouter = express.Router()
var transRouter = express.Router()

let loginDetails = [];

//middleware with error handling 
//this middleware using for checking password
app.use(function (req, res, next) {
    if (req.query.password !== "pwd123") {
        throw new Error('Please enter a password')
    }
    else
        console.log("translate query time", Date())
    next();
})
//this middleware using for handling error
app.use(function (err, req, res, next) {
    if (err != null) {
        return res.status(500).send(err.toString());
    }
    else next();
})

loginRouter.use(function (req, res, next) {
    console.log('Login query Time:', Date());
    next();
})

loginRouter.get('/:name', function (req, res, next) {
    loginDetails.push({ "name": req.params.name, "login_time": new Date() });
    res.send("User :" + req.params.name + " last successful login " + Date())

})

transRouter.get("/", (req, res) => {
    getLanguages(res);
})

app.use('/login', loginRouter)
app.use('/ts', transRouter)

app.get("/", (req, res) => {
    res.send("Welcome to the express server")
})

app.get("/loginDetails", (req, res) => {
    res.send(JSON.stringify(loginDetails));
})

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`)
})

function getLanguageTranslator() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const languageTranslator = new LanguageTranslatorV3({
        version: '2018-05-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return languageTranslator;
}
function translate(textToTranslate, res) {
    let languageTranslator = getLanguageTranslator();

    const translateParams = {
        text: textToTranslate,
        modelId: 'en-th',
    };

    languageTranslator.translate(translateParams)
        .then(translationResult => {
            res.send(translationResult.result.translations[0].translation);
        }).catch(err => {
            res.send(err.toString());
        });
}

function getLanguages(res) {
    let languageTranslator = getLanguageTranslator();
    languageTranslator.listModels()
        .then(translationModels => {
            let models = translationModels.result.models;
            let modelNames = models.map((model) => {
                return model.name
            });
            res.send(modelNames);
        })
        .catch(err => {
            res.send(err.toString());
        });

}

transRouter.get("/translate", (req, res) => {
    let textToTranslate = req.query.textToTranslate;
    translate(textToTranslate, res);
});

