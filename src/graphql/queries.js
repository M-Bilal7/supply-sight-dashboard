// queries.js
import { gql } from "@apollo/client";

// --- Products query ---
export const GET_PRODUCTS = gql`
  query Products($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
      __typename
    }
  }
`;

// --- Warehouses query ---
export const GET_WAREHOUSES = gql`
  query {
    warehouses {
      code
      name
      city
      country
      __typename
    }
  }
`;

// --- KPIs (chart data) query ---
export const GET_KPIS = gql`
  query Kpis($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
      __typename
    }
  }
`;

// --- Update Demand mutation ---
export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      stock
      demand
      __typename
    }
  }
`;

// --- Transfer Stock mutation ---
export const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
    transferStock(id: $id, from: $from, to: $to, qty: $qty) {
      id
      stock
      demand
      warehouse
      __typename
    }
  }
`;
