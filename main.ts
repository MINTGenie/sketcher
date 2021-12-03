function test_all (iteration: number) {
    for (let index = 0; index < 8; index++) {
        for (let index = 0; index < 8; index++) {
            matrix.setPixel(row_num, col_num, neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            matrix.show()
            col_num += 1
            basic.pause(100)
            matrix.clear()
        }
        col_num = 0
        row_num += -1
    }
    row_num = 7
}
/**
 * Need to Map this value
 */
radio.onReceivedValue(function (name, value) {
    if (name.includes("10000x+y")) {
        x2pos = Math.idiv(value, 10000)
        y2pos = value - x2pos * 10000
    } else if (name.includes("coloridx")) {
    	
    } else {
    	
    }
})
let y2pos = 0
let x2pos = 0
let col_num = 0
let row_num = 0
let matrix: SmartMatrix.Matrix = null
radio.setGroup(1)
let MAX_ROWS = 8
let MAX_COLUMNS = 8
matrix = SmartMatrix.create(
DigitalPin.P0,
MAX_COLUMNS,
MAX_ROWS,
NeoPixelMode.RGB
)
matrix.clear()
matrix.Brightness(20)
matrix.show()
test_all(1)
row_num = 7
col_num = 0
let colorlist = [
neopixel.colors(NeoPixelColors.Red),
neopixel.colors(NeoPixelColors.Orange),
neopixel.colors(NeoPixelColors.Yellow),
neopixel.colors(NeoPixelColors.Green),
neopixel.colors(NeoPixelColors.Blue),
neopixel.colors(NeoPixelColors.Indigo),
neopixel.colors(NeoPixelColors.Violet),
neopixel.colors(NeoPixelColors.Purple),
neopixel.colors(NeoPixelColors.White),
neopixel.colors(NeoPixelColors.Black)
]
basic.forever(function () {
	
})
