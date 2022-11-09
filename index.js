const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToServer } = require("./utils/dbConnected");
const errorHandler = require("./middlewares/errorHandler");
const minionsRoute = require("./routes/minions.route");
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// DATABASE CONNECTED
connectToServer(err => {
	if (!err) {
		app.listen(process.env.PORT, () => console.log("Port 5000 server running"));
	} else {
		console.log("DB DON'T CONNECTED");
	}
});

// MINIONS ROUTES
app.use("/", minionsRoute);

// NOT FOUND ROUTE
app.all("*", (req, res) => {
	res.send("NO route found.");
});

// ERROR HANDLE
process.on("unhandledRejection", error => {
	console.log(error.name, error.message);
	app.close(() => {
		process.exit(1);
	});
});
