const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Creation = require('./models/Creation.js');
const cookieParser = require('cookie-parser');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet  = require('helmet');
const morgan = require('morgan');
const path = require('path');
const Photo = require("./models/Photo");

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const bucket = 'dawid-booking-app';

const UPLOAD_DIR = path.join(__dirname, '/uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read',
    }));
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/api/test', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');
});

app.post('/api/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const {name,email,password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/api/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({ email: email });
    if (!userDoc) return res.status(400).json({ msg: "User do not exist."});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
            }, jwtSecret, {}, (err,token) => {
                if (err) {
                    res.cookie('token', token).json(userDoc);
                    return res.status(500).json({ msg: "Error signing token" });
                }
                res.cookie('token', token, { httpOnly: true }).status(200).json({
                    token,
                    user: { email: userDoc.email, id: userDoc._id },
                });
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/api/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    } else {
        res.json(null);
    }
});

app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

const photosMiddleware = multer({dest:'/tmp'});
//TODO
/*app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname,mimetype} = req.files[i];
        const url = await uploadToS3(path, originalname, mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});*/

app.post('/api/upload', upload.array('photos', 100), async (req, res) => {
    try {
        const uploadedFiles = req.files.map((file) => {
            return { url: `/uploads/${file.filename}` };
        });
        const savedPhotos = await Photo.insertMany(uploadedFiles);
        res.json(savedPhotos);
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ error: "Failed to upload files." });
    }
});



app.post('/api/creations', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ error: "Authorization token is missing" });
    }
    const {
        title,addedPhotos,description,rating,legoFamily
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const creationDoc = await Creation.create({
            owner:userData.id,
            title,
            photos:addedPhotos,
            description,
            rating,
            legoFamily
        });
        res.json(creationDoc);
    });
});

app.get('/api/user-creations', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Creation.find({owner:id}) );
    });
});

app.get('/api/creations/:id', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    res.json(await Creation.findById(id));
});

app.put('/api/creations', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
        id, title,addedPhotos,description,rating,legoFamily
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const creationDoc = await Creation.findById(id);
        if (userData.id === creationDoc.owner.toString()) {
            creationDoc.set({
                title,address,photos:addedPhotos,description,rating,legoFamily
            });
            await creationDoc.save();
            res.json('ok');
        }
    });
});

app.get('/api/creations', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const userData = await getUserDataFromReq(req);
    res.json( await Creation.find() );
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));