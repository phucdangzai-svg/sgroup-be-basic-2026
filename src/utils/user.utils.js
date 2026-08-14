export const formatUser = ({ id, full_name, email, role, is_active }) => ({
    id,
    fullName: full_name,
    email,
    role,
    isActive: is_active
})

export const formatUsers = (users) => users.map(formatUser);

// filter users active
export const filterActiveUsers = (users) => users.filter((u) => u.is_active === true);
