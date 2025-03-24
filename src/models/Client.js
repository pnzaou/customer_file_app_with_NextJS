import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    tel: {type: String, required: true, unique: true},
    locations: [
        {
            bien_id: {type: mongoose.Schema.Types.ObjectId, ref: "Bien"},
            type: {type: String, enum: ["véhicule", "immobilier"], required: true},
            date_debut: { type: Date, required: true },
            date_fin: { type: Date, required: true },
            prix_total: { type: Number, required: true },
        }
    ]
},{ timestamps: true })

const Client = mongoose.models.Client || mongoose.model("client", clientSchema)
export default Client
