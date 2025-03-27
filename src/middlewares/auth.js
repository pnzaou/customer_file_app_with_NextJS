import { verifyToken } from "@/libs/jwtauth"
import { NextResponse } from "next/server"

export const protectedRoute = async (req) => {
    try {
        let token = req.cookies.get("auth_token")?.value

        if(!token) {
            const authHeader = req.headers.get("Authorization")
            if(authHeader) {
                token = authHeader
            }
        }

        if(!token) {
            return NextResponse.json({ message: "Accès refusé", success: false, error: true }, { status: 401 })
        }

        const decode = await verifyToken(token)

        if(!decode) {
            return NextResponse.json({ message: "Token invalid", success: false, error: true }, { status: 403 })
        }
        req.authData = decode 

        return null

    } catch (error) {

        console.error("Erreur pendant la vérification du token: ", error)
        return NextResponse.json({ message: "Erreur! Veuillez réessayer.", success: false, error: true }, { status: 500 })

    }
}