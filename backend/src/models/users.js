const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (val)=>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message: 'Email is not valid'
        },
        lowercase: true
    },
    phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: 10,
            maxlength: 15,
            validate: {
                validator: (val)=> 
                /^(\+\d{1,3}[- ]?)?\d{10,15}$/.test(val),
                message: 'Phone number is not valid'   }
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
},
{timestamps: true,
    // tokens:[{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
})
UserSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
       return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
})
UserSchema.methods.comparePassword = async function (candidatePassword)
{
    try{
        return await bcrypt.compare(candidatePassword, this.password)
    }
    catch(error)
    {
        throw new Error(error)
    }
}
const User = mongoose.model("User", UserSchema)
module.exports = User;