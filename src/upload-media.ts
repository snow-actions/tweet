import Twitter from 'twitter'
import {isString} from 'util'
import * as fs from 'fs'
import * as core from '@actions/core'

export async function uploadMedia(mediaPaths: string[]): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    core.debug(JSON.stringify(mediaPaths))
    for (const path of mediaPaths) {
      if (!isString(path)) {
        throw new Error('media path not a string')
      }
      if (!fs.existsSync(path)) {
        throw new Error(`${path} not exists`)
      }
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

    try {
      const promises = mediaPaths.map(async path => {
        const media = fs.readFileSync(path)
        // TODO: chunked
        return await client.post('media/upload', {media})
      })

      const responses = await Promise.all(promises)
      resolve(
        responses.map(x => {
          core.debug(`ResponseData: ${JSON.stringify(x)}`)
          return x.media_id_string
        })
      )
    } catch (error) {
      reject(new Error('upload failed'))
    }
  })
}
