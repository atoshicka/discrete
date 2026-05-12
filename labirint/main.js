const CELL = 28;
const W = 2;

let mazeData = null;
let wallSet = null;
let W_count = 0, H_count = 0;
let startX = 0, startY = 0, endX = 0, endY = 0;
let animTimer = null;

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const statusEl = document.getElementById('status');
const btnLoad = document.getElementById('btnLoad');
const fileInput = document.getElementById('fileInput');
const btnBFS = document.getElementById('btnBFS');
const btnReset = document.getElementById('btnReset');
const speedSlider = document.getElementById('speedSlider');

speedSlider.addEventListener('input', () =>
  document.getElementById('speedVal').textContent = speedSlider.value
);

btnLoad.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      applyMazeData(data);
    } catch {
      setStatus('не удалось прочитать JSON');
    }
  };
  reader.readAsText(file);
});

function applyMazeData(data) {
  mazeData = data;
  W_count = data.width;
  H_count = data.height;
  startX = data.start[0]; startY = data.start[1];
  endX = data.end[0]; endY = data.end[1];

  wallSet = new Set(data.walls.map(([x, y, d]) => `${x},${y},${d}`));

  resizeCanvas();
  drawMaze();
  setButtons('ready');
}

function hasWall(x, y, dir) {
  return wallSet.has(`${x},${y},${dir}`);
}

function resizeCanvas() {
  canvas.width = W_count * CELL + W;
  canvas.height = H_count * CELL + W;
}

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f5f2eb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = W;
  ctx.lineCap = 'square';

  for (let y = 0; y < H_count; y++) {
    for (let x = 0; x < W_count; x++) {
      const px = x * CELL;
      const py = y * CELL;

      ctx.beginPath();
      if (hasWall(x, y, 0)) { ctx.moveTo(px, py); ctx.lineTo(px + CELL, py); } // top
      if (hasWall(x, y, 1)) { ctx.moveTo(px + CELL, py); ctx.lineTo(px + CELL, py + CELL); } // right
      if (hasWall(x, y, 2)) { ctx.moveTo(px, py + CELL); ctx.lineTo(px + CELL, py + CELL); } // bottom
      if (hasWall(x, y, 3)) { ctx.moveTo(px, py); ctx.lineTo(px, py + CELL); } // left
      ctx.stroke();
    }
  }

  drawDot(startX, startY, '#2ecc71');
  drawDot(endX,endY, '#c0392b');
}

function drawDot(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, CELL * 0.28, 0, Math.PI * 2);
  ctx.fill();
}

function shadeCell(x, y, color) {
  if ((x === startX && y === startY) || (x === endX && y === endY)) return;
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL + W, y * CELL + W, CELL - W * 2, CELL - W * 2);
}

function animate(visitOrder, path) {
  const delay = () => Math.max(5, 110 - parseInt(speedSlider.value) * 10);
  let i = 0;

  function tickVisit() {
    if (i < visitOrder.length) {
      shadeCell(visitOrder[i][0], visitOrder[i][1], '#8bc6ed');
      setStatus(`посещено ${++i} / ${visitOrder.length}`);
      animTimer = setTimeout(tickVisit, delay());
    } else {
      tickPath(0);
    }
  }

  function tickPath(j) {
    if (j < path.length) {
      shadeCell(path[j][0], path[j][1], '#2980b9');
      animTimer = setTimeout(() => tickPath(j + 1), delay() * 2);
    } else {
      drawDot(startX, startY, 'green');
      drawDot(endX, endY, 'red');
      setStatus(path.length ? `путь содержит ${path.length} клеток` : 'путь не найден');
      setButtons('ready');
    }
  }

  tickVisit();
}

btnBFS.addEventListener('click', () => {
  cancelAnim();
  drawMaze();
  setButtons('busy');

  const visitOrder = mazeData.bfs_visited_order;
  const path = mazeData.shortest_path;

  animate(visitOrder, path);
});

btnReset.addEventListener('click', () => {
  cancelAnim();
  drawMaze();
  setStatus('сброшено');
  setButtons('ready');
});

function cancelAnim() { 
  clearTimeout(animTimer); 
}

function setStatus(msg) { 
  statusEl.textContent = msg; 
}

function setButtons(state) {
  btnLoad.disabled  = state === 'busy';
  btnBFS.disabled = state !== 'ready';
  btnReset.disabled = state !== 'ready';
}

setButtons('idle');