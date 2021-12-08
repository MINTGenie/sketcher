/**
 * // Etch-a-sketch EEPROM data format
 * 
 * 0: 0xDE (means configured)
 * 
 * 1: <Display type> (0: 8x8; 1:16x16; 2:8x32
 * 
 * 2: <pattern count>
 * 
 * // Store 10 patterns 
 * 
 * 3,4: <pattern_length>
 * 
 * 5,6: <pattern_start_addr>
 * 
 * 7,8,9: pattern1_name(3)
 * 
 * // 0x50: data start
 * 
 * 0x50,0x51: <LED_number><color_idx> ... repeat
 */
// Etch-a-sketch EEPROM data format
// 
// 0: <Display type> (0: 8x8; 1:16x16; 2:8x32
// 
// 1: <pattern count>
// 
// 2,3,4: pattern1_name(3)
// 
// 5,6: <pattern_length>
// 
// 7,8: <pattern_start_addr>
// 
// 0x50: data start
// 
// 0x50,0x51: <LED_number><color_idx> ... repeat
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
function Cursor_to_pos2 (Xval3: number, Yval3: number) {
    if (Xval3 < 512) {
        cursorX += -1
        if (cursorX < 0) {
            cursorX = 0
        }
    } else if (Xval3 >= 512) {
        cursorX += 1
        if (cursorX > MAX_COLUMNS) {
            cursorX = MAX_COLUMNS
        }
    }
    if (Yval3 < 512) {
        cursorY += -1
        if (cursorY < 0) {
            cursorY = 0
        }
    } else if (Yval3 >= 512) {
        cursorY += 1
        if (cursorY > MAX_ROWS) {
            cursorY = MAX_ROWS
        }
    }
}
function write_to_eeprom (dev_addr: number, mem_addr: number, value: number, repeat: boolean, size: number) {
    pins.i2cWriteNumber(
    dev_addr,
    mem_addr,
    NumberFormat.UInt16LE,
    true
    )
    if (size == 1) {
        pins.i2cWriteNumber(
        dev_addr,
        value,
        NumberFormat.UInt8BE,
        repeat
        )
    } else if (size == 2) {
        pins.i2cWriteNumber(
        dev_addr,
        value,
        NumberFormat.UInt16LE,
        repeat
        )
    } else if (size == 4) {
        pins.i2cWriteNumber(
        dev_addr,
        value,
        NumberFormat.UInt32BE,
        repeat
        )
    }
}
function read_eeprom_single (dev_addr: number, mem_addr: number, size: number, repeat: boolean) {
    serial.writeValue("starting write len", 0)
    counter1 = 0
    pins.i2cWriteNumber(
    dev_addr,
    mem_addr,
    NumberFormat.UInt16LE,
    false
    )
    if (size == 1) {
        return pins.i2cReadNumber(dev_addr, NumberFormat.UInt8BE, repeat)
    } else if (size == 2) {
        return pins.i2cReadNumber(dev_addr, NumberFormat.UInt16BE, repeat)
    } else if (size == 4) {
        return pins.i2cReadNumber(dev_addr, NumberFormat.UInt32BE, repeat)
    } else {
        return 0
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
// 10181022
// 
// temp = 1018
// 
// y2pos=10181022-(10180000)
// 
// =1022
function clear_buffer () {
    my_selX = [cursorX]
    my_selY = [cursorY]
}
function Print_Color_map () {
    rowcounter = 0
    for (let value of colormap) {
        serial.writeValue("row num", rowcounter)
        serial.writeNumbers(value)
        rowcounter += 1
    }
}
radio.onReceivedValue(function (name, value2) {
    msgNameArr.push(name)
    msgValArr.push(value2)
    serial.writeValue("msg len", msgValArr.length)
})
function check_init_eeprom (dev_addr: number) {
    strip.clear()
    pins.i2cWriteNumber(
    dev_addr,
    0,
    NumberFormat.UInt8BE,
    false
    )
    if (pins.i2cReadNumber(dev_addr, NumberFormat.UInt8BE, true) == 222) {
        CONFIGURED_EEPROM = true
        pattern_count = pins.i2cReadNumber(dev_addr, NumberFormat.UInt8BE, false)
        if (pattern_count) {
            pattern_id = pattern_count
            pattern_len_memaddr = PATTERN_LEN_OFFSET + PATTERN_DESC_SIZE * pattern_id
            // use to get previous pattern len
            pattern_len = read_eeprom_single(EEPROM_ADDR, pattern_len_memaddr, 2, false)
            pattern_addr = pattern_len + read_eeprom_single(EEPROM_ADDR, PATTERN_ADDR_OFFSET + PATTERN_DESC_SIZE * (pattern_id - 1), 2, false)
            pattern_len = 0
        } else {
            pattern_id = 0
        }
    } else {
        pattern_count = 0
        pattern_id = 0
        pattern_len_memaddr = PATTERN_LEN_OFFSET
        CONFIGURED_EEPROM = true
        write_to_eeprom(dev_addr, 0, 222, true, 1)
        write_to_eeprom(dev_addr, DISP_TYPE_ADDR, 0, true, 1)
        write_to_eeprom(dev_addr, PATTERN_CNT_ADDR, 0, true, 1)
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
function eeprom_Init () {
    DISP_TYPE_ADDR = 1
    PATTERN_CNT_ADDR = 2
    MAX_PATTERNS = 10
    PATTERN_DESC_SIZE = 7
    PATTERN_START_ADDR = 80
    PATTERN_LEN_OFFSET = 3
    PATTERN_ADDR_OFFSET = 5
    check_init_eeprom(EEPROM_ADDR)
}
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
input.onButtonPressed(Button.AB, function () {
    read_eeprom_and_display(EEPROM_ADDR, 0, 10)
    serial.writeValue("Writing_Done", 0)
})
function Panel_test (maxrow2: number, maxcol3: number) {
    panel_sweep(1)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.Green))
    basic.pause(500)
    display_from_map(maxrow2, maxcol3)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.Black))
    display_from_map(maxrow2, maxcol3)
    basic.pause(500)
    Print_Color_map()
    matrix.clear()
}
input.onButtonPressed(Button.B, function () {
    serial.writeNumbers(my_selX)
    serial.writeNumbers(my_selY)
    strip.clear()
    pattern_len = 0
})
function read_eeprom_and_display (dev_addr: number, mem_addr: number, len: number) {
    serial.writeValue("starting write len", len)
    counter1 = 0
    pins.i2cWriteNumber(
    dev_addr,
    mem_addr,
    NumberFormat.UInt16LE,
    false
    )
    for (let index = 0; index < len - 2; index++) {
        draw_at_led_num = pins.i2cReadNumber(dev_addr, NumberFormat.UInt32BE, true)
        coloridx_to_set = pins.i2cReadNumber(dev_addr, NumberFormat.UInt32BE, true)
        strip.setPixelColor(draw_at_led_num, colorlist[coloridx_to_set])
        strip.show()
        counter1 += 1
    }
    strip.setPixelColor(pins.i2cReadNumber(dev_addr, NumberFormat.UInt32BE, false), colorlist[coloridx_to_set])
    strip.show()
    serial.writeValue("Done", 1)
}
function display_from_map (maxrox: number, maxcol2: number) {
    rowcounter = 0
    colcounter = 0
    matrix.Brightness(15)
    for (let index = 0; index < maxrox; index++) {
        for (let index = 0; index < maxcol2; index++) {
            matrix.setPixel(rowcounter, colcounter, colormap[rowcounter][colcounter])
            matrix.show()
            colcounter += 1
        }
        colcounter = 0
        rowcounter += 1
    }
}
function Cursor_to_pos3 (Xval2: number, Yval2: number) {
    if (Xval2 < 512) {
        cursorX = Math.round(Math.map(newX, 0, 512, 7, cursorX))
    } else if (Xval2 >= 512) {
        cursorX = Math.round(Math.map(newX, 513, 1023, cursorX, 0))
    }
    if (newY < 512) {
        cursorY = Math.round(Math.map(newY, 0, 512, 7, cursorY))
    } else if (newY >= 512) {
        cursorY = Math.round(Math.map(newY, 513, 1023, cursorY, 0))
    }
}
function test_eeprom () {
    counter1 = 0
    for (let index = 0; index < 10; index++) {
        value1 = randint(100000, 150000)
        serial.writeValue("x", value1)
        AT24CXX.write_dword(counter1, value1)
        counter1 += 4
    }
    serial.writeValue("Done", 0)
    counter1 = 0
    for (let index = 0; index < 10; index++) {
        value1 = AT24CXX.read_dword(counter1)
        serial.writeValue("x", value1)
        counter1 += 4
    }
    serial.writeValue("Done", 1)
}
function draw_line () {
    Draw_to_pos(newX, newY)
    write_to_eeprom(EEPROM_ADDR, pattern_addr + pattern_len, x2pos * MAX_COLUMNS + y2pos, true, 1)
    pattern_len += 1
    write_to_eeprom(EEPROM_ADDR, pattern_addr + pattern_len, coloridx, true, 1)
    pattern_len += 1
}
function msg_processor (name2: string, value3: number) {
    if (name2.includes("10000x+y")) {
        if (value3 != prevRadioXY) {
            serial.writeValue(name2, value3)
            prevRadioXY = value3
            drawing_now = true
            newX = Math.idiv(value3, 10000)
            newY = value3 - newX * 10000
            draw_line()
            matrix.setPixel(x2pos, y2pos, colorlist[coloridx])
            matrix.show()
            basic.pause(20)
            matrix.setPixel(x2pos, y2pos, neopixel.colors(NeoPixelColors.Black))
            matrix.show()
            basic.pause(20)
            matrix.setPixel(x2pos, y2pos, colorlist[coloridx])
            matrix.show()
        }
    } else if (name2.includes("coloridx")) {
        serial.writeValue(name2, value3)
        prevCol = coloridx
        coloridx += 1
        if (coloridx > 9) {
            coloridx = 0
        }
    } else if (name2.includes("draw")) {
        serial.writeValue(name2, value3)
        drawing_now = false
        write_to_eeprom(EEPROM_ADDR, pattern_len_memaddr, pattern_len, false, 2)
        cursorX = x2pos
        cursorY = y2pos
    } else if (name2.includes("cursor")) {
        newX = Math.idiv(value3, 10000)
        newY = value3 - newX * 10000
        Cursor_to_pos3(newX, newY)
    } else if (name2.includes("disp_mode")) {
        DISP_mode = true
        DRAW_NEW_MODE = false
        drawing_now = false
        if (pattern_id > MAX_PATTERNS || pattern_id > pattern_count) {
            pattern_id = 0
        } else if (pattern_count > 0) {
            selected_pattern_len = read_eeprom_single(EEPROM_ADDR, PATTERN_LEN_OFFSET + PATTERN_DESC_SIZE * pattern_id, 2, false)
            read_eeprom_and_display(EEPROM_ADDR, read_eeprom_single(EEPROM_ADDR, PATTERN_ADDR_OFFSET + PATTERN_DESC_SIZE * pattern_id, 2, false), selected_pattern_len)
            pattern_id += 1
        } else {
            strip.showRainbow(1, 360)
            strip.show()
            basic.pause(2000)
            strip.clear()
        }
    } else if (name2.includes("draw_mode")) {
        DISP_mode = false
        DRAW_NEW_MODE = true
        check_init_eeprom(EEPROM_ADDR)
    } else if (name2.includes("save_now")) {
        pattern_count += 1
    }
}
let selected_pattern_len = 0
let DRAW_NEW_MODE = false
let DISP_mode = false
let prevCol = 0
let drawing_now = false
let prevRadioXY = 0
let value1 = 0
let newY = 0
let newX = 0
let coloridx_to_set = 0
let draw_at_led_num = 0
let colcounter = 0
let PATTERN_START_ADDR = 0
let MAX_PATTERNS = 0
let PATTERN_CNT_ADDR = 0
let DISP_TYPE_ADDR = 0
let PATTERN_ADDR_OFFSET = 0
let pattern_addr = 0
let pattern_len = 0
let PATTERN_DESC_SIZE = 0
let PATTERN_LEN_OFFSET = 0
let pattern_len_memaddr = 0
let pattern_id = 0
let pattern_count = 0
let CONFIGURED_EEPROM = false
let colormap: number[][] = []
let rowcounter = 0
let my_selY: number[] = []
let my_selX: number[] = []
let col_num = 0
let row_num = 0
let counter1 = 0
let y2pos = 0
let x2pos = 0
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
let strip: neopixel.Strip = null
let EEPROM_ADDR = 0
serial.writeValue("starting write len", 0)
EEPROM_ADDR = 80
strip = neopixel.create(DigitalPin.P0, 64, NeoPixelMode.RGB)
strip.setBrightness(15)
eeprom_Init()
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
matrix.scrollText(
"MINT Genie",
17,
1,
colorlist._pickRandom()
)
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
