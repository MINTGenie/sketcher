/**
 * 10181022
 * 
 * temp = 1018
 * 
 * y2pos=10181022-(10180000)
 * 
 * =1022
 */
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
function clear_buffer () {
    my_selX = [cursorX]
    my_selY = [cursorY]
}
function Draw_to_pos (Xval: number, Yval: number) {
    if (Xval < joy_MIDX) {
        x2pos = Math.round(Math.map(Xval, joystk_resX_MIN, joy_MIDX, MAX_COLUMNS - 1, cursorX))
    } else if (Xval >= joy_MIDX) {
        x2pos = Math.round(Math.map(Xval, joy_MIDX, joystk_resX_MAX, cursorX, 0))
    }
    if (Yval < joy_MIDY) {
        y2pos = Math.round(Math.map(Yval, joystk_resY_MIN, joy_MIDY, MAX_ROWS - 1, cursorY))
    } else if (Yval >= joy_MIDY) {
        y2pos = Math.round(Math.map(Yval, joy_MIDY, joystk_resY_MAX, cursorY, 0))
    }
}
function UpdateMap (map_Row_Pos: number, map_Col_Pos: number, map_Col: number) {
    colormap[map_Row_Pos][map_Col_Pos] = map_Col
}
input.onButtonPressed(Button.A, function () {
    matrix.clear()
    matrix.show()
    bkup_pos_cursor = [cursorX, cursorY, neopixel.colors(NeoPixelColors.Black)]
})
function initColorMap (maxrow: number, maxcol: number) {
    colormap = [[neopixel.colors(NeoPixelColors.Black)]]
    rowcounter = 0
    colcounter = 0
    for (let index = 0; index < maxrow; index++) {
        for (let index = 0; index < maxcol; index++) {
            colormap[rowcounter].push(neopixel.colors(NeoPixelColors.Black))
            colcounter += 1
        }
        colormap.push([neopixel.colors(NeoPixelColors.Black)])
        rowcounter += 1
    }
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
    serial.writeValue("starting write len", my_selX.length)
    for (let index = 0; index <= my_selX.length - 1; index++) {
        matrix.setPixel(my_selX[index], my_selY[index], colormap[my_selX[index]][my_selY[index]])
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
function update_x2y2 () {
	
}
function Panel_test (maxrow: number, maxcol: number) {
    panel_sweep(1)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.Green))
    basic.pause(500)
    display_from_map(maxrow, maxcol)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.Black))
    display_from_map(maxrow, maxcol)
    basic.pause(500)
    Print_Color_map()
    matrix.clear()
}
input.onButtonPressed(Button.B, function () {
    serial.writeNumbers(my_selX)
    serial.writeNumbers(my_selY)
    initColorMap(MAX_ROWS, MAX_COLUMNS)
    clear_buffer()
})
radio.onReceivedValue(function (name, value) {
    msgNameArr.push(name)
    msgValArr.push(value)
    serial.writeValue("msg len", msgValArr.length)
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
function msg_processor (name: string, value: number) {
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
            UpdateMap(x2pos, y2pos, colorlist[coloridx])
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
}
function panel_sweep (iteration: number) {
    row_num = 7
    col_num = 0
    for (let index = 0; index < 8; index++) {
        for (let index = 0; index < 8; index++) {
            matrix.setPixel(row_num, col_num, colorlist._pickRandom())
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
let col_num = 0
let row_num = 0
let prevCol = 0
let drawing_now = false
let prevRadioXY = 0
let newY = 0
let newX = 0
let colcounter = 0
let rowcounter = 0
let y2pos = 0
let x2pos = 0
let my_selY: number[] = []
let my_selX: number[] = []
let colormap: number[][] = []
let bkup_pos_cursor: number[] = []
let msgValArr: number[] = []
let msgNameArr: string[] = []
let coloridx = 0
let colorlist: number[] = []
let matrix: SmartMatrix.Matrix = null
let cursorY = 0
let cursorX = 0
let MAX_COLUMNS = 0
let MAX_ROWS = 0
let joy_MIDY = 0
let joy_MIDX = 0
let joystk_resY_MAX = 0
let joystk_resY_MIN = 0
let joystk_resX_MAX = 0
let joystk_resX_MIN = 0
radio.setGroup(1)
joystk_resX_MIN = 0
joystk_resX_MAX = 1023
joystk_resY_MIN = 0
joystk_resY_MAX = 1023
joy_MIDX = Math.round((joystk_resX_MAX - joystk_resX_MIN) / 2)
joy_MIDY = Math.round((joystk_resY_MAX - joystk_resY_MIN) / 2)
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
matrix.Brightness(15)
initColorMap(MAX_ROWS, MAX_COLUMNS)
matrix.clear()
coloridx = 0
serial.writeValue("x", 0)
clear_buffer()
msgNameArr = []
msgValArr = []
bkup_pos_cursor = [3, 3, neopixel.colors(NeoPixelColors.Red)]
basic.forever(function () {
    if (!(drawing_now)) {
        if (bkup_pos_cursor[0] != cursorX || bkup_pos_cursor[1] != cursorY) {
            serial.writeValue("a", 1)
            bkup_pos_cursor = [cursorX, cursorY, colormap[cursorX][cursorY]]
            matrix.setPixel(bkup_pos_cursor[0], bkup_pos_cursor[1], bkup_pos_cursor[2])
            matrix.show()
        }
        if (colormap[cursorX][cursorY] == neopixel.colors(NeoPixelColors.Black)) {
            serial.writeValue("a", 2)
            matrix.setPixel(cursorX, cursorY, colorlist[coloridx])
            matrix.show()
            basic.pause(20)
            matrix.setPixel(cursorX, cursorY, neopixel.colors(NeoPixelColors.Black))
            matrix.show()
            basic.pause(20)
        } else if (colormap[cursorX][cursorY] != neopixel.colors(NeoPixelColors.Black)) {
            serial.writeValue("a", 3)
            if (bkup_pos_cursor[0] != cursorX || bkup_pos_cursor[1] != cursorY) {
                serial.writeValue("a", 4)
                bkup_pos_cursor = [cursorX, cursorY, colormap[cursorX][cursorY]]
                matrix.setPixel(cursorX, cursorY, colorlist[coloridx])
                matrix.show()
            }
        }
    }
    if (msgValArr.length > 0) {
        msg_processor(msgNameArr.shift(), msgValArr.shift())
    }
})
