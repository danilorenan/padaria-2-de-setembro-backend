const router = require('express').Router();
const Post = require('../models/Post');
const Products = require('../models/Products');
const Bolos = require('../models/Bolos');
const Cucas = require('../models/Cucas');
const User = require('../models/User');
const multer = require('multer');
const multerConfig = require('../config/multer');
const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');

router.get('/posts', async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
})

router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url
    })
    return res.json(post);
})

router.delete('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
})

//-------------------PRODUCTS ROUTES----------------------// 

router.get('/products', async (req, res) => {
    const products = await Products.find();

    return res.json(products);
})

router.post('/products', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const products = await Products.create({
        name,
        description: req.body.description,
        cod: req.body.cod,
        title: req.body.title,
        size,
        key,
        url
    })
    return res.json(products);
})

router.delete('/products/:id', async (req, res) => {
    const products = await Products.findById(req.params.id);

    await products.remove();

    return res.send();
})

//--------------------------Bolos------------------------//

router.get('/bolos', async (req, res) => {
    const bolos = await Bolos.find();

    return res.json(bolos);
})

router.post('/bolos', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const bolos = await Bolos.create({
        name: name,
        description: req.body.description,
        cod: req.body.cod,
        title: req.body.title,
        size,
        key,
        url
    })
    return res.json(bolos);
})

router.delete('/bolos/:id', async (req, res) => {
    const bolos = await Bolos.findById(req.params.id);

    await bolos.remove();

    return res.send();
})
//--------------------------Cucas------------------------//

router.get('/cucas', async (req, res) => {
    const cucas = await Cucas.find();

    return res.json(cucas);
})

router.post('/cucas', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const cucas = await Cucas.create({
        name: name,
        description: req.body.description,
        cod: req.body.cod,
        title: req.body.title,
        size,
        key,
        url
    })
    return res.json(cucas);
})

router.delete('/cucas/:id', async (req, res) => {
    const cucas = await Cucas.findById(req.params.id);

    await cucas.remove();

    return res.send();
})


//---------------------USER ADMIN--------------------------//

router.get('/user', async (req, res) => {
    const users = await User.find();

    return res.json(users)
})

router.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const users = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    return res.json(users)
})

router.post('/login', async(req, res) => {
    
        const user = await User.findOne({email:req.body.email})
        
        if (user == null){
            return res.json('Senha ou email não cadastrado')
        }
        try {
            if(await bcrypt.compare(req.body.password, user.password)){
                return res.send('Success')
            }else{
                return res.send('Not allowed')
            }
        }catch (err) {
            res.json(err)
            console.log(err)
        }

})


module.exports = router;