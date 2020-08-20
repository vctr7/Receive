import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const saltRound = 10;
// const salt = bcrypt.genSaltSync(saltRound);


const UserSchema = new Schema({
    userId: { 
        type:String, 
        default: "",
    },
    username: {
        type:String,
    },
    hashedPassword: String,
    birthday: {
        type:Date,
    },
    emailAddress: {
        type: String,
    },
    homeAddress: {
        type:String,
    },
    phoneNumber: {
        type: String,
    },
    cellphoneNumber:  {
        type: String,
    },
    SHILLA: [
        { 
            id: String,
            password: String,
        },
    ],
    LOTTE: [
        { 
            id: String,
            password: String,
        }
    ],
    SHINSEGAE: [
        { 
            id: String,
            password: String,
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    // const hash = await bcrypt.hash(password, salt);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.methods.setDuty = async function(silla, lotte, shinsegae){
    this.SHILLA = silla;
    this.LOTTE = lotte;
    this.SHINSEGAE = shinsegae;
}

UserSchema.statics.findByUserId = function(userId){
    return this.findOne({userId});
};

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function(){
    const token = jwt.sign(
        {
            _id: this.id,
            userId: this.userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
};

const User = mongoose.model('User', UserSchema);
export default User;