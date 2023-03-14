const firestore = () => ({
  collection: () => ({
    doc: () => ({
      get: () => Promise.resolve({ data: () => ({}) }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
  }),
});

export { firestore };
