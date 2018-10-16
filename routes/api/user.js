const express = require('express');

// init router
const router = express.Router();
router.get('/test', (req, res, next) => {
    res.json({
        message: "users works"
    })
});

module.exports = router;