const Slack = require('slack-node');

module.exports = slackService();

function slackService() {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK;

  return {
    sendContactMessage,
  };

  function sendContactMessage(message) {
    if (! slackWebhookUrl) {
      return Promise.reject('"SLACK_WEBHOOK" not found in environment');
    }
    if (typeof message !== 'string') {
      return Promise.reject(new TypeError('Both arguments should be Strings'));
    }

    return new Promise(promiseHandler);

    function promiseHandler(resolve, reject) {
      const slack = new Slack();
      slack.setWebhook(slackWebhookUrl);
      const slackWebhook = {
        username: 'Message from nosaj.io',
        icon_emoji: ':bird:',
        text: `${message}`,
      };
      slack.webhook(slackWebhook, webhookCallback)

      function webhookCallback(err, response) {
        if (err) {
          console.error(err)
          return reject(err);
        }
        resolve(response);
      }
    }
  }
}
