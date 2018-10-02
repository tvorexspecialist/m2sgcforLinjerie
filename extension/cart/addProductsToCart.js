/**
 * @param {object} context
 * @param {object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const request = context.tracedRequest
  const cartUrl = context.config.magentoUrl + '/carts'
  const accessToken = input.tokens.accessToken
  const products = input.transformedProducts
  const cartId = input.cartId

  addProductsToCart(request, accessToken, products, cartId, cartUrl, (err) => {
    if (err) return cb(err)
  })
}

/**
 * @param {Request} request
 * @param {string} accessToken
 * @param {object} product
 * @param {integer} cartId
 * @param {string} cartUrl
 * @param {function} cb
 */
function addProductsToCart (request, accessToken, products, cartId, cartUrl, cb) {
  const options = {
    url: `${cartUrl}/${cartId}/items`,
    headers: {authorization: `Bearer ${accessToken}`},
    json: products
  }

  request('magento:addProductsToCart').post(options, (err, res, body) => {
    if (err) return cb(err)
    if (res.statusCode >= 400) {
      return cb(new Error(`Got error (${res.statusCode}) from magento: ${JSON.stringify(body)}`))
    }

    cb(null)
  })
}