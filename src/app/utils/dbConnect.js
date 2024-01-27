import mongoose from "mongoose";

export default function dbConnect() {
    const uri = "mongodb+srv://amitdev244245:amit244246@crud-nextjs-14.i3dx6lj.mongodb.net/crud";
    mongoose.connect(uri)
        .then(() => { console.log(`Database Connected`) })
        .catch(() => { console.log(`Database Error: No Connection`) })
}