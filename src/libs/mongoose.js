import mongoose from "mongoose";

const connection = async () => {
   try {
    if(mongoose.connections[0].readyState) return
    const rep = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connexion réussi à la db ${rep.connection.name}`);
   } catch (error) {
    console.error("Erreur lors de la connexion à la bd", error.message)
   }
}

export default connection