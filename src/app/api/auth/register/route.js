import connection from "@/libs/mongoose"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { NextResponse } from "next/server"

export const POST = async (req) => {  
    try {
        await connection()
        const { nom, prenom, email, password } = await req.json()

        if(!nom || !prenom || !email || !password) {
            return NextResponse.json({ message: "Tous les champs sont obligatoires.", success: false, error: true }, { status: 400 })
        }

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return NextResponse.json({ message: "Cet email est déjà utilisé.", success: false, error: true }, { status: 400 });
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
        })

        return NextResponse.json(
            {message:"Utilisateur créé avec succès", newUser, success: true, error: false},
            { status: 201 }
        )

    } catch (error) {
        console.error("Erreur pendant la création de l'utilisateur: ", error)
        return NextResponse.json({ message: "Erreur! Veuillez réessayer.", success: false, error: true }, { status: 500 })
    }
}