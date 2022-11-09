const express = require("express");
const router = express.Router();
const {
	getMinions,
	saveMinions,
	updateMinion,
	deleteMinion,
} = require("../controllers/minions.controllers");

// GET AND POST ROUTE
router.route("/").get(getMinions).post(saveMinions);

// UPDATE AND DELETE ROUTE
router.route("/:id").patch(updateMinion).delete(deleteMinion);

module.exports = router;
