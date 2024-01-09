const router = require("express").Router();
const creatureServices = require("../services/creatureServices");
const {isAuth }= require("../middlewares/authMiddlewares");
const {extractErrorMsgs} = require("../utils/errorHandler")

router.get("/all", async (req, res) => {
  const creatures = await creatureServices.getAll().lean();

  res.render("post/all-posts", { creatures });
});

router.get("/create",isAuth, (req, res) => {
  res.render("post/create");
});

router.post("/create", async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };

  try {
    await creatureServices.create(payload);
    res.redirect("/posts/all");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages });
  }
  

});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;
  const myCreatures = await creatureServices.getMyCreatures(user?._id).lean();

  res.render("post/my-posts", { myCreatures });
});

router.get("/details/:creatureId", async (req, res) => {
  const { creatureId } = req.params;
  const creature = await creatureServices.getOneCreature(creatureId).lean();
  //const user = req.user ? true : false;
  const user = req.user || null;
  const isVoted = creature.votes?.some((v) => v?._id.toString() === user?._id);

  const emailsOwners = creature.votes.map((v) => v?.email).join(", ");

  const isCreator = req.user?._id == creature.owner?._id;
  res.render("post/details", {
    ...creature,
    user,
    isCreator,
    isVoted,
    emailsOwners,
  });
});

router.get("/:creatureId/delete", async (req, res) => {
  const { creatureId } = req.params;
  console.log(creatureId);
  await creatureServices.deleteCreature(creatureId);
  res.redirect("/posts/all");
});

router.get("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;
  const creature = await creatureServices.getOneCreature(creatureId).lean();
  res.render("post/edit", { ...creature });
});

router.post("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };
  await creatureServices.update(creatureId, payload);
  res.redirect(`/posts/details/${creatureId}`);
});

router.get("/:creatureId/vote", async (req, res) => {
  const { creatureId } = req.params;
  const { _id } = req.user;

  await creatureServices.addVotes(creatureId, _id);
  res.redirect(`/posts/details/${creatureId}`);
});

module.exports = router;
