import { protectedRoute } from "@/middlewares/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const authResponse = await protectedRoute(req)
        if(authResponse) {
            return authResponse
        }

        const cookieStore = await cookies()
        cookieStore.delete("auth_token")

        return NextResponse.json({
            message: "Déconnexion réussie.", 
            success: true, 
            error: false
        }, { status: 200 })

        
    } catch (error) {
        console.error("Erreur lors de la déconnexion de l'utilisateur: ", error)
        return NextResponse.json({
            message: "Erreur! Veuillez réessayer.", 
            success: false, 
            error: true
        }, { status: 500 })
    }
}