const express = require('express');

// init router
const router = express.Router();
router.get('/test', (req, res, next) => {
    res.json({
        message: "profile works"
    })
});

module.exports = router;