const io = require('../servers').io


const Orb = require('./classes/orb')
const Player = require('./classes/player')
const PlayerConfig = require('./classes/playerConfig')
const PlayerData = require('./classes/playerData')
const players = []


let orbs = []


let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
}


initGame()


io.sockets.on('connect', (socket) => {
  let player = {}

  socket.on('init', (data) => {




    console.log('this is data', data)

    let playerConfig = new PlayerConfig(settings)
    let playerData = new PlayerData(data.playerName, settings)
    let player = new Player(socket.id, playerConfig, playerData)

    socket.emit('initReturn', {
      orbs
    })

    players.push(playerData)

  })


})




function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings))
  }

}


module.exports = io

