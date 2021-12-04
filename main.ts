function dummyInit () {
    colormap = [
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ],
    [
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black),
    neopixel.colors(NeoPixelColors.Black)
    ]
    ]
    return colormap
}
function test_all (iteration: number) {
    row_num = 7
    col_num = 0
    for (let index = 0; index < 8; index++) {
        for (let index = 0; index < 8; index++) {
            matrix.setPixel(row_num, col_num, neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            matrix.show()
            col_num += 1
            basic.pause(20)
            matrix.clear()
        }
        col_num = 0
        row_num += -1
    }
    row_num = 7
}
function clear_buffer () {
    my_selX = [cursorX]
    my_selY = [cursorY]
    my_selCol = [coloridx]
}
function Draw_to_pos (Xval: number, Yval: number) {
    if (newX < 512) {
        x2pos = Math.round(Math.map(newX, 0, 512, 7, cursorX))
    } else {
        x2pos = Math.round(Math.map(newX, 513, 1023, cursorX, 0))
    }
    if (newY < 512) {
        y2pos = Math.round(Math.map(newY, 0, 512, 7, cursorY))
    } else {
        y2pos = Math.round(Math.map(newY, 513, 1023, cursorY, 0))
    }
}
function UpdateMap (map_Row_Pos: number, map_Col_Pos: number, map_Col: number) {
    colormap[map_Row_Pos][map_Col_Pos] = map_Col
}
input.onButtonPressed(Button.A, function () {
    matrix.clear()
})
function initColorMap (maxrow: number, maxcol: number) {
    colormap = [[neopixel.colors(NeoPixelColors.Black)]]
    rowcounter = 0
    colcounter = 0
    for (let index = 0; index < maxrow; index++) {
        for (let index = 0; index < maxcol; index++) {
            colormap[rowcounter].push(neopixel.colors(NeoPixelColors.Orange))
            colcounter += 1
        }
        colormap.push([neopixel.colors(NeoPixelColors.Black)])
        rowcounter += 1
    }
    Print_Color_map()
    display_from_map(maxrow, maxcol)
    basic.pause(500)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.Green))
    display_from_map(maxrow, maxcol)
    basic.pause(500)
    Print_Color_map()
    matrix.clear()
}
function Cursor_to_pos3 (Xval: number, Yval: number) {
    if (Xval < 512) {
        cursorX = Math.round(Math.map(newX, 0, 512, 7, cursorX))
    } else if (Xval >= 512) {
        cursorX = Math.round(Math.map(newX, 513, 1023, cursorX, 0))
    }
    if (newY < 512) {
        cursorY = Math.round(Math.map(newY, 0, 512, 7, cursorY))
    } else if (newY >= 512) {
        cursorY = Math.round(Math.map(newY, 513, 1023, cursorY, 0))
    }
}
function Print_Color_map () {
    rowcounter = 0
    for (let value of colormap) {
        serial.writeValue("row num", rowcounter)
        serial.writeNumbers(value)
        rowcounter += 1
    }
}
input.onButtonPressed(Button.AB, function () {
    serial.writeValue("starting write", 1)
    for (let index = 0; index <= my_selX.length - 1; index++) {
        matrix.setPixel(my_selX[index], my_selY[index], my_selCol[index])
        matrix.show()
    }
    serial.writeValue("starting write", 0)
})
function display_from_map (maxrox: number, maxcol: number) {
    rowcounter = 0
    colcounter = 0
    matrix.Brightness(15)
    for (let index = 0; index < maxrox; index++) {
        for (let index = 0; index < maxcol; index++) {
            matrix.setPixel(rowcounter, colcounter, colormap[rowcounter][colcounter])
            matrix.show()
            colcounter += 1
        }
        colcounter = 0
        rowcounter += 1
    }
}
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
            newX = Math.idiv(value, 10000)
            newY = value - newX * 10000
            Draw_to_pos(newX, newY)
            my_selX.push(x2pos)
            my_selY.push(y2pos)
            my_selCol.push(colorlist[coloridx])
            serial.writeNumbers([x2pos, y2pos])
            matrix.setPixel(x2pos, y2pos, colorlist[coloridx])
            matrix.show()
        }
    } else if (name.includes("coloridx")) {
        serial.writeValue(name, value)
        prevCol = coloridx
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
        newX = Math.idiv(value, 10000)
        newY = value - newX * 10000
        Cursor_to_pos3(newX, newY)
    }
})
function Cursor_to_pos2 (Xval: number, Yval: number) {
    if (Xval < 512) {
        cursorX += -1
        if (cursorX < 0) {
            cursorX = 0
        }
    } else if (Xval >= 512) {
        cursorX += 1
        if (cursorX > MAX_COLUMNS) {
            cursorX = MAX_COLUMNS
        }
    }
    if (newY < 512) {
        cursorY += -1
        if (cursorY < 0) {
            cursorY = 0
        }
    } else if (newY >= 512) {
        cursorY += 1
        if (cursorY > MAX_ROWS) {
            cursorY = MAX_ROWS
        }
    }
}
let prevCol = 0
let drawing_now = false
let prevRadioXY = 0
let colcounter = 0
let rowcounter = 0
let y2pos = 0
let newY = 0
let x2pos = 0
let newX = 0
let my_selCol: number[] = []
let my_selY: number[] = []
let my_selX: number[] = []
let col_num = 0
let row_num = 0
let colormap: number[][] = []
let coloridx = 0
let colorlist: number[] = []
let matrix: SmartMatrix.Matrix = null
let cursorY = 0
let cursorX = 0
let MAX_COLUMNS = 0
let MAX_ROWS = 0
radio.setGroup(1)
MAX_ROWS = 8
MAX_COLUMNS = 8
cursorX = 3
cursorY = 3
matrix = SmartMatrix.create(
DigitalPin.P0,
MAX_COLUMNS,
MAX_ROWS,
NeoPixelMode.RGB
)
matrix.Brightness(15)
initColorMap(MAX_ROWS, MAX_COLUMNS)
test_all(1)
matrix.clear()
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
clear_buffer()
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
    basic.pause(20)
})
