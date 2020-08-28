<p align="center">
  <a href="https://github.com/snow-actions/tweet/actions"><img alt="snow-actions/tweet status" src="https://github.com/snow-actions/tweet/workflows/build-test/badge.svg"></a>
</p>

# Tweet action

Tweet via GitHub Actions.

## Usage

1. Create your Twitter App in [developer.twitter.com](https://developer.twitter.com/en/apps).
1. Set secrets `TWITTER_CONSUMER_API_KEY`, `TWITTER_CONSUMER_API_SECRET_KEY`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET` in settings.
1. Create workflow YAML.

```yml
name: 'tweet'
on:
  push:
    branches:
      - main

jobs:
  tweet:
    runs-on: ubuntu-latest
    steps:
      - name: Tweet
        id: tweet
        uses: snow-actions/tweet@v1.0.0
        env:
          CONSUMER_API_KEY: ${{ secrets.TWITTER_CONSUMER_API_KEY }}
          CONSUMER_API_SECRET_KEY: ${{ secrets.TWITTER_CONSUMER_API_SECRET_KEY }}
          ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
        with:
          status: ${{ github.run_id }}-${{ github.run_number }} ${{ github.sha }}
      - run: echo ${{ steps.tweet.outputs.response }}
```

## Environments

Authentication parameters.

|name|required|description|
|---|---|---|
|CONSUMER_API_KEY|required|Consumer API key|
|CONSUMER_API_SECRET_KEY|required|Consumer API secret key|
|ACCESS_TOKEN|required|Access token|
|ACCESS_TOKEN_SECRET|required|Access token secret|

## Inputs & Outputs

See [action.yml](action.yml) and [Twitter API reference](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update).

### Inputs

Request parameters.

|name|required|description|
|---|---|---|
|status|required|The text of the status update. URL encode as necessary. [t.co link wrapping](https://developer.twitter.com/en/docs/basics/tco) will affect character counts.|
|media_paths|optional|Upload media path(s).|

### Outputs

Response.

|name|description|
|---|---|
|response|Response JSON|
