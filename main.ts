function test_all (iteration: number) {
    for (let index = 0; index < 8; index++) {
        for (let index = 0; index < 8; index++) {
            matrix.setPixel(x, y, neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            matrix.show()
            y += 1
            basic.pause(100)
            matrix.clear()
        }
        y = 0
        x += -1
    }
    x = 7
}
let y = 0
let x = 0
let matrix: SmartMatrix.Matrix = null
radio.setGroup(1)
matrix = SmartMatrix.create(
DigitalPin.P0,
8,
8,
NeoPixelMode.RGB
)
matrix.clear()
matrix.Brightness(20)
matrix.show()
x = 7
y = 0
test_all(1)
basic.forever(function () {
	
})
