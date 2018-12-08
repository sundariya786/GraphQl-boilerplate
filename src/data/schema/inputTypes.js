export default `
input ADD_USER_INPUT {
    _id: String,
    name: String,
    surname: String
}
input ADD_ORDER_INPUT {
  id: String,
  orderId: String,
  amount: String,
  createdAt: String,
  createdBy: String,
  users: [User]
}
`