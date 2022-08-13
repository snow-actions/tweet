import * as core from '@actions/core'
import * as path from 'path'
import {tweet} from './tweet'
import {uploadMedia} from './upload-media'

async function run(): Promise<void> {
  try {
    const mediaPaths = core.getInput('media_paths')
    const mediaIds = await uploadMedia(
      mediaPaths
        .split('\n')
        .filter(x => x !== '')
        .map(mediaPath => path.join(process.cwd(), mediaPath))
    )
    core.debug(`Media IDs: ${mediaIds.join(', ')}`)

    const inReplyToStatusId = core.getInput('in_reply_to_status_id')

    const response = await tweet(
      core.getInput('status'),
      mediaIds,
      inReplyToStatusId
    )
    core.setOutput('response', JSON.stringify(response))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
