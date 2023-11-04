const User = require('../models/User.js')

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

const getUserPreferences = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const preferences = user.preferences;
    res.status(200).json(preferences);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserConnections = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      const connections = await Promise.all(
        user.connections.map((id) => User.findById(id))
      );
      const formattedFriends = connections.map(
        ({ _id, firstname, lastname, location, picturePath }) => {
          return { _id, firstname, lastname, location, picturePath };
        }
      );
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

const addRemoveConnection = async (req, res) => {
    try {
        const {id, connectionId} = req.params;
        const user = await User.findById(id);
        const connection = await User.findById(connectionId);
        if (user.connections.includes(connectionId)) {
            user.connections = user.connections.filter((id) => id !== connectionId);
            connection.connections = connection.connections.filter((id) => id !== id);
        } else {
            user.connections.push(connectionId)
            connection.connections.push(id)
        }
        await user.save()
        await connection.save()

      const connections = await Promise.all(
        user.connections.map((id) => User.findById(id))
      );
      const formattedConnections = connections.map(
        ({ _id, firstname, lastname, location, picturePath }) => {
          return { _id, firstname, lastname, location, picturePath };
        }
      );

          res.status(200).json(formattedConnections);
    } catch (err) {
        res.status(404).json({error: err.message})
    }  
}

const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = {
    getUser,
    getUserConnections,
    getUserPreferences,
    addRemoveConnection,
    getUsers,
}