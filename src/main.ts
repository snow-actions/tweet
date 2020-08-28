import * as core from '@actions/core'
import * as path from 'path'
import {tweet} from './tweet'
import {uploadMedia} from './uploadMedia'

async function run(): Promise<void> {
  try {
    const mediaPaths = core.getInput('media_paths')
    const mediaIds = await uploadMedia(
      mediaPaths
        .split('\n')
        .map(mediaPath => path.join(process.cwd(), mediaPath))
    )
    core.debug(`Media IDs: ${mediaIds.join(', ')}`)
    const response = await tweet(core.getInput('status'), mediaIds)
    core.setOutput('response', response)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
