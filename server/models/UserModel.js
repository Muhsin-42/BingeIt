const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:20,
        unique:true
    },
    name:{
        type: String,
        required: true,
        min:3,
        max:20
    },
    email:{
        type: String,
        required: true,
        unique : true,
        max: 50
    },
    phone:{
        type: String,
        required: true,
        unique : true,
        max: 12
    },
    password:{
        type: String,
        required: true,
        min:3
    },
    profilePicture:{
        type:String,
        default: ''
    },
    coverPicture:{
        type:String,
        default: ''
    },
    followers:{
        type: Array,
        default : []
    },
    following:{
        type: Array,
        default : []
    },
    description:{
        type: String,
        default: '',
        max:1000
    },
    wishlist:{
        type:Array,
        default: []
    },
    watched:{
        type:Array,
        default: []
    },
    favourite:{
        type:Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    verified:{
        type: Boolean,
        default: false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{timestamps:true}
)
UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("users", UserSchema);


const validate = (data) => {
    const schema = Joi.object({
		username: Joi.string().required().label("username"),
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		phone: Joi.string().required().label("phone"),
		password: passwordComplexity().required().label("password"),
	});
	return schema.validate(data);
};



module.exports = { User, validate };