const express = require('express');
const router = express.Router();
const issue = require('../controllers/issue.controller');

//Issues
router.route('/')
    .post(issue.createIssue)
    .get(issue.getIssues);

router.route('/:id')
    .get(issue.getIssueById)
    .put(issue.updateIssue)
    .delete(issue.deleteIssue);

//Categories
router.get('/categories', issue.getIssueCategories);

//Statuses
router.get('/statuses', issue.getIssueStatuses);

//Photos
router.route('/photos')
    .post(issue.addIssuePhoto);

router.route('/photos/:issueId')
    .get(issue.getIssuePhotos);

router.route('/photos/:id')
    .delete(issue.deleteIssuePhoto);

//Status Logs
router.route('/logs')
    .post(issue.addIssueLog);

router.route('/logs/:issueId')
    .get(issue.getIssueLogs);

module.exports = router;
