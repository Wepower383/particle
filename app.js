
document.getElementById('startBtn').addEventListener('click', () => {
  alert('Wire mode: Click two components to draw a wire.');
});

const canvas = document.getElementById('wiringCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let clickCount = 0;
let points = [];

canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  points.push({ x, y });
  clickCount++;

  if (clickCount === 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    points = [];
    clickCount = 0;
  }
});
