import Twitter, {TweetV1} from 'twitter-api-v2'

export async function tweet(
  status: string,
  mediaIds: string[] = [],
  inReplyToStatusId = ''
): Promise<TweetV1> {
  const appKey = process.env.CONSUMER_API_KEY as string
  const appSecret = process.env.CONSUMER_API_SECRET_KEY as string
  const accessToken = process.env.ACCESS_TOKEN as string
  const accessSecret = process.env.ACCESS_TOKEN_SECRET as string

  const client = new Twitter({
    appKey,
    appSecret,
    accessToken,
    accessSecret
  }).v1

  const parameters: {[key: string]: string} = {}
  if (mediaIds.length > 0) {
    parameters['media_ids'] = mediaIds.join(',')
  }
  if (inReplyToStatusId !== '') {
    parameters['in_reply_to_status_id'] = inReplyToStatusId
  }
  return await client.tweet(status, parameters)
}
