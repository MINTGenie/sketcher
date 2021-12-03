def test_all():
    global y, x
    for index in range(8):
        for index2 in range(8):
            matrix.set_pixel(x,
                y,
                neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            matrix.show()
            y += 1
            basic.pause(100)
            matrix.clear()
        y = 0
        x += -1
    x = 7
y = 0
x = 0
matrix: SmartMatrix.Matrix = None
matrix = SmartMatrix.create(DigitalPin.P0, 8, 8, NeoPixelMode.RGB)
matrix.clear()
matrix.brightness(20)
matrix.show()
x = 7
y = 0

def on_forever():
    pass
basic.forever(on_forever)
