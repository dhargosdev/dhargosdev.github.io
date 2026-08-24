import pyxel

pyxel.init(320, 200, title="Up, up and away", fps=50)

fuente = pyxel.Font("ZX Eurostile.bdf")

pyxel.images[0].set(0, 0,
    [
        "000000000ddddddd00000000",
        "0000000ddddddddddd000000",
        "000000ddddddddddddd00000",
        "000000ddddd55dddddd00000",
        "00000ddddd5dd55ddddd0000",
        "00000ddddd5ddddddddd0000",
        "00000ddddd5dd88ddddd0000",
        "000000ddddd55dddddd00000",
        "000000ddddddddddddd00000",
        "000000ddddddddddddd00000",
        "00000010ddddddddd0100000",
        "000000010ddddddd01000000",
        "0000000100ddddd001000000",
        "00000000100ddd0010000000",
        "00000000100ddd0010000000",
        "000000000100100100000000",
        "000000000100100100000000",
        "000000000044444000000000",
        "000000000044444000000000",
        "000000000044444000000000",
        "000000000004440000000000"
    ])

x = pyxel.width / 2
y = pyxel.height / 2
dx = 1
dy = -1

def update():
    global x
    global y
    global dx
    global dy

    x = x + dx
    y = y + dy

    if x <= 0 or x >= (pyxel.width - 24) :
        dx = -dx
    if y <= 0 or y >= (pyxel.height - 21):
        dy = -dy

def draw():
    pyxel.cls(pyxel.COLOR_BLACK)
    pyxel.blt(x, y, 0, 0, 0, 24, 21, colkey=pyxel.COLOR_BLACK)
    pyxel.text(8, 8, "Up, up and away", pyxel.COLOR_WHITE, fuente)

pyxel.run(update, draw)