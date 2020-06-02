function init() {
  draw()
}




const randomX = Math.floor(500 * Math.random() + 10)
const randomY = Math.floor(500 * Math.random() + 10)

console.log(randomX, randomY)

function draw() {


  context.beginPath()
  context.fillStyle = 'rgb(255,0,0)'
  
  //arc takes the x and y co-ordinates of the centre of the arc
  //the third argument is the radius of the circle
  //the 4th aguments is the starting angle
  //the 5th argument is where to stop (PI *2 will give a full circumference)
  context.arc(randomX, randomY, 10, 0, Math.PI * 2)
  context.fill()
  context.lineWidth = 3
  context.strokeStyle = 'rgb(0,255,0)'
  context.stroke()
  requestAnimationFrame(draw)




}