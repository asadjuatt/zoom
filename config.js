const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "",
    APISecret: "",
  },
  production: {
    APIKey: "l0cKV83BTcGU_sVDjzpZXg",
    APISecret: "jzdkxTKT0duQFicVcbijvy6SAiRVo1C8zWkD",
  },
};

module.exports = config[env];
