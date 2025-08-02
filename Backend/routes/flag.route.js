const express = require('express');
const router = express.Router();
const flag = require('../controllers/flag.controller');

// Issue Flags
router.route('/')
    .post(flag.flagIssue);

router.route('/:issueId')
    .get(flag.getIssueFlags);

router.route('/:id')
    .put(flag.updateIssueFlag);

// Flag Statuses
router.route('/statuses')
    .get(flag.getFlagStatuses);

module.exports = router;
