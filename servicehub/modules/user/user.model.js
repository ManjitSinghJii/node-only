import { Schema, model} from "mongoose"
import bcrypt from "bcryptjs"
import { USER_ROLES, USER_STATUS } from "./user.constants.js"

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // security
    },

    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER,
        index: true
    },

    status: {
        type: String,
        enum: Object.values(USER_STATUS),
        default: USER_STATUS.ACTIVE,
        index: true
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    }
}, 
{
    timestamps: true,
    versionKey: false
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = model("User", userSchema);
