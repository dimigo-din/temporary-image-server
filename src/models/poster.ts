import mongoose, { Document, Schema } from "mongoose";

export interface IPoster {
  title: string;
  url: string;
}

export type TPoster = IPoster & Document;

const PosterSchema = new Schema({
  title: { type: String, required: false },
  url: { type: String, required: true },
});

const Poster = mongoose.model<TPoster>('poster', PosterSchema);

export default Poster;
