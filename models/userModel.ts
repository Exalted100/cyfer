import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    notes: [{
        title: String,
        note: String,
        password: String,
        dateCreated: Date,
        id: Number
    }],
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    }
})

export default mongoose.models.Users || mongoose.model("Users", userSchema)