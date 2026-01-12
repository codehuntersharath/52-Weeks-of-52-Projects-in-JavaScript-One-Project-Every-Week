const basicClick = document.getElementById("Basic"),
  advancedClick = document.getElementById("Advanced");

const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 400;

createBasicChart();
function createBasicChart() {
  const datas = [
    {
      value: 10,
    },
    {
      value: 15,
    },
    {
      value: 5,
    },
    {
      value: 7.5,
    },
    {
      value: 1,
    },
    {
      value: 11,
    },
    {
      value: 4,
    },
    {
      value: 4,
    },
    {
      value: 4,
    },
    {
      value: 1,
    },
  ];

  const maximum = datas.reduce((acc, loc) =>
    acc.value > loc.value ? acc : loc
  );

  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  datas.forEach((data, i) => {
    lastY =
      canvas.height - Math.floor((data.value / maximum.value) * canvas.height);
    lastX = Math.floor(canvas.width / datas.length) * i;
    i === 0 && ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX, lastY);
    ctx.strokeStyle = "#ffffff";
    ctx.fillText(data.value, lastX + 15, lastY + 10);
  });
  ctx.stroke();
}

function createAdvancedChart() {
  H = canvas.height;
  W = canvas.width;
  dataY = [
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  dataX = [100, 150, 160, 250, 260, 100, 360];

  un = Math.round((Math.max(...dataX) - Math.min(...dataX)) / 10);
  ys = (W - 40) / dataY.length;
  dataT = [];

  chartLine();
  diagram();
  data();
  draw();
  pointes();

  function diagram() {
    y = 60;
    x = 1;
    ctx.strokeStyle = "#a7a7a7";
    while (y < W) {
      ctx.beginPath();
      ctx.moveTo(y, 0);
      ctx.lineTo(y, H - 40);
      ctx.stroke();
      y += 30;
    }
    while (x < H - 30) {
      ctx.beginPath();
      ctx.moveTo(60, x);
      ctx.lineTo(W - 10, x);
      ctx.stroke();
      x += 30;
    }
  }

  function chartLine() {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(60, 0);
    ctx.lineTo(60, H - 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(W - 10, H - 40);
    ctx.lineTo(60, H - 40);
    ctx.stroke();
  }

  function draw() {
    ctx.save();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    y = 60;
    height = H - 30;
    line = 30;
    start = 30;
    for (data of dataX) {
      (max = Math.max(...dataX)), (test = 30);
      while (max > data) {
        max = max - 1;
        test += line / un;
      }
      ctx.lineTo(30 + y, test);
      x = 30;
      y += ys;
    }
    ctx.stroke();
    ctx.restore();
  }

  function pointes() {
    ctx.fillStyle = "#0b95d3";
    y = 60;
    height = H - 30;
    line = 30;
    start = 30;
    for (data of dataX) {
      (max = Math.max(...dataX)), (test = 30);
      while (max > data) {
        max = max - 1;
        test += line / un;
      }
      circle(30 + y, test);
      dataT.push({
        data:
          Math.round(test) + "," + Math.round(30 + y) + "," + Math.round(data),
      });
      x = 30;
      y += ys;
    }
    ctx.stroke();
  }

  function data() {
    y = 60;
    x = 30;
    n = Math.max(...dataX);
    for (yData of dataY) {
      ctx.font = "12px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(yData, y, H - 10);
      y += ys;
    }
    while (x < H - 30) {
      ctx.font = "11px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(n, 10, x + 5);
      n = n - un;
      x += 30;
    }
  }

  function circle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

basicClick.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createBasicChart();
});

advancedClick.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createAdvancedChart();
});
