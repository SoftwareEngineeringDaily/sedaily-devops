const fs = require('fs');
const lcov2badge = require('lcov2badge');

const filePath = process.argv[2];

const options = {
  filePath: filePath || './coverage/lcov.info',
  warnThreshold: 80, // default is 80
  koThreshold: 60, // default is 60
};

lcov2badge.badge(options, (err, svgBadge) => {
  if (err) throw err;
  fs.writeFile('coverageBadge.svg', svgBadge, (error) => {
    if (err) throw error;
  });
});
