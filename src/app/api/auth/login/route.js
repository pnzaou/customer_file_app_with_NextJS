import connection  from "@/libs/mongoose"
import User from "@/models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { generateToken } from "@/libs/jwtauth"


export const POST = async (req) => {
    try {
        await connection()

        const { email, password } = await req.json()

        if(!email || !password) {
            return NextResponse.json({ 
                message: "Tous les champs sont obligatoires.", 
                success: false, 
                error: true 
            }, { status: 400 })
        }
        
        const user = await User.findOne({ email })

        if(!user) {
            return NextResponse.json({ 
                message: "Email ou mot de passe incorrect.", 
                success: false, 
                error: true 
            }, { status: 401 })
        }
        
        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword) {
            return NextResponse.json({ 
                message: "Email ou mot de passe incorrect.", 
                success: false, 
                error: true 
            }, { status: 401 })
        }

        const token = await generateToken(user)

        const res = NextResponse.json({
            message: "Connexion réussie.", 
            auth_token: token, 
            success: true, 
            error: false
        }, { status: 200 })

        res.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        })

        return res

    } catch (error) {
        console.error("Erreur pendant l'authentification' de l'utilisateur: ", error)
        return NextResponse.json({ 
            message: "Erreur! Veuillez réessayer.", 
            success: false, 
            error: true 
        }, { status: 500 })
    }
}

export const GET = async (req) => {}