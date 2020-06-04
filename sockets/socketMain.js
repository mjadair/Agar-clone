/* eslint-disable no-undef */
const io = require('../servers').io
const checkForOrbCollisions = require('./checkCollisions').checkForOrbCollisions
const checkForPlayerCollisions = require('./checkCollisions').checkForPlayerCollisions


const Orb = require('./classes/orb')
const Player = require('./classes/player')
const PlayerConfig = require('./classes/playerConfig')
const PlayerData = require('./classes/playerData')
const players = []


let orbs = []


let settings = {
  defaultOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000
}


initGame()



setInterval(() => {
  if (players.length > 0) {
    io.to('game').emit('tock', {
      players
    })
  }
}, 33)


io.sockets.on('connect', (socket) => {
  let player = {}

  socket.on('init', (data) => {


    socket.join('game')


    let playerConfig = new PlayerConfig(settings)
    let playerData = new PlayerData(data.playerName, settings)
    player = new Player(socket.id, playerConfig, playerData)




    setInterval(() => {
      socket.emit('tickTock', {
        players,
        playerX: player.playerData.locX,
        playerY: player.playerData.locY
      })
    }, 33)




    socket.emit('initReturn', {
      orbs
    })

    players.push(playerData)



    socket.on('tick', (data) => {
      speed = player.playerConfig.speed
      xVector = player.playerConfig.xVector = data.xVector
      yVector = player.playerConfig.yVector = data.yVector

      if ((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > settings.worldWidth) && (xVector > 0)) {
        player.playerData.locY -= speed * yVector
      } else if ((player.playerData.locY < 5 && yVector > 0) || (player.playerData.locY > settings.worldHeight) && (yVector < 0)) {
        player.playerData.locX += speed * xVector
      } else {
        player.playerData.locX += speed * xVector
        player.playerData.locY -= speed * yVector
      }



      let capturedOrb = checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings)
      capturedOrb.then(() => {
        const orbData = {
          orbIndex: data,
          newOrb: orbs(data)
        }
        io.sockets.emit('orbSwitch', orbData)

      }).catch(() => {
        //need a catch handler for unresolved promise
      })
    })

    //player collision
    let playerDeath = checkForPlayerCollisions(player.playerData, player.playerConfig, players, player.socketId)
    playerDeath.then(() => {



    }).catch(() => {

    })





  })






})




function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings))
  }

}


module.exports = io

