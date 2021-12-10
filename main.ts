/**
 * Update only on change
 */
// 0: <Display type> (0: 8x8; 1:16x16; 2:8x32)
// 
// Etch-a-sketch EEPROM data format
// 
// 0x50,0x51: <LED_number><color_idx> ... repeat
// 
// 0x50: data start
// 
// 7,8: <pattern_start_addr>
// 
// 5,6: <pattern_length>
// 
// 2,3,4: pattern1_name(3)
// 
// 1: <pattern count>
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
    writeXarray.push(x2pos)
    writeYarray.push(y2pos)
    WriteColArray.push(coloridx)
    UpdateMap(x2pos, y2pos, coloridx)
}
radio.onReceivedValue(function (name, value2) {
    msgNameArr.push(name)
    msgValArr.push(value2)
})
function read_eeprom_and_display2 (dev_addr: number, mem_addr: number, len: number) {
    serial.writeValue("starting from addr", mem_addr)
    serial.writeValue("starting write len", len)
    counter1 = mem_addr
    for (let index = 0; index < len; index++) {
        draw_at_ledX = AT24CXX.read_byte(counter1)
        basic.pause(50)
        counter1 += 1
        draw_at_ledY = AT24CXX.read_byte(counter1)
        basic.pause(50)
        counter1 += 1
        coloridx_to_set = AT24CXX.read_byte(counter1)
        basic.pause(50)
        counter1 += 1
        serial.writeNumbers([draw_at_ledX, draw_at_ledY, colorlist[coloridx_to_set]])
        matrix.setPixel(draw_at_ledX, draw_at_ledY, colorlist[coloridx_to_set])
        matrix.show()
        basic.pause(50)
    }
    serial.writeValue("Done", 1)
}
function UpdateMap (map_Row_Pos: number, map_Col_Pos: number, map_Col: number) {
    colormap[map_Row_Pos][map_Col_Pos] = map_Col
}
input.onButtonPressed(Button.A, function () {
    strip.clear()
    matrix.clear()
    bkup_pos_cursor = [cursorX, cursorY, neopixel.colors(NeoPixelColors.Black)]
    initColorMap(MAX_ROWS, MAX_COLUMNS)
    pattern_len = 0
    AT24CXX.write_word(pattern_len_memaddr, pattern_len)
})
function eeprom_Init () {
    serial.writeValue("init init", 1)
    DISP_TYPE_ADDR = 1
    PATTERN_CNT_ADDR = 2
    MAX_PATTERNS = 10
    PATTERN_DESC_SIZE = 7
    PATTERN_DATA_START_ADDR_BASE = 80
    PATTERN_LEN_OFFSET = 3
    PATTERN_ADDR_OFFSET = 5
    check_init_eeprom2(EEPROM_ADDR)
}
function initColorMap (maxrow: number, maxcol: number) {
    coloridx = colorlist.indexOf(neopixel.colors(NeoPixelColors.Black))
    colormap = [[coloridx]]
    rowcounter = 0
    colcounter = 0
    for (let index = 0; index < maxrow; index++) {
        for (let index = 0; index < maxcol; index++) {
            colormap[rowcounter].push(coloridx)
            colcounter += 1
        }
        colormap.push([coloridx])
        rowcounter += 1
    }
    coloridx = colorlist.indexOf(neopixel.colors(NeoPixelColors.Red))
}
function check_init_eeprom2 (dev_addr: number) {
    serial.writeValue("check init", 0)
    if (AT24CXX.read_byte(0) == 222) {
        CONFIGURED_EEPROM = true
        pattern_count = AT24CXX.read_byte(PATTERN_CNT_ADDR)
        basic.pause(50)
        serial.writeValue("pattern count", pattern_count)
        if (pattern_count) {
            // Has the address where data has to be written to
            pattern_data_start_addr += pattern_len
            serial.writeValue("last pattern len", pattern_len)
            pattern_id = pattern_count
            pattern_len_memaddr = PATTERN_LEN_OFFSET + PATTERN_DESC_SIZE * pattern_id
            basic.pause(20)
        } else {
            pattern_id = 0
        }
        pattern_data_location_addr_descriptor = PATTERN_ADDR_OFFSET + PATTERN_DESC_SIZE * pattern_id
        AT24CXX.write_word(pattern_data_location_addr_descriptor, pattern_data_start_addr)
        basic.pause(20)
        pattern_len = 0
    } else {
        serial.writeValue("clean eeprom start", 0)
        pattern_count = 0
        pattern_id = 0
        pattern_len_memaddr = PATTERN_LEN_OFFSET
        pattern_data_location_addr_descriptor = PATTERN_ADDR_OFFSET
        pattern_data_start_addr = PATTERN_DATA_START_ADDR_BASE
        AT24CXX.write_byte(0, 222)
        basic.pause(50)
        AT24CXX.write_byte(DISP_TYPE_ADDR, 1)
        basic.pause(50)
        AT24CXX.write_byte(PATTERN_CNT_ADDR, 1)
        basic.pause(50)
        AT24CXX.write_byte(pattern_data_location_addr_descriptor, PATTERN_DATA_START_ADDR_BASE)
        basic.pause(50)
        CONFIGURED_EEPROM = true
    }
    for (let index4 = 0; index4 <= 3 + pattern_id * PATTERN_DESC_SIZE; index4++) {
        serial.writeValue("readeeprom -all header", AT24CXX.read_byte(index4))
        basic.pause(50)
    }
}
function write_from_XYarray () {
    AT24CXX.write_byte(pattern_data_start_addr + pattern_len, writeXarray.shift())
    basic.pause(20)
    pattern_len += 1
    AT24CXX.write_byte(pattern_data_start_addr + pattern_len, writeYarray.shift())
    basic.pause(20)
    pattern_len += 1
    AT24CXX.write_byte(pattern_data_start_addr + pattern_len, WriteColArray.shift())
    basic.pause(20)
    pattern_len += 1
    AT24CXX.write_word(pattern_len_memaddr, pattern_len)
}
function Pattern_reset_and_clr_disp () {
    matrix.clear()
    initColorMap(MAX_ROWS, MAX_COLUMNS)
    pattern_len = 0
    AT24CXX.write_word(pattern_len_memaddr, pattern_len)
}
input.onButtonPressed(Button.AB, function () {
    read_eeprom_and_display2(EEPROM_ADDR, pattern_data_start_addr, pattern_len)
    serial.writeValue("Writing_Done", 0)
})
input.onButtonPressed(Button.B, function () {
    strip.clear()
    matrix.clear()
    matrix.show()
})
function Cursor_to_pos3 (Xval2: number, Yval2: number) {
    if (Xval2 < joy_MIDX) {
        cursorX = Math.round(Math.map(newX, joystk_resX_MIN, joy_MIDX, MAX_COLUMNS - 1, cursorX))
    } else if (Xval2 >= joy_MIDX) {
        cursorX = Math.round(Math.map(newX, joy_MIDX, joystk_resX_MAX, cursorX, 0))
    }
    if (newY < joy_MIDY) {
        cursorY = Math.round(Math.map(newY, joystk_resY_MIN, joy_MIDY, MAX_ROWS - 1, cursorY))
    } else if (newY >= joy_MIDY) {
        cursorY = Math.round(Math.map(newY, joy_MIDY, joystk_resY_MAX, cursorY, 0))
    }
}
function erase_eeprom () {
    for (let index5 = 0; index5 <= 1023; index5++) {
        AT24CXX.write_dword(index5, 0)
        basic.pause(50)
    }
    serial.writeValue("Done", 0)
}
/**
 * / Etch-a-sketch EEPROM data format
 * 
 * // 0: Config Flag = 222 (0xDE)
 * 
 * // 1: <Display type> (0: 8x8; 1:16x16; 2:8x32
 * 
 * // 2: <pattern count>
 * 
 * // --- pattern headers---
 * 
 * // 3,4: <pattern_length>
 * 
 * // 5,6: <pattern_start_addr>
 * 
 * // 7,8,9:  pattern1_name(3)
 * 
 * // 0x50: data start
 * 
 * //
 * 
 * // 0x50,0x51,0x52: <LEDX><LEDY><color_idx> ... repeat
 */
// // Etch-a-sketch EEPROM data format
// 
// 0: 0xDE (means configured)
// 
// 1: <Display type> (0: 8x8; 1:16x16; 2:8x32
// 
// 2: <pattern count>
// 
// // Store 10 patterns
// 
// 3,4: <pattern_length>
// 
// 5,6: <pattern_start_addr>
// 
// 7,8,9: pattern1_name(3)
// 
// // 0x50: data start
// 
// 0x50,0x51: <LED_number><color_idx> ... repeat
function msg_processor (name2: string, value3: number) {
    if (name2.includes("10000x+y")) {
        prevRadioXY = value3
        drawing_now = true
        newX = Math.idiv(value3, 10000)
        newY = value3 - newX * 10000
        Draw_to_pos(newX, newY)
    } else if (name2.includes("coloridx")) {
        prevCol = coloridx
        coloridx += 1
        if (coloridx > 9) {
            coloridx = 0
        }
    } else if (name2.includes("commit")) {
        serial.writeValue(name2, value3)
        drawing_now = false
        write_from_XYarray()
        serial.writeValue("writing pos to eeprom", 0)
        cursorX = x2pos
        cursorY = y2pos
    } else if (name2.includes("cursor")) {
        newX = Math.idiv(value3, 10000)
        newY = value3 - newX * 10000
        Cursor_to_pos3(newX, newY)
    } else if (name2.includes("dispM")) {
        serial.writeValue("disp_mode", 1)
        matrix.clear()
        initColorMap(MAX_ROWS, MAX_COLUMNS)
        DISP_mode = true
        DRAW_NEW_MODE = false
        drawing_now = false
        if (disp_mode_pattern_id > MAX_PATTERNS || disp_mode_pattern_id > pattern_count) {
            disp_mode_pattern_id = 0
            serial.writeValue("From the beginnning", 0)
        } else if (pattern_count == 0) {
            serial.writeValue("nothing to display", 0)
            strip.showRainbow(1, 360)
            strip.show()
            basic.pause(2000)
            strip.clear()
            return
        }
        selected_pattern_len = AT24CXX.read_word(PATTERN_LEN_OFFSET + PATTERN_DESC_SIZE * disp_mode_pattern_id)
        Data_addr_of_pattern_to_disp = AT24CXX.read_word(PATTERN_ADDR_OFFSET + PATTERN_DESC_SIZE * disp_mode_pattern_id)
        serial.writeLine("Displaying pattern id,  data loc and len")
        serial.writeNumbers([
        disp_mode_pattern_id,
        Data_addr_of_pattern_to_disp,
        selected_pattern_len
        ])
        read_eeprom_and_display2(EEPROM_ADDR, Data_addr_of_pattern_to_disp, selected_pattern_len)
        disp_mode_pattern_id += 1
    } else if (name2.includes("drawM")) {
        serial.writeValue("Draw mode", 1)
        DISP_mode = false
        DRAW_NEW_MODE = true
        Pattern_reset_and_clr_disp()
    } else if (name2.includes("save_now")) {
        serial.writeValue("Saving Now", 1)
        matrix.clear()
        Pattern_reset_and_clr_disp()
        check_init_eeprom2(EEPROM_ADDR)
    } else if (name2.includes("memclr")) {
        serial.writeValue("Mem erasing", 0)
        erase_eeprom()
        serial.writeValue("Mem erased", 1)
        check_init_eeprom2(EEPROM_ADDR)
    }
}
let Data_addr_of_pattern_to_disp = 0
let selected_pattern_len = 0
let DRAW_NEW_MODE = false
let DISP_mode = false
let prevCol = 0
let drawing_now = false
let prevRadioXY = 0
let newY = 0
let newX = 0
let pattern_data_location_addr_descriptor = 0
let pattern_data_start_addr = 0
let CONFIGURED_EEPROM = false
let colcounter = 0
let rowcounter = 0
let PATTERN_ADDR_OFFSET = 0
let PATTERN_LEN_OFFSET = 0
let PATTERN_DATA_START_ADDR_BASE = 0
let PATTERN_DESC_SIZE = 0
let MAX_PATTERNS = 0
let PATTERN_CNT_ADDR = 0
let DISP_TYPE_ADDR = 0
let pattern_len_memaddr = 0
let pattern_len = 0
let colormap: number[][] = []
let coloridx_to_set = 0
let draw_at_ledY = 0
let draw_at_ledX = 0
let counter1 = 0
let y2pos = 0
let x2pos = 0
let WriteColArray: number[] = []
let writeYarray: number[] = []
let writeXarray: number[] = []
let bkup_pos_cursor: number[] = []
let msgValArr: number[] = []
let msgNameArr: string[] = []
let coloridx = 0
let colorlist: number[] = []
let matrix: SmartMatrix.Matrix = null
let cursorY = 0
let cursorX = 0
let joy_MIDY = 0
let joy_MIDX = 0
let joystk_resY_MAX = 0
let joystk_resY_MIN = 0
let joystk_resX_MAX = 0
let joystk_resX_MIN = 0
let strip: neopixel.Strip = null
let MAX_COLUMNS = 0
let MAX_ROWS = 0
let EEPROM_ADDR = 0
let disp_mode_pattern_id = 0
let pattern_count = 0
let pattern_id = 0
pattern_id = 0
pattern_count = 0
disp_mode_pattern_id = 0
serial.writeValue("starting now", 0)
EEPROM_ADDR = 80
MAX_ROWS = 8
MAX_COLUMNS = 8
strip = neopixel.create(DigitalPin.P0, MAX_ROWS * MAX_COLUMNS, NeoPixelMode.RGB)
strip.setBrightness(15)
eeprom_Init()
serial.writeValue("eeprom init done", 1)
radio.setGroup(1)
joystk_resX_MIN = 0
joystk_resX_MAX = 1023
joystk_resY_MIN = 0
joystk_resY_MAX = 1023
joy_MIDX = Math.round((joystk_resX_MAX - joystk_resX_MIN) / 2)
joy_MIDY = Math.round((joystk_resY_MAX - joystk_resY_MIN) / 2)
cursorX = Math.round(MAX_ROWS / 2)
cursorY = Math.round(MAX_COLUMNS / 2)
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
matrix.clear()
coloridx = 0
msgNameArr = ["none"]
msgValArr = [3]
bkup_pos_cursor = [3, 3, neopixel.colors(NeoPixelColors.Red)]
disp_mode_pattern_id = 0
initColorMap(MAX_ROWS, MAX_COLUMNS)
serial.writeValue("Init Done", 1)
writeXarray = []
writeYarray = []
WriteColArray = []
basic.forever(function () {
    if (!(drawing_now)) {
        if (bkup_pos_cursor[0] != cursorX || bkup_pos_cursor[1] != cursorY) {
            bkup_pos_cursor = [cursorX, cursorY, colormap[cursorX][cursorY]]
            matrix.setPixel(bkup_pos_cursor[0], bkup_pos_cursor[1], bkup_pos_cursor[2])
            matrix.show()
        }
        if (colormap[cursorX][cursorY] == neopixel.colors(NeoPixelColors.Black)) {
            matrix.setPixel(cursorX, cursorY, colorlist[coloridx])
            matrix.show()
            basic.pause(20)
            matrix.setPixel(cursorX, cursorY, neopixel.colors(NeoPixelColors.Black))
            matrix.show()
            basic.pause(20)
        } else if (colormap[cursorX][cursorY] != neopixel.colors(NeoPixelColors.Black)) {
            if (bkup_pos_cursor[0] != cursorX || bkup_pos_cursor[1] != cursorY) {
                bkup_pos_cursor = [cursorX, cursorY, colormap[cursorX][cursorY]]
                matrix.setPixel(cursorX, cursorY, colorlist[coloridx])
                matrix.show()
            }
        }
    } else {
        matrix.setPixel(x2pos, y2pos, colorlist[coloridx])
        matrix.show()
        basic.pause(20)
        matrix.setPixel(x2pos, y2pos, neopixel.colors(NeoPixelColors.Black))
        matrix.show()
        basic.pause(20)
        matrix.setPixel(x2pos, y2pos, colorlist[coloridx])
        matrix.show()
    }
    if (msgValArr.length > 0) {
        msg_processor(msgNameArr.shift(), msgValArr.shift())
    }
})
