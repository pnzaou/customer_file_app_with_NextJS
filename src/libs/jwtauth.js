import {promises as fs} from "fs"
import path from "path"
import jwt from "jsonwebtoken"

const privateKeyPath = path.resolve(process.cwd(), 'src', '.meow', 'meowPr.pem');
const publicKeyPath = path.resolve(process.cwd(), 'src', '.meow', 'meowPu.pem');

async function loadKeys() {
    try {
      const privateKey = await fs.readFile(privateKeyPath, 'utf-8');
      const publicKey = await fs.readFile(publicKeyPath, 'utf-8');
      return { privateKey, publicKey };
    } catch (error) {
      console.error('Erreur lors du chargement des clés:', error);
      return null;
    }
}

export const generateToken = async (user) => {
    const keys = await loadKeys()
    if (!keys) throw new Error("Impossible de charger les clés")
    
    return jwt.sign(
        {id: user._id, role: user.role},
        keys.privateKey,
        {
            algorithm: 'RS256',
            expiresIn: '1h'
        }
    )
}


export const verifyToken = async (token) => {
    const keys = await loadKeys()
    if (!keys) throw new Error("Impossible de charger les clés")

    try {
        return jwt.verify(token, keys.publicKey, {
            algorithms: ['RS256']
        })
    } catch (error) {
        console.error('Erreur de vérification du token:', error);
        return null;
    }
}