const slackService = require('../lib/slack-message-service');

module.exports = messagesHandler;

function messagesHandler(req, res) {
  const {message} = req.body;
  if (! message) {
    return res
      .status(400)
      .json({error: '`message` string is required in POST payload'});
  }
  slackService.sendContactMessage(message);
  res.status(200).json({sent: true});
}
