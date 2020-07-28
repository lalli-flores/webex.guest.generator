#!/usr/bin/env node

import {readFileSync} from 'fs';
import {getGuestToken, getGuestAccessToken, getGuestData} from './index.mjs';

(async () => {
  const configPath = process.argv[2];

  if(configPath) {
    let config;

    try {
      config = JSON.parse(readFileSync(configPath, 'utf8'));
    } catch(error) {
      const message = 'Something doesn\'t look right on that JSON file. Check it again?';

      console.error('\x1b[31m%s\x1b[0m\n', message);
      process.exit(1);
    }

    try {
      const jwtToken = getGuestToken(config.name, config.id, config.secret);
      const accessToken = await getGuestAccessToken(jwtToken);
      console.log('\x1b[36m%s\x1b[0m\n%O', 'Guest access token:', accessToken);

      const user = await getGuestData(accessToken.token);
      console.log('\x1b[36m%s\x1b[0m\n%O', 'This guest is:', user)
    } catch(error) {
      const message = 'Something went really wrong here! 😬'

      console.error('\x1b[31m%s\x1b[0m\n', message);
      console.error(error);
      process.exit(1);
    }
  } else {
    const message = 'Oops! Looks like the path to a configuration file is missing 🤭';
    const usage = 'npx webex-guest-generator config.json';

    console.error('\x1b[31m%s\x1b[0m\n', message);
    console.error('\x1b[33mUsage: \x1b[0m%s', usage);
    process.exit(1);
  }
})();
