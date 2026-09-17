export const up = (pgm) => {
  pgm.createTable("notes", {
    id: {
      type: "uuid",
      primaryKey: true,
    },

    title: {
      type: "varchar(200)",
      notNull: true,
    },

    content: {
      type: "text",
      notNull: true,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("notes");
};
