var gShape

function createShape(pos) {
    gShape = {
        pos,
        size: document.querySelector('input[name=size]').value,
        color: document.querySelector('input[name=color]').value,
        isDrag: false
    }
    console.log('shape created', gShape);
}

function getShape() {
    return gShape
}

function setShapeDrag(isDrag) {
    gShape.isDrag = isDrag
}

function moveShape(dx, dy) {
    gShape.pos.x = dx
    gShape.pos.y = dy

}