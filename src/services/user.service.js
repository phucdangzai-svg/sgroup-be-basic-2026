import { getAllUsersFromDB } from "../repositories/mock.data.js";
import { filterActiveUsers, formatUsers } from "../utils/user.utils.js";

// get all users
export const getUsers = async ({ active = true }) => {
    try {
        let users = await getAllUsersFromDB();

        if (active) {
            users = filterActiveUsers(users);
        }

        const formatted = formatUsers(users);

        return {
            data: formatted
        }

    } catch (error) {
        console.error('[getUsers]: ', error.message);
        throw error;
    }
}
