'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const Order_Detail = require('../server/db/models/order-detail')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const products = await Promise.all([
    Product.create({name: 'Tofu', price: 2000000.27, quantity: 1}),
    Product.create({name: 'Edamame', price: 0.01, quantity: 47})
  ])

  console.log(`seeded ${products.length} products`)

  const orders = await Promise.all([
    Order.create({}),
    Order.create({isOrdered: true})
  ])

  console.log(`seeded ${orders.length} orders`)

  const orderDetails = await Promise.all([
    Order_Detail.create({productId: products[0].id, orderId: orders[0].id}),
    Order_Detail.create({productId: products[1].id, orderId: orders[1].id})
  ])

  console.log(`seeded ${orderDetails.length} order-details`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
