import Twitter from 'twitter'

export async function tweet(
  status: string,
  mediaIds: string[] = [],
  inReplyToStatusId: string = ''
): Promise<string> {
  return new Promise((resolve, reject) => {
    const consumer_key = process.env.CONSUMER_API_KEY as string
    const consumer_secret = process.env.CONSUMER_API_SECRET_KEY as string
    const access_token_key = process.env.ACCESS_TOKEN as string
    const access_token_secret = process.env.ACCESS_TOKEN_SECRET as string

    const client = new Twitter({
      consumer_key,
      consumer_secret,
      access_token_key,
      access_token_secret
    })
    let parameters: {[key: string]: any} = {status}
    if (mediaIds.length > 0) {
      parameters['media_ids'] = mediaIds.join(',')
    }
    if (inReplyToStatusId != '') {
      parameters['in_reply_to_status_id'] = inReplyToStatusId
    }
    client.post('statuses/update', parameters, (errors, data, response) => {
      if (errors) {
        reject(errors)
      }

      resolve(response.body)
    })
  })
}
