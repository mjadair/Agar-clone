function init() {
  draw()
  console.log(orbs)
}




player.locX = Math.floor(500 * Math.random() + 10)
player.locY = Math.floor(500 * Math.random() + 10)


function draw() {




  //this resets the translation (below) 
  //look at the Mozilla docs on skewing, arguments are vertical and horizontal scaloing and skewing
  context.setTransform(1, 0, 0, 1, 0, 0)


    //wipes the entire canvas out every time draw is called (every new frame)
    context.clearRect(0, 0, canvas.width, canvas.height)


  //clamp the viewport to the camera
  const camX = -player.locX + canvas.width / 2
  const camY = -player.locY + canvas.height / 2
  context.translate(camX, camY)


  context.beginPath()
  context.fillStyle = 'rgb(255,0,0)'

  //arc takes the x and y co-ordinates of the centre of the arc
  //the third argument is the radius of the circle
  //the 4th aguments is the starting angle
  //the 5th argument is where to stop (PI *2 will give a full circumference)
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2)
  context.fill()
  context.lineWidth = 3
  context.strokeStyle = 'rgb(0,255,0)'
  context.stroke()


  orbs.forEach((orb) => {
    context.beginPath()
    context.fillStyle = orb.color
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2)
    context.fill()
  })








  requestAnimationFrame(draw)
}


canvas.addEventListener('mousemove', (event) => {
  // console.log(event)
  const mousePosition = {
    x: event.clientX,
    y: event.clientY
  }
  const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI
  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - (angleDeg / 90)
    yVector = -(angleDeg / 90)
    console.log('The mouse is in the lower right quadrant, relative to the centre')
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90
    yVector = -(1 - ((angleDeg - 90) / 90))
    console.log('The mouse is in the lower left quadrant, relative to the centre')
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90
    yVector = (1 + ((angleDeg + 90) / 90))
    console.log('The mouse is in the upper left quadrant, relative to the centre')
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90
    yVector = (1 - ((angleDeg + 90) / 90))
    console.log('The mouse is in the upper right quadrant, relative to the centre')
  }

  speed = 10
  xV = xVector
  yV = yVector

  if ((player.locX < 5 && player.xVector < 0) || (player.locX > 500) && (xV > 0)) {
    player.locY -= speed * yV
  } else if ((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)) {
    player.locX += speed * xV
  } else {
    player.locX += speed * xV
    player.locY -= speed * yV
  }
})