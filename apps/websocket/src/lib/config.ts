import "dotenv/config"





export const PORT = parseInt(process.env.PORT!) || 3002;
export const JWT_SECRET = process.env.JWT_SECRET as string