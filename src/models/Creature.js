const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    unique: true,
  },
  species: {
    type: String,
    required: true,
    minLength: 3,
  },
  skinColor: {
    type: String,
    required: true,
    minLength: 3,
  },
  eyeColor: {
    type: String,
    required: true,
    minLength: 3,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const urlRegex = [
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
          "Provide valid creature image link!",
        ];
        return urlRegex.test(value);
      },
      message: "Invalid image URL",
    },
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 500,
  },
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});



const Creature = mongoose.model("Creature", creatureSchema);
module.exports = Creature;
