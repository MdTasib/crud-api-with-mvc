const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/dbConnected");

// POST MINION TO THE DATABASE
const saveMinions = async (req, res, next) => {
	try {
		const db = getDB();
		const minion = req.body;
		const result = await db.collection("minios").insertOne(minion);

		if (!result.insertedId) {
			return res
				.status(400)
				.send({ success: false, error: "Something went wrong!" });
		}

		res.status(200).send({
			success: true,
			message: `Minion added successfully`,
		});
	} catch (error) {
		next(error);
	}
};

// GET ALL MINIONS FROM DATABASE
const getMinions = async (req, res, next) => {
	try {
		const db = getDB();
		const minions = await db.collection("minios").find().toArray();
		res.status(200).send({ success: true, data: minions });
	} catch (error) {
		next(error);
	}
};

// UPDATE A SINGLE MINION WITH ID
const updateMinion = async (req, res, next) => {
	try {
		const db = getDB();
		const { id } = req.params;

		if (!ObjectId.isValid(id)) {
			return res
				.status(400)
				.send({ success: false, error: "Not a valid minion id" });
		}

		const minion = await db
			.collection("minions")
			.updateOne({ _id: ObjectId(id) }, { $set: req.body });

		if (!minion.modifiedCount) {
			return res
				.status(400)
				.send({ success: false, error: "Couldn't update minion" });
		}

		res
			.status(200)
			.send({ success: true, message: "Successfully updated the minion" });
	} catch (error) {
		next(error);
	}
};

// DELETE A SINGLE MINION WITH ID
const deleteMinion = async (req, res, next) => {
	try {
		const db = getDB();
		const { id } = req.params;

		if (!ObjectId.isValid(id)) {
			return res
				.status(400)
				.send({ success: false, error: "Not a valid minion id" });
		}

		const minion = await db
			.collection("minions")
			.deleteOne({ _id: ObjectId(id) });

		if (!minion.deletedCount) {
			return res
				.status(400)
				.send({ success: false, error: "Couldn't deleted minion" });
		}

		res
			.status(200)
			.send({ success: true, message: "Successfully deleted the minion" });
	} catch (error) {
		next(error);
	}
};

module.exports = { saveMinions, getMinions, updateMinion, deleteMinion };
