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
function Draw_to_pos (Xval: number, Yval: number) {
    if (temp < 512) {
        x2pos = Math.round(Math.map(temp, 0, 512, 7, cursorX))
    } else {
        x2pos = Math.round(Math.map(temp, 513, 1023, cursorX, 0))
    }
    if (temp2 < 512) {
        y2pos = Math.round(Math.map(temp2, 0, 512, 7, cursorY))
    } else {
        y2pos = Math.round(Math.map(temp2, 513, 1023, cursorY, 0))
    }
}
input.onButtonPressed(Button.A, function () {
    matrix.clear()
})
input.onButtonPressed(Button.AB, function () {
    serial.writeValue("starting write", 1)
    for (let index = 0; index <= my_selX.length - 1; index++) {
        matrix.setPixel(my_selX[index], my_selY[index], my_selCol[index])
        matrix.show()
    }
    serial.writeValue("starting write", 0)
})
input.onButtonPressed(Button.B, function () {
    serial.writeNumbers(my_selX)
    serial.writeNumbers(my_selY)
    serial.writeNumbers(my_selCol)
})
radio.onReceivedValue(function (name, value) {
    if (name.includes("10000x+y")) {
        if (value != prevRadioXY) {
            serial.writeValue(name, value)
            prevRadioXY = value
            drawing_now = true
            temp = Math.idiv(value, 10000)
            temp2 = value - temp * 10000
            Draw_to_pos(temp, temp2)
            my_selX.push(x2pos)
            my_selY.push(y2pos)
            my_selCol.push(colorlist[coloridx])
            serial.writeNumbers([x2pos, y2pos])
            matrix.setPixel(x2pos, y2pos, colorlist[coloridx])
            matrix.show()
        }
    } else if (name.includes("coloridx")) {
        serial.writeValue(name, value)
        coloridx += 1
        if (coloridx > 9) {
            coloridx = 0
        }
    } else if (name.includes("draw")) {
        serial.writeValue(name, value)
        cursorX = x2pos
        cursorY = y2pos
        drawing_now = false
    } else if (name.includes("cursor")) {
        temp = Math.idiv(value, 10000)
        temp2 = value - temp * 10000
        Cursor_to_pos2(temp, temp2)
    }
})
function Cursor_to_pos2 (Xval: number, Yval: number) {
    if (temp < 512) {
        cursorX = Math.round(Math.map(temp, 0, 512, 7, cursorX))
    } else {
        cursorX = Math.round(Math.map(temp, 513, 1023, cursorX, 0))
    }
    if (temp2 < 512) {
        cursorY = Math.round(Math.map(temp2, 0, 512, 7, cursorY))
    } else {
        cursorY = Math.round(Math.map(temp2, 513, 1023, cursorY, 0))
    }
}
let drawing_now = false
let prevRadioXY = 0
let y2pos = 0
let temp2 = 0
let x2pos = 0
let temp = 0
let my_selCol: number[] = []
let my_selY: number[] = []
let my_selX: number[] = []
let coloridx = 0
let colorlist: number[] = []
let col_num = 0
let row_num = 0
let matrix: SmartMatrix.Matrix = null
let cursorY = 0
let cursorX = 0
radio.setGroup(1)
let MAX_ROWS = 8
let MAX_COLUMNS = 8
cursorX = 3
cursorY = 3
matrix = SmartMatrix.create(
DigitalPin.P0,
MAX_COLUMNS,
MAX_ROWS,
NeoPixelMode.RGB
)
matrix.clear()
matrix.Brightness(15)
matrix.setPixel(cursorX, cursorY, neopixel.colors(NeoPixelColors.Red))
matrix.show()
row_num = 7
col_num = 0
colorlist = [
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
coloridx = 0
serial.writeValue("x", 0)
my_selX = [cursorX]
my_selY = [cursorY]
my_selCol = [coloridx]
/**
 * 10181022
 * 
 * temp = 1018
 * 
 * y2pos=10181022-(10180000)
 * 
 * =1022
 */
basic.forever(function () {
    matrix.setPixel(cursorX, cursorY, colorlist[coloridx])
    matrix.show()
    basic.pause(100)
    matrix.setPixel(cursorX, cursorY, neopixel.colors(NeoPixelColors.Black))
    matrix.show()
    basic.pause(100)
})
