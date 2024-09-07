import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

// currently allowing multiple posts in case he is selling the same type of item.
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    //anytime we create JSON formatted data, transform user doc to following for security
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//pre is build-in mongoose that runs before funcion 'save'
userSchema.pre('save', async function () {
  // Check if password has been created or modified
  if (!this.isModified('password')) {
    return;
  }
  //if the password is modified, hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

//schema has property: 'method', custom define 'comparePassword'
userSchema.methods.comparePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password);
  return isMatch;
};

userSchema.methods.createJwt = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const User = mongoose.model('User', userSchema);
export { User };
