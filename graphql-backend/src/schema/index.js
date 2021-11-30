// Import the controllers
const craftController = require("../controllers/craftController");
const ownerController = require("../controllers/ownerController");

// Define the custom Types
const CraftType = `type CraftType {
  id: ID!
  name: String
  type: String
  brand: String
  price: String
  age: Int
  owner: OwnerType
}`;

const OwnerType = `type OwnerType {
  id: ID!
  firstName: String
  lastName: String
  email: String
  crafts: [CraftType]
}`;

// Define the schema which uses the types
const schema = `
type Query {
  Crafts(offset: Int): CraftsResult
  Craft(id: ID): CraftType
  Owners: [OwnerType]
  Owner(id: ID): OwnerType
}

type Mutation {
  addCraft(  
    name: String
    type: String
    brand: String
    price: String
    age: Int
  ): CraftId
  
  updateCraft(
    name: String
    type: String
    brand: String
    price: String
    age: Int
    id: ID!
  ): CraftType

}

type CraftId {
  id: ID
}

type PageInfo {
  offset: Int
  currentPage: Int
  hasNextPage: Boolean
  totalPages: Int
}

type CraftsResult {
  totalCount: Int
  edges: [CraftType]
  pageInfo: PageInfo
}


${CraftType}
${OwnerType}
`;

// Define the resolvers
const resolvers = {
  Query: {
    async Crafts(_, { offset = 0 }) {
      const data = await craftController.getCrafts({ offset });
      const result = {
        edges: data.docs,
        pageInfo: {
          offset,
          currentPage: data.page,
          hasNextPage: data.hasNextPage,
          totalPages: data.totalPages,
        },
      };
      return result;
    },
    async Craft(_, { id }) {
      const craft = await craftController.getCraftById({ id });
      if (craft && craft.owner_id) {
        const owner = await ownerController.getOwnerById({
          id: craft.owner_id,
        });
        craft.owner = owner;
      }
      return craft;
    },
    async Owners() {
      return await ownerController.getOwners();
    },
    async Owner(_, { id }) {
      const owner = await ownerController.getOwnerById({ id });
      const crafts = await craftController.getCraftsByOwnerId({ id });
      owner.crafts = crafts;
      return owner;
    },
  },
  Mutation: {
    async addCraft(_, fields) {
      const craft = await craftController.addCraft({ ...fields });
      return craft;
    },

    async updateCraft(_, fields) {
      const craft = await craftController.updateCraft({ ...fields });
      return craft;
    },
  },
};

module.exports = { schema, resolvers };
