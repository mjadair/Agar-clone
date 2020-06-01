const wHeight = $(window).height()
const wWidth = $(window).width()
let player = {}

const canvas = document.querySelector('#the-canvas')
const context = canvas.getContext('2d')

canvas.width = wWidth
canvas.height = wHeight

$(window).load(() => {
$('#loginModal').modal('show')
})


$('.name-form').submit((event) => {
  event.preventDefault()
  // console.log('submitted!')
  player.name = document.querySelector('#name-input').value
  console.log(player)
  $('#loginModal').modal('hide')
  $('#spawnModal').modal('show')
  document.querySelector('.player-name').innerHTML = player.name
})


$('.start-game').click((event) => {
  $('.modal').modal('hide')
  $('.hiddenOnStart').removeAttr('hidden')
  init()
})