const users = [];
const addUser = (id, name, room) => {
  name = name.toLowerCase();
  room = room.toLowerCase();
  const userExist = users.find(
    (user) => user.room === room && user.name === name,
  );
  if (userExist) return { error: "user already Exist" };

  const user = { id, name, room };
  users.push(user);
  return { user, error: null };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1);
};
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
