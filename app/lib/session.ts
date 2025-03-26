import {SignJWT , jwtVerify} from "jose"

const secret_key = process.env.SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secret_key)

type SessionPayLoad = {
    userId: string  
    expiresAt: Date
}

export async function encrypt(payload: SessionPayLoad){
    return new SignJWT(payload)
                .setProtectedHeader({alg:"HS256"})
                .setIssuedAt()
                .setExpirationTime("7d")
                .sign(encodedKey)
}

export async function decrypt(session: string | undefined = ""){
    try{
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"]
        }) 
        return payload 
    } catch(err){
        console.log("Falied to Verify Session")
    }
}
