const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../db.json"));
const middlewares = jsonServer.defaults();

const PORT = 3000;

const routes = jsonServer.rewriter({
  "/api/*": "/$1",

  "/liquidityparameters/codes": "/parameterCodes",
  "/liquidityparameters/parameters": "/parameters",
  "/liquidityparameters/types": "/parameterTypes",
  "/liquidityparameters/filter": "/liquidityparameters",
  "/liquidityparameters/list": "/liquidityparameters",

  "/liquiditycalculation/filter": "/liquiditycalculation",
  "/liquiditycalculation/list": "/liquiditycalculation",
  "/liquiditycalculation/add": "/liquiditycalculation"
});

/// wraps the data in the expected format
router.render = (req, res) => {
  res.jsonp({
    message: "Sucesso",
    success: true,
    totalRows: res.locals.data.length,
    data: res.locals.data
  })
};

server.use(middlewares);
server.use(routes);
server.use(router);
server.listen(PORT, () => {
  console.log("JSON Server is running in port " + PORT);
});
