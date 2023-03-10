#!/usr/bin/env node

import { CommandValidator } from './CommandValidator.js';
import { ResponseHandler } from './ResponseHandler.js';
import { Stylize } from './utils/Stylize.js';

(async function () {
  try {
    const executable = CommandValidator.validateCommand();
    await ResponseHandler.routeExecutable(executable);
  } catch (e: any) {
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
        console.log(
          Stylize.error('Query parameter is empty. Please pass the query.')
        );
        break;
      case 'INVALID_FLAG':
        console.log(
          Stylize.error(
            `Flag ${e.unknownCommand} is invalid. Use --code or --text.`
          )
        );
        break;
      case 'OPTION_NOT_RECOGNIZED':
        console.log(
          Stylize.error(`Option ${e.unknownCommand} not recognized.`)
        );
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
            `Hephaestus is not configured yet. Run 'heph configure' to configure.`
          )
        );
        break;
      case 'PLATFORM_NOT_SUPPORTED':
        console.log(
          Stylize.error('Hephaestus is not supported for your application.')
        );
        break;
      case 'INTERNAL_DEPENDENCY_BUSY':
        console.log(
          Stylize.error(
            'Hephaestus has received too many requests in a short span of time. Try after a short span of time.'
          )
        );
        break;
      default:
        console.log(e);
        console.log(
          Stylize.error(
            'Internal server error. Please raise an issue on github.'
          )
        );
        break;
    }
  }
})();
