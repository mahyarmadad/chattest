const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send("this is Backend");
});

module.exports = router;
