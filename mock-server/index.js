// idex.js
const { ApolloServer, gql } = require("apollo-server");

// --- Sample Data ---
let products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "NYC-A", stock: 180, demand: 120, updatedAt: new Date().toISOString() },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "NYC-A", stock: 50, demand: 80, updatedAt: new Date().toISOString() },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "LAX-C", stock: 80, demand: 80, updatedAt: new Date().toISOString() },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "CHI-B", stock: 24, demand: 120, updatedAt: new Date().toISOString() },
  { id: "P-1005", name: "Aluminum Sheet 2mm", sku: "ALU-2MM-001", warehouse: "NYC-A", stock: 200, demand: 150, updatedAt: new Date().toISOString() },
  { id: "P-1006", name: "Copper Wire 1m", sku: "CWR-1M-050", warehouse: "LAX-C", stock: 300, demand: 280, updatedAt: new Date().toISOString() },
  { id: "P-1007", name: "Plastic Pipe 3in", sku: "PIP-3IN-100", warehouse: "CHI-B", stock: 60, demand: 40, updatedAt: new Date().toISOString() },
  { id: "P-1008", name: "Rubber Gasket", sku: "RBG-25-300", warehouse: "NYC-A", stock: 90, demand: 120, updatedAt: new Date().toISOString() },
  { id: "P-1009", name: "Stainless Steel Rod", sku: "SSR-10-150", warehouse: "LAX-C", stock: 45, demand: 60, updatedAt: new Date().toISOString() },
  { id: "P-1010", name: "Gear Wheel 20T", sku: "GRW-20T-075", warehouse: "CHI-B", stock: 110, demand: 90, updatedAt: new Date().toISOString() },
];


let warehouses = [
  { code: "NYC-A", name: "New York Central", city: "New York", country: "United States" },
  { code: "LAX-C", name: "Los Angeles Hub", city: "Los Angeles", country: "United States" },
  { code: "CHI-B", name: "Chicago Base", city: "Chicago", country: "United States" },
];

// --- Schema ---
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type Warehouse {
    code: String!
    name: String!
    city: String!
    country: String!
  }

  type Kpi {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [Kpi!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product
  }
`;

// --- Resolvers ---
const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let result = products;

      if (search) {
        const term = search.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.sku.toLowerCase().includes(term) ||
            p.id.toLowerCase().includes(term)
        );
      }

      if (warehouse) {
        result = result.filter((p) => p.warehouse === warehouse);
      }

      if (status && status !== "All") {
        result = result.filter((p) => {
          if (status === "Healthy") return p.stock > p.demand;
          if (status === "Low") return p.stock === p.demand;
          if (status === "Critical") return p.stock < p.demand;
          return true;
        });
      }

      return result;
    },

    warehouses: () => warehouses,

    kpis: (_, { range }) => {
      const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
      const today = new Date();

      return Array.from({ length: days }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return {
          date: date.toISOString().slice(0, 10),
          stock: Math.floor(Math.random() * 200 + 50),
          demand: Math.floor(Math.random() * 200 + 50),
        };
      }).reverse();
    },
  },

  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      product.demand = demand;
      return product;
    },

    transferStock: (_, { id, from, to, qty }) => {
      if (qty <= 0) return null;

      // Find the source product (same id + from warehouse)
      const source = products.find(
        (p) => p.id === id && p.warehouse === from
      );
      if (!source) return null;

      // Ensure source has enough stock
      const moveQty = Math.min(source.stock, qty);
      source.stock = Math.max(0, source.stock - moveQty);

      // Find if a product with same id already exists in target warehouse
      let target = products.find(
        (p) => p.id === id && p.warehouse === to
      );

      if (target) {
        // Increment stock on target
        target.stock += moveQty;
      } else {
        // Create new target product record
        target = {
          ...source,
          stock: moveQty,
          warehouse: to,
          // Keep demand separate per warehouse or reset to 0
          demand: 0,
        };
        products.push(target);
      }

      return target;
    },

  },
};

// --- Start Apollo Server ---
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Mock GraphQL server ready at ${url}`);
});
