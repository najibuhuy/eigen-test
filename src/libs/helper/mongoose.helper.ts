import mongoose from 'mongoose';


export const mongooseObjectId = (objectId: string) => {
    return new mongoose.Types.ObjectId(objectId)
}

export const dateToString = (date: Date) => {
    return date.toDateString()
}