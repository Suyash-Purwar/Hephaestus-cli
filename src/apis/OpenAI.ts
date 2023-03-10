import { Spinner } from './../utils/Spinner.js';
import { OpenAIApi, Configuration } from 'openai';
import { AppConfiguration } from '../interfaces/AppConfiguration.js';

export class OpenAI {
  private _openai: OpenAIApi;
  private _model: string;

  constructor(appConfig: AppConfiguration) {
    const configuration = new Configuration({
      apiKey: appConfig['api-token'],
    });
    this._openai = new OpenAIApi(configuration);
    this._model = appConfig.model;
  }

  async checkValidity(): Promise<boolean> {
    const spinner = new Spinner('Authenticating');
    spinner.start();
    try {
      const response = await this._openai.listModels();
      spinner.stop();
      return response.status == 200;
    } catch (e: any) {
      spinner.stop();
      switch (e.response.status) {
        case 401:
          throw new Error('INVALID_TOKEN');
        case 429:
          throw new Error('INTERNAL_DEPENDENCY_BUSY');
        default:
          console.log(e.response.status);
          throw new Error('OPENAI_SERVICE_DOWN');
      }
    }
  }

  async getTextualResponse(query: string): Promise<string> {
    const spinner = new Spinner('Generating response...');
    spinner.start();
    try {
      const response = await this._openai.createCompletion({
        model: this._model,
        prompt: query,
        max_tokens: 1000,
        temperature: 0,
        top_p: 1,
      });
      spinner.stop();
      return response.data.choices[0].text as string;
    } catch (e: any) {
      spinner.stop();
      switch (e.response.status) {
        case 401:
          throw new Error('INVALID_TOKEN');
        case 429:
          throw new Error('INTERNAL_DEPENDENCY_BUSY');
        default:
          console.log(e.message);
          throw new Error('OPENAI_SERVICE_DOWN');
      }
    }
  }
}
