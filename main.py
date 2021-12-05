"""

10181022

temp = 1018

y2pos=10181022-(10180000)

=1022

"""
def dummyInit():
    global colormap
    colormap = [[neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)],
        [neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK),
            neopixel.colors(NeoPixelColors.BLACK)]]
    return colormap
def clear_buffer():
    global my_selX, my_selY
    my_selX = [cursorX]
    my_selY = [cursorY]
def Draw_to_pos(Xval: number, Yval: number):
    global x2pos, y2pos
    if Xval < joy_MIDX:
        x2pos = Math.round(Math.map(Xval, joystk_resX_MIN, joy_MIDX, MAX_COLUMNS - 1, cursorX))
    elif Xval >= joy_MIDX:
        x2pos = Math.round(Math.map(Xval, joy_MIDX, joystk_resX_MAX, cursorX, 0))
    if Yval < joy_MIDY:
        y2pos = Math.round(Math.map(Yval, joystk_resY_MIN, joy_MIDY, MAX_ROWS - 1, cursorY))
    elif Yval >= joy_MIDY:
        y2pos = Math.round(Math.map(Yval, joy_MIDY, joystk_resY_MAX, cursorY, 0))
def UpdateMap(map_Row_Pos: number, map_Col_Pos: number, map_Col: number):
    colormap[map_Row_Pos][map_Col_Pos] = map_Col

def on_button_pressed_a():
    global bkup_pos_cursor
    matrix.clear()
    matrix.show()
    bkup_pos_cursor = [cursorX, cursorY, neopixel.colors(NeoPixelColors.BLACK)]
input.on_button_pressed(Button.A, on_button_pressed_a)

def initColorMap(maxrow: number, maxcol: number):
    global colormap, rowcounter, colcounter
    colormap = [[neopixel.colors(NeoPixelColors.BLACK)]]
    rowcounter = 0
    colcounter = 0
    for index in range(maxrow):
        for index2 in range(maxcol):
            colormap[rowcounter].append(neopixel.colors(NeoPixelColors.BLACK))
            colcounter += 1
        colormap.append([neopixel.colors(NeoPixelColors.BLACK)])
        rowcounter += 1
def Cursor_to_pos3(Xval2: number, Yval2: number):
    global cursorX, cursorY
    if Xval2 < 512:
        cursorX = Math.round(Math.map(newX, 0, 512, 7, cursorX))
    elif Xval2 >= 512:
        cursorX = Math.round(Math.map(newX, 513, 1023, cursorX, 0))
    if newY < 512:
        cursorY = Math.round(Math.map(newY, 0, 512, 7, cursorY))
    elif newY >= 512:
        cursorY = Math.round(Math.map(newY, 513, 1023, cursorY, 0))
def Print_Color_map():
    global rowcounter
    rowcounter = 0
    for value in colormap:
        serial.write_value("row num", rowcounter)
        serial.write_numbers(value)
        rowcounter += 1

def on_button_pressed_ab():
    serial.write_value("starting write len", len(my_selX))
    index3 = 0
    while index3 <= len(my_selX) - 1:
        matrix.set_pixel(my_selX[index3],
            my_selY[index3],
            colormap[my_selX[index3]][my_selY[index3]])
        matrix.show()
        index3 += 1
    serial.write_value("starting write", 0)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def display_from_map(maxrox: number, maxcol2: number):
    global rowcounter, colcounter
    rowcounter = 0
    colcounter = 0
    matrix.brightness(15)
    for index4 in range(maxrox):
        for index5 in range(maxcol2):
            matrix.set_pixel(rowcounter, colcounter, colormap[rowcounter][colcounter])
            matrix.show()
            colcounter += 1
        colcounter = 0
        rowcounter += 1
def update_x2y2():
    pass
def Panel_test(maxrow2: number, maxcol3: number):
    panel_sweep(1)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.GREEN))
    basic.pause(500)
    display_from_map(maxrow2, maxcol3)
    UpdateMap(4, 5, neopixel.colors(NeoPixelColors.BLACK))
    display_from_map(maxrow2, maxcol3)
    basic.pause(500)
    Print_Color_map()
    matrix.clear()

def on_button_pressed_b():
    serial.write_numbers(my_selX)
    serial.write_numbers(my_selY)
    initColorMap(MAX_ROWS, MAX_COLUMNS)
    clear_buffer()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value2):
    msgNameArr.append(name)
    msgValArr.append(value2)
    serial.write_value("msg len", len(msgValArr))
radio.on_received_value(on_received_value)

def Cursor_to_pos2(Xval3: number, Yval3: number):
    global cursorX, cursorY
    if Xval3 < 512:
        cursorX += -1
        if cursorX < 0:
            cursorX = 0
    elif Xval3 >= 512:
        cursorX += 1
        if cursorX > MAX_COLUMNS:
            cursorX = MAX_COLUMNS
    if newY < 512:
        cursorY += -1
        if cursorY < 0:
            cursorY = 0
    elif newY >= 512:
        cursorY += 1
        if cursorY > MAX_ROWS:
            cursorY = MAX_ROWS
def msg_processor(name2: str, value3: number):
    global prevRadioXY, drawing_now, newX, newY, prevCol, coloridx, cursorX, cursorY
    if name2.includes("10000x+y"):
        if value3 != prevRadioXY:
            serial.write_value(name2, value3)
            prevRadioXY = value3
            drawing_now = True
            newX = Math.idiv(value3, 10000)
            newY = value3 - newX * 10000
            Draw_to_pos(newX, newY)
            my_selX.append(x2pos)
            my_selY.append(y2pos)
            UpdateMap(x2pos, y2pos, colorlist[coloridx])
            matrix.set_pixel(x2pos, y2pos, colorlist[coloridx])
            matrix.show()
    elif name2.includes("coloridx"):
        serial.write_value(name2, value3)
        prevCol = coloridx
        coloridx += 1
        if coloridx > 9:
            coloridx = 0
    elif name2.includes("draw"):
        serial.write_value(name2, value3)
        cursorX = x2pos
        cursorY = y2pos
        drawing_now = False
    elif name2.includes("cursor"):
        newX = Math.idiv(value3, 10000)
        newY = value3 - newX * 10000
        Cursor_to_pos3(newX, newY)
def panel_sweep(iteration: number):
    global row_num, col_num
    row_num = 7
    col_num = 0
    for index6 in range(8):
        for index7 in range(8):
            matrix.set_pixel(row_num, col_num, colorlist._pick_random())
            matrix.show()
            col_num += 1
            basic.pause(20)
            matrix.clear()
        col_num = 0
        row_num += -1
    row_num = 7
col_num = 0
row_num = 0
prevCol = 0
drawing_now = False
prevRadioXY = 0
newY = 0
newX = 0
colcounter = 0
rowcounter = 0
y2pos = 0
x2pos = 0
my_selY: List[number] = []
my_selX: List[number] = []
colormap: List[List[number]] = []
bkup_pos_cursor: List[number] = []
msgValArr: List[number] = []
msgNameArr: List[str] = []
coloridx = 0
colorlist: List[number] = []
matrix: SmartMatrix.Matrix = None
cursorY = 0
cursorX = 0
MAX_COLUMNS = 0
MAX_ROWS = 0
joy_MIDY = 0
joy_MIDX = 0
joystk_resY_MAX = 0
joystk_resY_MIN = 0
joystk_resX_MAX = 0
joystk_resX_MIN = 0
radio.set_group(1)
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
matrix = SmartMatrix.create(DigitalPin.P0, MAX_COLUMNS, MAX_ROWS, NeoPixelMode.RGB)
colorlist = [neopixel.colors(NeoPixelColors.RED),
    neopixel.colors(NeoPixelColors.ORANGE),
    neopixel.colors(NeoPixelColors.YELLOW),
    neopixel.colors(NeoPixelColors.GREEN),
    neopixel.colors(NeoPixelColors.BLUE),
    neopixel.colors(NeoPixelColors.INDIGO),
    neopixel.colors(NeoPixelColors.VIOLET),
    neopixel.colors(NeoPixelColors.PURPLE),
    neopixel.colors(NeoPixelColors.WHITE),
    neopixel.colors(NeoPixelColors.BLACK)]
matrix.brightness(15)
initColorMap(MAX_ROWS, MAX_COLUMNS)
matrix.clear()
coloridx = 0
serial.write_value("x", 0)
clear_buffer()
msgNameArr = []
msgValArr = []
bkup_pos_cursor = [3, 3, neopixel.colors(NeoPixelColors.RED)]

def on_forever():
    global bkup_pos_cursor
    if not (drawing_now):
        if bkup_pos_cursor[0] != cursorX or bkup_pos_cursor[1] != cursorY:
            serial.write_value("a", 1)
            bkup_pos_cursor = [cursorX, cursorY, colormap[cursorX][cursorY]]
            matrix.set_pixel(bkup_pos_cursor[0], bkup_pos_cursor[1], bkup_pos_cursor[2])
            matrix.show()
        if colormap[cursorX][cursorY] == neopixel.colors(NeoPixelColors.BLACK):
            serial.write_value("a", 2)
            matrix.set_pixel(cursorX, cursorY, colorlist[coloridx])
            matrix.show()
            basic.pause(20)
            matrix.set_pixel(cursorX, cursorY, neopixel.colors(NeoPixelColors.BLACK))
            matrix.show()
            basic.pause(20)
        elif colormap[cursorX][cursorY] != neopixel.colors(NeoPixelColors.BLACK):
            serial.write_value("a", 3)
            if bkup_pos_cursor[0] != cursorX or bkup_pos_cursor[1] != cursorY:
                serial.write_value("a", 4)
                bkup_pos_cursor = [cursorX, cursorY, colormap[cursorX][cursorY]]
                matrix.set_pixel(cursorX, cursorY, colorlist[coloridx])
                matrix.show()
    if len(msgValArr) > 0:
        msg_processor(msgNameArr.shift(), msgValArr.shift())
basic.forever(on_forever)
