export function computeTotals(products = []) {
  const totalStock = products.reduce(
    (sum, p) => sum + (Number(p.stock) || 0),
    0
  );

  const totalDemand = products.reduce(
    (sum, p) => sum + (Number(p.demand) || 0),
    0
  );

  const filled = products.reduce((sum, p) => {
    const stock = Number(p.stock) || 0;
    const demand = Number(p.demand) || 0;
    return sum + Math.min(stock, demand);
  }, 0);

  const fillRate =
    totalDemand === 0 ? 100 : Math.round((filled / totalDemand) * 100);

  const outOfStockCount = products.reduce(
    (count, p) => count + ((Number(p.stock) || 0) === 0 ? 1 : 0),
    0
  );

  return { totalStock, totalDemand, fillRate, outOfStockCount };
}
