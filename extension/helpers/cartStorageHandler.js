const CART = 'cart'

class CartStorageHandler {
  constructor (storages) {
    this.storages = storages
  }

  /**
   * @param {Object} cart
   * @param {boolean} isLoggedIn
   * @param {StepCallback} cb
   */
  set (cart, isLoggedIn, cb) {
    const storage = isLoggedIn ? 'user' : 'device'
    this.storages[storage].set(CART, cart, (err) => {
      if (err) return cb(err)
      cb()
    })
  }

  /**
   * @param {boolean} isLoggedIn
   * @param {StepCallback} cb
   * @param {Error|null} cb.err
   * @param {MagentoResponseCart} cb.result
   */
  get (isLoggedIn, cb) {
    const storage = isLoggedIn ? 'user' : 'device'
    this.storages[storage].get(CART, (err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  }
}

module.exports = CartStorageHandler
