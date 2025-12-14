import { v4 as uuidv4 } from 'uuid';

let users = [
    { id: uuidv4(), firstname: 'John', lastName: 'Doe', age: 30 },
    { id: uuidv4(), firstname: 'Jane', lastName: 'Smith', age: 25 }
];

export const getAllUsers = (req, res) => {
    res.json(users);
};

export const createUser = (req, res) => {
    const body = req.body || {};
    const isEmpty = Object.keys(body).length === 0;
    const newUser = isEmpty
        ? { id: uuidv4(), firstname: 'Anonymous', lastName: 'User', age: null }
        : { id: uuidv4(), ...body };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const getUser = (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const prevLen = users.length;
    users = users.filter((u) => u.id !== id);
    if (users.length === prevLen) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstname, lastName, age } = req.body || {};
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (firstname !== undefined) user.firstname = firstname;
    if (lastName !== undefined) user.lastName = lastName;
    if (age !== undefined) user.age = age;
    res.json(user);
};

export const putUser = (req, res) => {
    const { id } = req.params;
    const body = req.body || {};
    // require full replacement body: firstname and lastName at minimum
    if (!body.firstname || !body.lastName) {
        return res.status(400).json({ error: 'firstname and lastName are required for PUT' });
    }
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    const replaced = { id, firstname: body.firstname, lastName: body.lastName, age: body.age ?? null };
    users[index] = replaced;
    res.json(replaced);
};