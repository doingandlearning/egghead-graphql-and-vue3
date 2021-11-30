const craftController = require("../controllers/craftController");
const ownerController = require("../controllers/ownerController");

const routes = [
  {
    method: "GET",
    url: "/api/crafts",
    handler: craftController.getCrafts,
  },
  {
    method: "GET",
    url: "/api/crafts/:id",
    handler: craftController.getCraftById,
  },
  {
    method: "POST",
    url: "/api/crafts",
    handler: craftController.addCraft,
  },
  {
    method: "PUT",
    url: "/api/crafts/:id",
    handler: craftController.updateCraft,
  },
  {
    method: "DELETE",
    url: "/api/crafts/:id",
    handler: craftController.deleteCraft,
  },
  {
    method: "GET",
    url: "/api/owners",
    handler: ownerController.getOwners,
  },
  {
    method: "GET",
    url: "/api/owners/:id",
    handler: ownerController.getOwnerById,
  },
  {
    method: "POST",
    url: "/api/owners",
    handler: ownerController.addOwner,
  },
  {
    method: "PUT",
    url: "/api/owners/:id",
    handler: ownerController.updateOwner,
  },
  {
    method: "DELETE",
    url: "/api/owners/:id",
    handler: ownerController.deleteOwner,
  },
];

module.exports = routes;
