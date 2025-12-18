import {Schema ,model} from "mongoose";

const vendorProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true,
    },

    businessName: {
        type: String,
        required: true,
        trim: true,
    },

    servicesOffered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
        }
    ],

    isApproved: {
        type: Boolean,
        default: false,
        index: true,
    },

    rating: {
        type: Number,
        default: 0,
    },
}, {timestamps: true, versionKey: false,});

export const VendorProfileModel = model("VendorProfile", vendorProfileSchema)