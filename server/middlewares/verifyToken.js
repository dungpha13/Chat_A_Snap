import jwt from "jsonwebtoken"
import { createError } from "../common/error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return next(createError(401, "You are not authorized!"))
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return next(createError(400, "Token is not valid!"))
        }
        req.user = user
        next()
    })
}

// export const verifyUser = (req, res, next) => {
//     if (req.user.id === parseInt(req.params.id)) {
//         return next()
//     }
//     next(createError(403, "You do not have permission"))
// }