if(process.env.ENVIRONMENT === 'production') {
  module.exports = {
    'url' : process.env.MONGODB_URI
  }
} else {
  module.exports = {
    'url' : `mongodb://localhost/${process.env.DB_NAME}`
  }
}

