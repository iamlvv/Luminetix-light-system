const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notification: {
      type: [
        {
          name: {
            type: String
          },
          read: {
            type: Boolean,
            default: false
          },
          type: {
            type: String, //alert or context
            require: true
          },
          created_date: {
            type: Date,
            default: Date.now,
            required: true,
          },
          message: {
            type: String, // String hoặc Object từ deviceModel?
            required: true,
          },
        }
      ]
    }
  },
  {
    timestamps: true,
  },
  
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
