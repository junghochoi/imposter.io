const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send({
        response: "Route is working"
    }).status(200);

});

module.exports = router;