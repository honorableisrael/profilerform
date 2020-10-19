export const batchDispatcher = (types, actionMapper, dispatch) => {
  // console.log({types});
  Object.entries(types).forEach(([k, v]) => {
    // console.log({k, v});
    dispatch(actionMapper[`SET_${k.toUpperCase()}`](v));
  });
};
