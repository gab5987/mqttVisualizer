const mqtt = require('mqtt')

const host = 'broker.hivemq.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

var topic = [ 'JjQZFhodDDghISIALBYQNS8/SCO' ]

client.on('connect', () => {
    console.log('Connected')

    for (let i in topic) {
        client.subscribe([topic[i]], () => {})
    }
})

client.on('message', (topic, payload) => {
    var messages = payload.toString().split("$");
    messages[2] = new Date(messages[2] * 1000).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})
    for(i in messages) {
        console.log(messages[i])
    }
    console.log(" ")
})