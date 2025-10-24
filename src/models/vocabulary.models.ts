import mongoose, { mongo, Schema } from "mongoose";
import { IVocabulary } from "../interfaces/vocabulary.interfaces";

const vocabularySchema = new Schema<IVocabulary>({
    _id: { type: String },
    trad: { type: String, required: true },
    simp: { type: String, required: true },
    pinyin: { type: String, required: true },
    meaning: { type: String, required: true },
});

const VocabularyModel = mongoose.model<IVocabulary>("Vocabulary", vocabularySchema);

export default VocabularyModel;