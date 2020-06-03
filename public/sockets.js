
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


})

socket.on('tock', (data) => {
  players = data.players
})









