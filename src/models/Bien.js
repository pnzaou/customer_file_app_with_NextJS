import mongoose from "mongoose";

const bienSchema = new mongoose.Schema({
    type: { type: String, enum: ["véhicule", "immobilier"], required: true },
    nom: { type: String, required: true },
    disponible: { type: Boolean, default: true },
    localisation: { type: String }
},{ timestamps: true })

const Bien = mongoose.models.Bien || mongoose.model("Bien", bienSchema)
export default Bien
