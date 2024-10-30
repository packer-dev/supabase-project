export default defineConfig({
  adapter: async () => {
    const client = new Client({
      connectionString:
        "postgresql://postgres:postgres@localhost:54322/postgres",
    });
    await client.connect();
    return new SeedPg(client);
  },
  // We only want to generate data for the public schema
  select: ["!*", "public.*"],
});
