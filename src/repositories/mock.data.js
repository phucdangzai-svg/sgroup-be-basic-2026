const MOCK_USERS = [
  { id: 1, full_name: 'Nguyen Van An', email: 'an@gmail.com', role: 'admin', is_active: true, password_hash: '$2b$10$abc...' },
  { id: 2, full_name: 'Tran Thi Binh', email: 'binh@gmail.com', role: 'user', is_active: true, password_hash: '$2b$10$def...' },
  { id: 3, full_name: 'Le Van Cuong', email: 'cuong@gmail.com', role: 'user', is_active: false, password_hash: '$2b$10$ghi...' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllUsersFromDB = async () => {
  await delay(1000);
  return [...MOCK_USERS];
}

export const getUserByIdFromDB = async (id) => {
    await delay(200);
    return MOCK_USERS.find((u) => u.id === id) ?? null;
}
