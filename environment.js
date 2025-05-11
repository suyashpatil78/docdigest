require('dotenv').config();

module.exports = {
  environment: `export const environment = {
    production: true,
    API_URL: '${process.env.API_URL}',
    MIXPANEL_TOKEN: '${process.env.MIXPANEL_TOKEN}',
  };`
};