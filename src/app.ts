#!/usr/bin/env node

import { CommandValidator } from './CommandValidator.js';
import { ResponseHandler } from './ResponseHandler.js';
import { Stylize } from './utils/Stylize.js';

(async function () {
  try {
    const executable = CommandValidator.validateCommand();
    // console.log(executable);
    await ResponseHandler.routeExecutable(executable);
  } catch (e: any) {
    // console.log(e.name);
    // console.log(e.message);
    // console.log(e.command);
    switch (e.message) {
      case 'UNKNOWN_COMMAND':
        console.log(
          Stylize.error(
            `Argument '${e.unknownCommand}' not recognized. Please pass the correct argument.`
          )
        );
        break;
      case 'ENCOUNTER_EXTRA_ARGS':
        console.log(
          Stylize.error(
            `Ecountered extra arument(s). Argument '${e.unknownCommand}' was not expected.`
          )
        );
        break;
      case 'EMPTY_QUERY':
        console.log('Query parameter is empty. Please pass the query.');
        break;
      case 'INVALID_TOKEN':
        console.log(
          Stylize.error('API Token is invalid. Please pass the valid token.')
        );
        break;
      case 'OPENAI_SERVICE_DOWN':
        console.log(
          Stylize.error(
            'Internal dependency error. Please raise an issue on github.'
          )
        );
        break;
      case 'CONFIGURATION_NOT_SET':
        console.log(
          Stylize.error(
            `Hephaestus is not configure yet. Run 'heph configure' to configure.`
          )
        );
      default:
        console.log(
          Stylize.error(
            'Internal server error. Please raise an issue on github.'
          )
        );
        break;
    }
  }
})();
