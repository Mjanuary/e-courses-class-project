const dataClean = (data) => {
  let results = [];
  for (const itm in data) {
    results.push({
      id: itm,
      ...data[itm],
    });
  }
  return results;
};

export default dataClean;
