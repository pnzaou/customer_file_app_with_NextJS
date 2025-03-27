import connection from "@/libs/mongoose"
import { protectedRoute } from "@/middlewares/auth"
import Bien from "@/models/Bien"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const authResponse = await protectedRoute(req)
        if(authResponse) {
            return authResponse
        }

        await connection()

        const {nom, type} = await req.json()
        if(!nom || !type) {
            return NextResponse.json({ 
                message: "Tous les champs sont obligatoires.", 
                success: false, 
                error: true 
            }, { status: 400 })
        }

        if(type !== "véhicule" && type !== "immobilier") {
            return NextResponse.json({ 
                message: "Le type de bien n'est pas valid.", 
                success: false, 
                error: true 
            }, { status: 400 })
        }

        const newBien = await Bien.create({ nom, type })

        return NextResponse.json({ 
            message: "Bien enregistré avec succès", 
            data: newBien, 
            success: true, 
            error: false 
        }, { status: 201 })

    } catch (error) {
        console.error("Erreur pendant la création d'un bien: ", error)
        return NextResponse.json({ 
            message: "Erreur! Veuillez réessayer", 
            success: false, 
            error: true 
        }, {status: 500})
    }
}

export const GET = async (req) => {
    try {
        const authResponse = await protectedRoute(req)
        if(authResponse) {
            return authResponse
        }

        await connection()

        const biens = await Bien.find()

        const message = biens.length === 0 
        ? "Aucun bien enregistré. Veuillez en rejouter." 
        : "Biens récupérés avec succès."

        return NextResponse.json({ 
            message,
            data: biens,
            success: true,
            error: false
        }, { status: 200 })

    } catch (error) {
        console.error("Erreur lors de la récupération des données", error)
        return NextResponse.json({
            message: "Erreur! Veuillez réessayer.",
            success: false,
            error: true
        }, { status: 500 })
    }
}