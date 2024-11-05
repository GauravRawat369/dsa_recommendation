import mongoose from "mongoose";
const solvedQuestionSchema = new mongoose.Schema({
    questionId: { type: Number, required: true },
    attempts: { type: Number, required: true },
    topic: { type: String, required: true },
})
const userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    solvedQuestions: [solvedQuestionSchema],
    totalSolved: {
      type: Map,
      of: Number
    },
    weakAreas: {
      type: Map,
      of: Number
    }
  });
const UserModel = mongoose.model("UserData",userSchema);
export default UserModel;