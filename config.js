"use strict";

require('dotenv').config({ silent: true });

let env = process.env.NODE_ENV || 'local';

module.exports = {
  env: env,
  mongo_url: process.env.MONGODB_URL || `mongodb://localhost/chatbot_${env}`,
  port: process.env.PORT || 5000,
  askls: {
    domain: 'https://askls-api-production.herokuapp.com/'
  },
  facebookGraph: {
    domain: 'https://graph.facebook.com/v2.6/',
    access_token: 'EAAJ1SceLt9MBAHtjcCCK24wa1383hQZBMqJ0wbguWxOZAymFFJzoT4GVbyuVOLzHg82kDt2UgB6tuA0zh8ZAxd8QmfozNH4ek5puCLdt5qMHRaFFU8B37ru7Wktlg6nAPbAkaJpDMYCpxtQh2yavsaA4igTinUZD'
  }
}
