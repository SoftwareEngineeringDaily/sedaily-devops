const request = require('request');
const lcov2badge = require('lcov2badge');

const filePath = process.argv[2];

const options = {
  filePath: filePath || './coverage/lcov.info',
  warnThreshold: 80, // default is 80
  koThreshold: 60, // default is 60
};

function sendCoverageBadge(coverageBadge) {
  const requestOptions = {
    method: 'post',
    body: { coverageBadge, coverageBadgeToken: process.env.COVERAGE_BADGE_TOKEN },
    json: true,
    url: process.env.COVERAGE_BADGE_URL
  };
  request(requestOptions, (err, res, body) => {
    if (err) {
      throw err;
    } else {
      console.log(body.result); // eslint-disable-line no-console
    }
  });
}


lcov2badge.badge(options, (err, svgBadge) => {
  if (err) throw err;
  sendCoverageBadge(svgBadge);
});
