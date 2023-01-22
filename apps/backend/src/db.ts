import mongoose from 'mongoose';

const dbName = 'NotesAppDb'

const url = `mongodb+srv://petrashchuk_andrii:Vito9550@cluster0.fvywc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// todo


export const connectDb = ()=>{
    return  mongoose.connect(url,{}).then(() => console.log('Connected!'));
}
