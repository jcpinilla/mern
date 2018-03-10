const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "surfinsta";

router.get("/", (req, res) => {
	query({}, data => 
		res.send(data)
	);
});

router.post("/", (req, res) => {
	let tag = req.body.tag;
	let search = {
		tag,
		time: new Date().getTime()
	};
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		let db = client.db(dbName);
		db.collection("searches").insertOne(search);
		client.close();
		res.json({msg: "ok"});
	});
});

function query(query, callback) {
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		let db = client.db(dbName);
		db.collection("searches").find(query).toArray((err, result) => {
			if (err) throw err;
			callback(result, db);
			client.close();
		});
	});
}

module.exports = router;