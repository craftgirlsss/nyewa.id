const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please enter your name"]
        },
        email: {
            type: String,
            require: [true, "Please enter your email address"]
        },
        password: {
            type: String,
            require: [true, "Please enter your password"]
        }
    },
    {
        timestamps: true
    }
)

UserSchema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object
})

const UserData = mongoose.model("User-Auth", UserSchema)

module.exports = UserData