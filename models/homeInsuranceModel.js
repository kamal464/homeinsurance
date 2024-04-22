import mongoose from "mongoose";

const homeInsuranceSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User" // Assuming "User" is the name of your user model
        },
        policyHolderName: {
            type: String,
            required: [true, "Please enter the policy holder's name"]
        },
        propertyAddress: {
            type: String,
            required: [true, "Please enter the property address"]
        },
        coverageType: {
            type: String,
            required: [true, "Please enter the coverage type"]
        },
        premiumAmount: {
            type: Number,
            required: [true, "Please enter the premium amount"]
        },
        filename: {
            type: String,
            required: [true, "Please enter the filename"]
        },
        // image: {
        //     data: Buffer, 
        //     contentType: {
        //         type: String,
        //         required: true
        //     }
        // }
    },
    {
        timestamps: true
    }
);


const HomeInsurance = mongoose.model('HomeInsurance', homeInsuranceSchema);

export default HomeInsurance;
