const faker = require("faker");
const boom = require("boom");

const fastify = require("./index.js");

const Craft = require("./models/Craft");
const Owner = require("./models/Owner");

// Fake crafts
const crafts = [
  {
    brand: "Aquaglide",
    name: [
      "Chinook 90",
      "Chinook 100",
      "Chinook 120",
      "McKenzie 105",
      "McKenzie 125",
      "Chelan 120",
      "Chelan 140",
      "Chelan 155",
    ],
    type: "Inflatable",
  },
  {
    brand: "Oru",
    type: "Foldable",
    name: ["Oru Beach LT", "Oru Bay ST", "Oru Coast XT"],
  },
  {
    brand: "Point 65",
    type: "Modular",
    name: ["Tequila", "Mercury", "Martini"],
  },
  {
    brand: "Nautriraid",
    type: "Foldable",
    name: ["Raid", "Grand Raid", "Narak", "Grand Narak"],
  },
];

const generateOwnerData = () => {
  let ownerData = [];

  for (let i = 0; i < 500; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    ownerData.push({
      firstName,
      lastName,
      email,
    });
  }
  return ownerData;
};

const generateCraftData = (ownerIds) => {
  let craftData = [];

  for (let i = 0; i < 1000; i++) {
    const craft = faker.random.arrayElement(crafts);
    const brand = craft.brand;
    const type = craft.type;
    const name = faker.random.arrayElement(craft.name);
    const price = faker.datatype.number({ min: 500, max: 3000 });
    const age = faker.datatype.number({ min: 0, max: 10 });
    let owner_id = null;
    if (Math.random() < 0.9) {
      owner_id = faker.random.arrayElement(ownerIds);
    }
    craftData.push({
      brand,
      type,
      name,
      price,
      age,
      owner_id,
    });
  }

  return craftData;
};

fastify.ready().then(async () => {
  try {
    const owners = await Owner.insertMany(generateOwnerData());
    const ownerIds = owners.map((o) => o._id);

    const crafts = await Craft.insertMany(generateCraftData(ownerIds));
    console.log(`Inserted ${crafts.length} crafts`);
  } catch (error) {
    throw boom.boomify(error);
  }
  process.exit();
});
