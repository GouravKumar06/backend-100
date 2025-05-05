import mongoose, { Schema,Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    age: number;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
    password: String,
    age: Number,
    createdAt: Date
})


export const User = mongoose.model<IUser>('User', userSchema);

