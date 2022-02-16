var gElCanvas
var gCtx
var gStartPos
var gPrevX
var gPrevY
var gCurrShape = document.querySelector('select').value
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
        // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        // createShape(center)

    addListeners()
        // renderCanvas()
}

function renderCanvas(ev) {
    gCtx.save()
    gCtx.fillStyle = "#ede5ff"
        // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderShape(ev)
    gCtx.restore()
}

function renderShape(ev) {
    const { pos, color, size } = getShape()
        // drawArc(pos.x, pos.y, size, color)
    draw(ev)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    const pos = getEvPos(ev)
    const location = { x: pos.x, y: pos.y }
    createShape(location)
    if (gTouchEvs.includes(ev.type)) {
        ev.offsetX = pos.x
        ev.offsetY = pos.y
        draw(ev)
    }

    console.log('onDown()');
    // if (!isCircleClicked(pos)) return
    setShapeDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    console.log('onMove()');
    const shape = getShape();
    if (!shape) return
    if (shape.isDrag) {
        const pos = getEvPos(ev)
            // const dx = pos.x - gStartPos.x
            // const dy = pos.y - gStartPos.y
        if (gTouchEvs.includes(ev.type)) {
            ev.offsetX = pos.x
            ev.offsetY = pos.y
        }
        const dx = pos.x;
        const dy = pos.y;
        moveShape(dx, dy)
        gStartPos = pos
        renderCanvas(ev)
    }
}

function onUp() {
    console.log('onUp()');
    setShapeDrag(false)
    document.body.style.cursor = 'grab'
    gPrevX = undefined
    gPrevY = undefined
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'Masterpiece';
}

function drawArc(x, y, size, clr) {
    gCtx.beginPath()
    gCtx.lineWidth = '1'
    gCtx.arc(x, y, size / 2, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.fillStyle = clr
    gCtx.fill()
}

function drawRect(x, y, size, clr) {
    console.log('rect');
    gCtx.beginPath();
    gCtx.rect(x - size / 2, y - size / 2, size, size);
    gCtx.fillStyle = clr;
    gCtx.fillRect(x - size / 2, y - size / 2, size, size);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function drawLine(x, y, size, clr) {
    gCtx.beginPath()
    gCtx.lineWidth = size / 10
    gCtx.moveTo(gPrevX, gPrevY)

    gCtx.lineTo(x, y)
    gCtx.strokeStyle = clr
    gCtx.stroke()
    gCtx.closePath()
    gPrevX = x
    gPrevY = y
}

function drawTriangle(x, y, size, clr) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.moveTo(x, y)
    var size1 = 0 - size
    console.log('size', size1)

    gCtx.lineTo(x - size1, y - size1)
    gCtx.lineTo(x + size1, y - size1)
        // gCtx.lineTo(x + size, y + size)
        // gCtx.lineTo(x - size, y + size)
    gCtx.closePath()
        // gCtx.lineTo(x, y);
    gCtx.fillStyle = clr
    gCtx.fill()
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.closePath()
}

function setShape() {
    gCurrShape = document.querySelector('select').value
    console.log(gCurrShape)
}

function draw(ev) {
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;
    console.log(offsetX, offsetY)
    const clr = getShape().color
    const size = getShape().size
        // console.log(size);
        // const { offsetX, offsetY } = ev
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY, size, clr);
            break;
        case 'arc':
            drawArc(offsetX, offsetY, size, clr);
            break;
        case 'rect':
            drawRect(offsetX, offsetY, size, clr);
            break;
        case 'text':
            drawText('שלום', offsetX, offsetY);
            break;
        case 'line':
            drawLine(offsetX, offsetY, size, clr);
            break;
    }
}