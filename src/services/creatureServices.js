const Creature = require("../models/Creature");
const User = require("../models/User");

exports.create = (creatureData) => Creature.create(creatureData);

exports.getAll = () => Creature.find();

exports.getOneCreature = (creatureId) =>
  Creature.findById(creatureId).populate(["owner", "votes"]);

exports.deleteCreature = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.update = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);

exports.getMyCreatures = (userId) =>
  Creature.find({ owner: userId }).populate("owner");

exports.addVotes = async (creatureId, userId) => {
  const creature = await this.getOneCreature(creatureId);
  //const emailUser = await User.findById(userId);
  const votedUser = creature.votes.find((v) => v.toString() === userId);
 if(votedUser){
  return
 }
  creature.votes.push(userId);
  return creature.save();
};
