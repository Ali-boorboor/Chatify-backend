import schema from "#schema/medias.schema";
import mongoose from "mongoose";

const MediaModel = mongoose.model("Medias", schema);

export default MediaModel;
