import { getUsers } from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
    try {
        const { active } = req.body;

        const results = await getUsers({ active });
        return res.json({
            status: 200,
            message: "Success",
            data: results.data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}