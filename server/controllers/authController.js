const User = require('../models/user');
const {hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req,res) => {
    res.json('test is working');
}
//endpoint del registro
const registerUser = async(req,res) => {
    try{
        const {name,username,password, accType} = req.body;
        // Revisar nombre
        if(!name){
            return res.json({
                error: 'Se requiere un nombre para el registro.'
            })
        };
        // Revisar contraseña
        if(!password || password.length <= 8){
            return res.json({
                error: 'La contraseña debe tener un largo de 8 caracteres o más.'
            })
        };
        // Revisar correo
        const exist = await User.findOne({username}); //busca si el nombre de usuario está en la BDD

        if(!username){
            return res.json({
                error: 'Se requiere un nombre de usuario para el registro.'
            })
        }
        else if(exist){
            return res.json({
                error: 'Ya existe una cuenta ingresada con este nombre de usuario.'
            })
        }
        const hashedPassword = await hashPassword(password); 
        const user = await User.create({
            name, 
            username, 
            password: hashedPassword,
            accType
        });

        return res.json(user);

    } catch (error){
        console.log(error)
    }
}
//endpoint del login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ error: 'No se encuentra el usuario.' });

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign({ username: user.username, id: user._id, name: user.name, accType: user.accType }, process.env.JWT_SECRET, {}, (error, token) => {
        if (error) throw error;
        res.cookie('token', token).json(user);
      });
    } else {
      res.json({ error: 'Contraseña incorrecta.' });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req,res) =>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,{},(err,user) =>{
            if(err) throw err;
            res.json(user);
        })
    }
    else{
        res.json(null);
    }
}

const logoutUser = (req,res) => {
    res.cookie('token', '', { expires: new Date(0) }).json({ message: 'Sesión cerrada.' });
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}