let socket = io.connect('http://localhost:8000')

socket.on('init', (data) => {
  orbs = data.orbs
})