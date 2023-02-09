import jwt from "jsonwebtoken"

export const sign = (payload: any): string => jwt.sign(payload, "qwert12345")
