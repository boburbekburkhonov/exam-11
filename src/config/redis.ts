import { createClient } from "redis"

export const redisConnect = async() => {
  const client = createClient({
    url: 'redis://127.0.0.1:6379'
  })

  client.on('error', err => console.log(err))

  await client.connect()

  console.log('Connect');

  return client
}