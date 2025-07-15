import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required: true
        },
        lastName : {
            type : String,
            required: true
        },
        email : {
            type : String,
            required: true,
            unique : true,
        },
        password : {
            type : String,
            required: true,
        },
        phoneNumber : {
            type : String,
            default: "NOT GIVEN",
        },
        isBlocked : {
            type : Boolean,
            default : false,
        },
        role : {
            type : String,
            default: "USER",
        },
        isEmailVerified : {
            type : String,
            default: false
        },
        image: {
            type : String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Ddefault&psig=AOvVaw0nvdE3D3CYp6u8dEp9snfC&ust=1752593691877000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjpu7bWvI4DFQAAAAAdAAAAABAE"
        },
    }
)

const User = mongoose.model("user", userSchema)

export default User