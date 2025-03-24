import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    bien_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bien", required: true },
    type_bien: { type: String, enum: ["véhicule", "immobilier"], required: true },
    date_debut: { type: Date, required: true },
    date_fin: { type: Date, required: true },
    prix_total: { type: Number, required: true },
    statut: { type: String, enum: ["validé", "en cours", "terminée"], default: "en cours" }
}, { timestamps: true })

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema)
export default Location
