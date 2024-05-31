import mongoose from 'mongoose';


export const mongooseObjectId = (objectId: string) => {
    return new mongoose.Types.ObjectId(objectId)
}