import connection from "@/libs/mongoose"
import { protectedRoute } from "@/middlewares/auth"
import Bien from "@/models/Bien"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        const authResponse = await protectedRoute(req)
        if(authResponse) {
            return authResponse
        }

        await connection()
        const { id } = await params 

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ 
                message: "Veuillez fournir un ID valide", 
                success: false, 
                error: true 
            }, { status: 400 })
        }

        const bien = await Bien.findById(id)

        if(!bien) {
            return NextResponse.json({ 
                message: "Aucun bien ne correspond à cet ID", 
                success: false, 
                error: true 
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "Bien récupéré qvec succès.",
            data: bien, 
            success: true, 
            error: false
        }, { status: 200 })
    } catch (error) {
        console.error("Erreur lors de la récupération du bien: ", error)
        return NextResponse.json({ 
            message: "Erreur! Veuillez réessayer.", 
            success: false, 
            error: true 
        }, { status: 500 })
    }
}

export const PUT = async (req, {params}) => {
    try {
        const authResponse = await protectedRoute(req)
        if(authResponse) {
            return authResponse
        }
        await connection()
        const { id } = await params

        const {nom, type} = await req.json()

        if(!nom && !type) {
            return NextResponse.json({
                message: "Veuillez remplir au moins un champ",
                success: false,
                error: true
            }, { status: 400 })
        }

        if(type) {
            if(type !== "véhicule" && type !== "immobilier") {
                return NextResponse.json({ 
                    message: "Le type de bien n'est pas valid.", 
                    success: false, 
                    error: true 
                }, { status: 400 })
            }
        }

        const updatedFields = {}
        if(nom) updatedFields.nom = nom;
        if(type) updatedFields.type = type;

        const updatedBien = await Bien.findByIdAndUpdate(id, { $set: updatedFields}, { new: true })

        if (!updatedBien) {
            return NextResponse.json({
                message: "Aucun bien trouvé avec cet ID",
                success: false,
                error: true
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Bien modifié avec succès.",
            data: updatedBien,
            success: true,
            error: false
        }, { status: 200 })

    } catch (error) {
        console.error("Erreur lors de la modification du bien: ", error)
        return NextResponse.json({ 
            message: "Erreur! Veuillez réessayer.", 
            success: false, 
            error: true 
        }, { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        const authResponse = await protectedRoute(req);
        if (authResponse) return authResponse;

        await connection();
        const { id } = await params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                message: "Veuillez fournir un ID valide",
                success: false,
                error: true
            }, { status: 400 });
        }

        const deletedBien = await Bien.findByIdAndDelete(id);

        if (!deletedBien) {
            return NextResponse.json({
                message: "Aucun bien trouvé avec cet ID",
                success: false,
                error: true
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Bien supprimé avec succès",
            success: true,
            error: false
        }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la suppression du bien:", error);
        return NextResponse.json({
            message: "Erreur! Veuillez réessayer.",
            success: false,
            error: true
        }, { status: 500 });
    }
}