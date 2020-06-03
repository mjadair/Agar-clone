
let socket = io.connect('http://localhost:8000')
// let orbs = []


//this function is called when the user clicks the start button in UI.js
function init() {

  draw()

  socket.emit('init', {
    playerName: player.name
  })




}




socket.on('initReturn', (data) => {
  orbs = data.orbs
  setInterval(() => {
    socket.emit(('tick'), {
      xVector: player.xVector,
      yVector: player.yVector
    })
  }, 33)


})

socket.on('tock', (data) => {
  players = data.players
  console.log(data.playerX, data.playerY)
  player.locX = data.playerX
  player.locY = data.playerY
})









