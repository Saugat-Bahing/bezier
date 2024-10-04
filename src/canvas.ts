export function clearCanvas(canvas: HTMLCanvasElement, bgColor = '#1D1D1D'){
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = bgColor;
    ctx.rect(0, 0, width, height);
    ctx.fill();
}