const boom = require("boom");

const Craft = require("../models/Craft");
const Owner = require("../models/Owner");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Get all crafts
exports.getCrafts = async (request, reply) => {
  try {
    const offset =
      request.query === undefined ? request.offset : request.query.offset;
    const result = await Craft.paginate({}, { offset, limit: 20 });
    result.docs = await result.docs.map(async (craft) => {
      craft.owner = await Owner.findOne({
        _id: craft.owner_id,
      });
      return craft;
    });
    return result;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Get craft by id
exports.getCraftById = async (request, reply) => {
  try {
    const id = request.params === undefined ? request.id : request.params.id;
    const craft = await Craft.findById(id);
    return craft;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Add a new craft
exports.addCraft = async (request, reply) => {
  try {
    const craft = new Craft(request.body);
    return craft.save();
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Update an existing craft
exports.updateCraft = async (request, reply) => {
  try {
    const id = request.params ? request.params.id : request.id;
    const fields = request.body ? request.body : request;
    const update = await Craft.findByIdAndUpdate(id, fields, { new: true });
    return update;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Delete an existing craft
exports.deleteCraft = async (request, reply) => {
  try {
    const craft = await Craft.findByIdAndRemove(request.params.id);
    return craft;
  } catch (error) {
    throw boom.boomify(error);
  }
};

exports.getCraftsByOwnerId = async (request, reply) => {
  try {
    const id = request.params === undefined ? request.id : request.params.id;
    const crafts = await Craft.find({ owner_id: ObjectId(id) });
    return crafts;
  } catch (error) {
    throw boom.boomify(error);
  }
};
