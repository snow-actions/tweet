import Twitter from 'twitter'
import {isString} from 'util'

export async function tweet(status: string): Promise<string> {
  return new Promise(resolve => {
    if (!isString(status)) {
      throw new Error('status not a string')
    }

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
    const parameters = {
      status
    }
    client.post('statuses/update', parameters, (error, data, response) => {
      if (error) {
        throw error
      }

      resolve(JSON.stringify(response.body))
    })
  })
}
