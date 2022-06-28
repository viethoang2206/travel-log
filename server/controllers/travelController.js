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
  const user = Travel.find({ _id: id });
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
    message: "updated",
  });
};
exports.deleteTravel = async (req, res) => {
  const { id } = req.params;
  console.log(id);
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
  const { creator, title, message, tags } = req.body;
  await Travel.findByIdAndUpdate(
    { _id: id },
    { creator, title, message, tags }
  ).catch((err) => {
    return res.status(404).json({
      success: false,
      mess: "can't update item",
    });
  });
  res.json({
    success: true,
    mess: "item has been updated",
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
  const { searchQuery } = req.query;
  const post = await Travel.find({ title: searchQuery }).catch((err) => {
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
