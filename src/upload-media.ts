import Twitter from 'twitter-api-v2'
import * as fs from 'fs'
import * as core from '@actions/core'

export async function uploadMedia(mediaPaths: string[]): Promise<string[]> {
  core.debug(JSON.stringify(mediaPaths))
  for (const path of mediaPaths) {
    if (!fs.existsSync(path)) {
      throw new Error(`${path} not exists`)
    }
  }

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

  const mediaIds = mediaPaths.map(async path => {
    return await client.uploadMedia(path)
  })

  return await Promise.all(mediaIds)
}
