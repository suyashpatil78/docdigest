# DocDigest - AI-powered document summarizer

## Overview

DocDigest is an AI-powered document summarizer that uses gemini to summarize documents.

## Features

- Summarize documents using gemini.
- Extract key points from documents.

## Technologies

- Angular

## Running on local

- Clone the repository.
- Run `npm install` to install the dependencies.
- Change the `environment.ts` file to use your own API_URL and MIXPANEL_TOKEN:

```
export const environment = {
  production: false,
  API_URL: '<your-api-url>',
  MIXPANEL_TOKEN: '<your-mixpanel-token>',
};
```

- Run `ng serve` to start the development server.

## Backend

The backend for this project is a [Flask](https://github.com/suyashpatil78/docdigest-backend) application.
