import * as core from '@actions/core'
import {tweet} from './tweet'

async function run(): Promise<void> {
  try {
    const response = await tweet(core.getInput('status'))
    core.setOutput('response', response)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
