// // board
// let board: HTMLCanvasElement
// const boardWidth: number = 750
// const boardHeight: number = 250
// let context: CanvasRenderingContext2D | null
//
// // dino
// const dinoWidth: number = 88
// const dinoHeight: number = 94
// const dinoX: number = 50
// const dinoY: number = boardHeight - dinoHeight
// let dinoImg: HTMLImageElement
//
// type Dino = {
//   height: number
//   width: number
//   x: number
//   y: number
// }
//
// const dino: Dino = {
//   height: dinoHeight,
//   width: dinoWidth,
//   x: dinoX,
//   y: dinoY,
// }
//
// // cactus
// type Cactus = {
//   height: number
//   img: HTMLImageElement | null
//   width: null | number
//   x: number
//   y: number
// }
//
// const cactusArray: Cactus[] = []
//
// const cactus1Width: number = 34
// const cactus2Width: number = 69
// const cactus3Width: number = 102
//
// const cactusHeight: number = 70
// const cactusX: number = 700
// const cactusY: number = boardHeight - cactusHeight
//
// let cactus1Img: HTMLImageElement
// let cactus2Img: HTMLImageElement
// let cactus3Img: HTMLImageElement
//
// // physics
// const velocityX: number = -8 // cactus moving left speed
// let velocityY: number = 0
// const gravity: number = 0.4
//
// let gameOver: boolean = false
// let score: number = 0
//
// window.onload = function () {
//   board = document.getElementById('board') as HTMLCanvasElement
//   board.height = boardHeight
//   board.width = boardWidth
//
//   context = board.getContext('2d') // used for drawing on the board
//
//   // load dinosaur image
//   dinoImg = new Image()
//   dinoImg.src = 'public/images/dino/dino.png'
//   dinoImg.onload = function () {
//     context?.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
//   }
//
//   // load cactus images
//   cactus1Img = new Image()
//   cactus1Img.src = 'public/images/dino/cactus1.png'
//
//   cactus2Img = new Image()
//   cactus2Img.src = 'public/images/dino/cactus2.png'
//
//   cactus3Img = new Image()
//   cactus3Img.src = 'public/images/dino/cactus3.png'
//
//   requestAnimationFrame(update)
//   setInterval(placeCactus, 1000) // 1000 milliseconds = 1 second
//   document.addEventListener('keydown', moveDino)
// }
//
// function update(): void {
//   requestAnimationFrame(update)
//   if (gameOver) {
//     return
//   }
//
//   context?.clearRect(0, 0, board.width, board.height)
//
//   // dino
//   velocityY += gravity
//   dino.y = Math.min(dino.y + velocityY, dinoY) // apply gravity to current dino.y, making sure it doesn't exceed the ground
//   context?.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
//
//   // cactus
//   for (let i = 0; i < cactusArray.length; i++) {
//     const cactus = cactusArray[i]
//
//     cactus.x += velocityX
//     context?.drawImage(cactus.img!, cactus.x, cactus.y, cactus.width!, cactus.height)
//
//     if (detectCollision(dino, cactus)) {
//       gameOver = true
//       dinoImg.src = 'public/images/dino/dino-dead.png'
//       dinoImg.onload = function () {
//         context?.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
//       }
//     }
//   }
//
//   // score
//   context!.fillStyle = 'black'
//   context!.font = '20px courier'
//   score++
//   context!.fillText(score.toString(), 5, 20)
// }
//
// function moveDino(e: KeyboardEvent): void {
//   if (gameOver) {
//     return
//   }
//
//   if ((e.code === 'Space' || e.code === 'ArrowUp') && dino.y === dinoY) {
//     // jump
//     velocityY = -10
//   } else if (e.code === 'ArrowDown' && dino.y === dinoY) {
//     // duck
//   }
// }
//
// function placeCactus(): void {
//   if (gameOver) {
//     return
//   }
//
//   // place cactus
//   const cactus: Cactus = {
//     height: cactusHeight,
//     img: null,
//     width: null,
//     x: cactusX,
//     y: cactusY,
//   }
//
//   const placeCactusChance: number = Math.random() // 0 - 0.9999...
//
//   if (placeCactusChance > 0.9) {
//     // 10% you get cactus3
//     cactus.img = cactus3Img
//     cactus.width = cactus3Width
//     cactusArray.push(cactus)
//   } else if (placeCactusChance > 0.7) {
//     // 30% you get cactus2
//     cactus.img = cactus2Img
//     cactus.width = cactus2Width
//     cactusArray.push(cactus)
//   } else if (placeCactusChance > 0.5) {
//     // 50% you get cactus1
//     cactus.img = cactus1Img
//     cactus.width = cactus1Width
//     cactusArray.push(cactus)
//   }
//
//   if (cactusArray.length > 5) {
//     cactusArray.shift() // remove the first element from the array so that the array doesn't constantly grow
//   }
// }
//
// function detectCollision(a: Dino, b: Cactus): boolean {
//   return (
//     a.x < b.x + (b.width || 0) &&
//     a.x + a.width > b.x &&
//     a.y < b.y + b.height &&
//     a.y + a.height > b.y
//   )
// }
