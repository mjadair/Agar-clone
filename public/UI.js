const wHeight = $(window).height()
const wWidth = $(window).width()

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

})