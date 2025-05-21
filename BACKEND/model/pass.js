import mongoose from "mongoose";

const PassSchema = new mongoose.Schema({
    siteUrl: String,
    username: String,
    password: String,
    id: String,
})

export const Pass = mongoose.model('Pass', PassSchema)