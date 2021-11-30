const boom = require("boom");

const Owner = require("../models/Owner");

// Get all owners
exports.getOwners = async () => {
  try {
    const crafts = Owner.find();
    return crafts;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Get a single owner
exports.getOwnerById = async (request) => {
  try {
    const id = request.params === undefined ? request.id : request.params.id;
    console.log(id);
    const owner = await Owner.findOne({ _id: id });
    return owner;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Add an owner
exports.addOwner = (request) => {
  try {
    const owner = new Owner(request.body);
    return owner.save();
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Update a single owner
exports.updateOwner = async (request, reply) => {
  try {
    const update = await Owner.findOneAndUpdate(
      { _id: request.params.id },
      request.body
    );
    return update;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Delete a single owner
exports.deleteOwner = async (request, reply) => {
  try {
    const owner = await Owner.findOneAndRemove({ _id: request.params.id });
    return owner;
  } catch (error) {
    throw boom.boomify(error);
  }
};
