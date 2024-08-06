export default {
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-dark-dream-a2sk1x8d.eu-central-1.aws.neon.tech',
    database: 'budget-planner',
    user: 'budget-planner_owner',
    password: 'lkv2SgepcI5o',
    port: 5432, // Default PostgreSQL port
    ssl: { rejectUnauthorized: false }, // Include SSL if required
  },
};
