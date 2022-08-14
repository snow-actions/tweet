import 'dotenv/config'
import {tweet} from '../src/tweet'

test('tweet', async () => {
  const text = Date.now().toString()
  const response = await tweet(text)
  await tweet(`in reply to ${text}`, [], response.id_str)
})
