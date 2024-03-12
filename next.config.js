const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  images: {
    domains: [
      "*",
      "nextion-dev-backend.nextionpay.com.br",
    ],
  },

});