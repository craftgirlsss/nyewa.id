const express = require('express')
const mongoose = require('mongoose');
const Product  = require('./models/product.models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ProductCategory = require('./models/product.category.models')
const User = require('./models/user.model')
var cors = require('cors');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({origin: 'http://localhost:3000'}));

const port = 5001

function errorResponse(res, error){
    res.status(500).json({
        status: false,
        message: error.message,
        response: []
    })
}

function customErrorResponse(res, errorMessage){
    res.status(404).json({
        status: false,
        message: errorMessage,
        response: []
    })
}

function goodResponse(res, message, responseData){
    res.status(200).json({
        status: true,
        message: message,
        response: responseData
    })
}

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return customErrorResponse(res, "Token tidak valid");
    }
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return customErrorResponse(res, "Token tidak valid");
      }
      req.user = decoded;
      next();
    });
  };

  // User Auth API
// ============================================================

// Register User API
app.post('/api/auth/register', async (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
    const existingUser = await User.findOne({ email: req.body.email });
    if(existingUser){
        return customErrorResponse(res, "Email sudah terdaftar, mohon gunakan email lain");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        
        await newUser.save();
        goodResponse(res, "Proses registrasi berhasil", [])
    } catch (error) {
        errorResponse(res, error)
    }
})

    // Login User API
    app.post('/api/auth/login', async (req, res) => {
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        try {
        const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return customErrorResponse(res, "Login gagal, email tidak terdaftar, mohon register terlebih dahulu");
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return customErrorResponse(res, "Login gagal, mohon cek email atau password");
            }

            // Generate JWT token
            const token = jwt.sign({ email: user.email }, 'secret');
            
            goodResponse(res, "Proses Login berhasil", {token : token})
        } catch (error) {
            errorResponse(res, error)
        }
    })

// Get User Data pake Beare Token
app.get('/api/auth/user', verifyToken, async (req, res) => {
    try {
        // Fetch user details using decoded token
        const user = await User.findOne({ email: req.user.email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    });

// Product
// =============================================================

// Get semua produk
app.get('/api/products', async (req, res) => {
  try {
    const product = await Product.find({})
    goodResponse(res, "Sukses mengambil data", product)
  } catch (error) {
    errorResponse(res, error)
  }
})

// Get produk berdasarkan id
app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        goodResponse(res, "Berhasil menemukan data", [product])
    } catch (error) {
        errorResponse(res, error)
    }
})

// Menambah produk baru
app.post('/api/products', async (req, res) => {
    try {
       const product = await Product.create(req.body)
       goodResponse(res, "Berhasil menambah produk", [])
    } catch (error) {
        errorResponse(res, error)
    }
})

// Update produk berdasarkan ID
app.put( '/api/product/:id', async (req, res) => {
     try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)

        if(!product) {
            return res.status(404).json({
                status: false,
                message: "Produk tidak ditemukan",
                response: []
            })
        }
        const updateProduct = await Product.findById(req.params.id)
        goodResponse(res, "Sukses mengupdate data", [updateProduct])
     } catch (error) {
        errorResponse(res, error)
     }
})

// Hapus produk berdasarkan ID
app.delete( '/api/product/:id', async (req, res) => {
    try {
       const product = await Product.findByIdAndDelete(req.params.id)

       if(!product) {
           return res.status(404).json({
               status: false,
               message: "Produk tidak ditemukan",
               response: []
           })
       }
       goodResponse(res, "Berhasil menghapus data", [])
    } catch (error) {
        errorResponse(res, error)
    }
})

// Category Product
// =============================================================
// Menambah produk category baru
app.post('/api/add_products_category', async (req, res) => {
    try {
       const product = await ProductCategory.create(req.body)
       goodResponse(res, "Berhasil menambah produk category", [])
    } catch (error) {
        errorResponse(res, error)
    }
})


// Akhir dari Route API
// ============================================================


// koneksi ke mongoodb offline
mongoose.connect('mongodb://localhost:27017/Node-API')
    .then(() => {
        console.log('Terhubung dengan MongoDB');
        app.listen(port, () => {
            console.log(`RestAPI Projek berjalan di port ${port}`)
          })
    })
    .catch((err) => {console.log(`Failed to connect MongoDB ${err}`)});

// koneksi ke mongodb online
// mongoose.connect('mongodb+srv://craftgirlsssshopping:V417cceMCdbSS6TV@backenddb.dfj1h.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
//     .then(() => {
//         console.log('Terhubung dengan MongoDB');
//         app.listen(port, () => {
//             console.log(`RestAPI Projek berjalan di port ${port}`)
//           })
//     })
//     .catch((err) => {console.log(`Failed to connect MongoDB ${err}`)});