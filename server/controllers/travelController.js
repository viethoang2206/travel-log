const { json } = require("express");
const Travel = require("../model/travel");

exports.getTravel = async (req, res) => {
  const { id } = req.params;

  const travel = await Travel.find({ user: id }).catch((err) => {
    res.status(404).json({
      success: false,
    });
  });
  res.json({ success: true, travel });
};
exports.getAllTravel = async (req, res) => {
  const travel = await Travel.find().catch((err) => {
    res.status(404).json({
      success: false,
    });
  });
  res.json({ success: true, travel });
};
exports.createTravel = async (req, res) => {
  const { creator, title, message, tags, selectedFile } = req.body;
  const newTravel = await Travel.create({
    user: req.user.id,
    creator,
    title,
    message,
    tags,
    selectedFile,
  }).catch((err) => {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const errorObj = {};
    keys.map((key) => {
      errorObj[key] = errors[key].message;
    });

    res.status(400).json({
      success: false,
      errors: errorObj,
    });
  });
  res.status(201).json({
    success: true,
    newTravel,
  });
};

exports.editTravel = async (req, res) => {
  const { id } = req.params;
  const { title, message, tags, selectedFile } = req.body;
  const travel = Travel.find({ _id: id });
  Travel.findByIdAndUpdate({ _id: id }, { title, message, tags }).catch(
    (err) => {
      res.status(400).json({
        success: false,
        message: "cant update",
      });
    }
  );
  res.json({
    success: true,
    message: travel,
  });
};
exports.deleteTravel = async (req, res) => {
  const { id } = req.params;
  Travel.findByIdAndDelete({ _id: id }).catch((err) => {
    json.status(400).json({
      success: false,
      message: "cant delete",
    });
  });
  res.json({
    success: true,
    message: "delete successfully",
  });
};
exports.updateTravel = async (req, res) => {
  const { id } = req.params;
  const { creator, title, message, tag } = req.body;
  const travel = await Travel.findByIdAndUpdate(
    { _id: id },
    { creator, title, message, tags: tag }
  ).catch((err) => {
    return res.status(404).json({
      success: false,
      mess: "can't update item",
    });
  });
  res.json({
    success: true,
    message: travel,
  });
};
exports.updateCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;
  Travel.findByIdAndUpdate({ _id: id }, { likeCount: count }).catch((err) => [
    res.status(404).json({
      success: fail,
      message: "cant update",
    }),
  ]);
  res.json({
    success: true,
    message: "item has been updated",
  });
};
exports.findTitle = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const title = new RegExp(searchQuery, "i");
  const post = await Travel.find({
    $or: [{ title: title }, { tags: { $in: tags.split(",") } }],
  }).catch((err) => {
    res.status(404).json({
      success: false,
      message: "Post does not exist",
    });
  });

  res.json({
    success: true,
    message: post,
  });
};
exports.findSinglePost = async (req, res) => {
  const { id } = req.params;
  const post = await Travel.find({ _id: id }).catch((err) => {
    res.status(404).json({
      success: false,
      message: "can not find post",
    });
  });
  res.json({
    success: true,
    message: post,
  });
};
