const port = process.env.PORT || 3000;
require("./src/app").listen(port, () => {
  console.log("Listening on port 3000");
});
