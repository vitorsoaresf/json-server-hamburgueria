const cors = require("cors");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const port = process.env.PORT || 3333;

app.db = router.db;

const rules = auth.rewriter({
  "/users": "/644/users/?_embed=comments&_embed=cart",
  "/products": "/644/products/?_embed=comments",
  "/products/:id": "/644/products/:id?_embed=comments",
  cart: 640,
  comments: 644,
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
