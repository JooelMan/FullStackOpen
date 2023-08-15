const User = require('../models/user')

const initialUsers = [
  {
    username: "user1",
    name: "name1",
    passwordHash: "1231asdfawEEFSDFAW23"
  },
  {
    username: "EWD",
    name: "Edsger W. Dijkstra",
    passwordHash: "12313asdfawefawefasdfr"
  }  
]

const userWithoutUsername = {
  username: "",
  name: "Edgar",
  password: "12313asdfawefawefasdfr"
}

const userWithoutUniqueUsername = {
  username: "EWD",
  name: "Edsger",
  password: "12313asdfawefawefasdfr"
}

const userWithoutName = {
  username: "E123Dfk",
  name: "",
  password: "12313asdfawefawefasdfr"
}

const userWithoutPassword = {
  username: "EWD123",
  name: "Edsger W. Dijkstra",
  password: ""
}

const userWithTooShortPassword = {
  username: "EWD1234",
  name: "Edsger W. Dijkstra",
  password: "123"
}

const removeUsers = async () => {
  await User.findByIdAndRemove({})
}

module.exports = {
  removeUsers, initialUsers, userWithoutUsername, userWithoutUniqueUsername, userWithoutName, userWithoutPassword, userWithTooShortPassword
}