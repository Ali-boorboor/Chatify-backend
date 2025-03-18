import schema from "#src/schemas/folders.schema";
import mongoose from "mongoose";

const FolderModel = mongoose.model("Folders", schema);

export default FolderModel;
