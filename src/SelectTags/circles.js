const EPS = 10;
const R = 100;

let WINDOW_HEIGHT = 300;
let WINDOW_WIDTH = 800;
let MAX_LENGTH = 12;

function distance(a, b) {
  return Math.sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

/*
 * Рисует до 8-ми окружностей вокруг circle
 */
function drawAround(index, circles) {
  for (let i = 0; i < 8; i++) {
    // Генерируем точку вокруг окружности
    phi = Math.random() * 2 * Math.PI;
    point = {
      x: (circles[index].x + (2*R+EPS) * Math.cos(phi)),
      y: (circles[index].y + (2*R+EPS) * Math.sin(phi))
    };

    // Проверяем будущую окружность
    // на пересечение с существующими
    let isCollide = false;
    // for (let j = 0; j < circles.length; j++) {
    //   isCollide = isCollide || distance(circles[j], point) < 2 * R;
    // }

    // isCollide = isCollide || (point.x <= R || point.x >= WINDOW_WIDTH - R);
    // isCollide = isCollide || (point.y <= R || point.y >= WINDOW_HEIGHT - R);

    if (!isCollide && circles.length != MAX_LENGTH) {
      circles.push(point);
    }
  }

  return [...circles];
}
/**
 * 
 * 
 * @param {Number} max 
 * @param {Number} width 
 * @param {Number} height 
 * @returns 
 */
export const generateCircles = (max, width, height) => {
  MAX_LENGTH = max;
  WINDOW_WIDTH = width;
  WINDOW_HEIGHT = height;
  circles = [];
  circles.push({
    x: R,
    y: R
  });

  let i = 0;
  circles = drawAround(i, circles);
  // while (circles.length != MAX_LENGTH) {
  //   let circlesNew = drawAround(i, circles);
  //   if (circles.length < circlesNew.length) {
  //     i += 1;
  //     circles = circlesNew;
  //   }
  //   if (i === MAX_LENGTH) i = 0;
  // }
  return circles;
};

export default generateCircles;
