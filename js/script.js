let currentObj = null;
let dropObj = null;
let speed = 700;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rotate = document.getElementById('rotate');
const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');
const direction = {
  vertical: 'vertical',
  horizontal: 'horizontal',
  up: 'up',
  left: 'left',
  right: 'right',
  down: 'down'
};
const squares = [
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
];

class IBlock {
  grids = [];
  color = 'aqua';
  shadowColor = 'rgba(0, 255, 255, 0.3)';
  direction = direction.horizontal;

  create() {
    for (let i = 8; i < 12; i++) {
      if (squares[0][i] === null) {
        squares[0][i] = this.color;
        this.grids.push({row: 0, col: i});
      }
    }
  }

  drop() {
    if (
      this.grids[0].row === 39 ||
      (
        this.direction === direction.horizontal && !this.canDropHorizontal() ||
        this.direction === direction.vertical && !this.canDropVertical()
      )
    ) {
      stopDropping();
    } else {
      for (let i = 0; i < this.grids.length; i++) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].row++;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    if (this.direction === direction.horizontal) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        ctx.fill();
      }
    } else {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        ctx.fillRect(this.grids[i].col * 20, (bottomPoint - i) * 20, 20, 20);
        ctx.fill();
      }
    }
  }

  rotate() {
    if (this.direction === direction.horizontal) {
      this.direction = direction.vertical;
      const pivot = this.grids[2];
      if (
        squares[pivot.row + 2][pivot.col] === null &&
        squares[pivot.row + 1][pivot.col] === null &&
        squares[pivot.row - 1][pivot.col] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += 2 - i;
          this.grids[i].col += 2 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        squares[pivot.row + 1][pivot.col] === null &&
        squares[pivot.row - 1][pivot.col] === null &&
        squares[pivot.row - 2][pivot.col] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += 1 - i;
          this.grids[i].col += 2 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        squares[pivot.row - 1][pivot.col] === null &&
        squares[pivot.row - 2][pivot.col] === null &&
        squares[pivot.row - 3][pivot.col] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row -= i;
          this.grids[i].col -= 2 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else {
      this.direction = direction.horizontal;
      const pivot = this.grids[1];
      if (
        squares[pivot.row][pivot.col - 2] === null &&
        squares[pivot.row][pivot.col - 1] === null &&
        squares[pivot.row][pivot.col + 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += i - 1;
          this.grids[i].col += i - 2;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        squares[pivot.row + 1][pivot.col - 2] === null &&
        squares[pivot.row + 1][pivot.col - 1] === null &&
        squares[pivot.row + 1][pivot.col + 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += i;
          this.grids[i].col += i - 2;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveLeft() {
    if (
      this.grids[0].col !== 0 &&
      (
        this.direction === direction.horizontal &&
        squares[this.grids[0].row][this.grids[0].col - 1] === null ||
        this.direction === direction.vertical &&
        squares[this.grids[0].row][this.grids[0].col - 1] === null &&
        squares[this.grids[1].row][this.grids[1].col - 1] === null &&
        squares[this.grids[2].row][this.grids[2].col - 1] === null &&
        squares[this.grids[3].row][this.grids[3].col - 1] === null
      )
    ) {
      for (let i = 0; i < this.grids.length; i++) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].col--;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      this.grids[3].col !== 19 &&
      (
        this.direction === direction.horizontal &&
        squares[this.grids[3].row][this.grids[3].col + 1] === null ||
        this.direction === direction.vertical &&
        squares[this.grids[0].row][this.grids[0].col + 1] === null &&
        squares[this.grids[1].row][this.grids[1].col + 1] === null &&
        squares[this.grids[2].row][this.grids[2].col + 1] === null &&
        squares[this.grids[3].row][this.grids[3].col + 1] === null
      )
    ) {
      for (let i = this.grids.length - 1; i >= 0; i--) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].col++;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (this.direction === direction.horizontal) {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row = bottomPoint;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row = bottomPoint - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    if (this.direction === direction.horizontal) {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 1; i < 4; i++) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row - 1) {
              bottomPoint = row - 1;
            }
            break;
          }
        }
      }
    } else {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
    }
    return bottomPoint;
  }

  canDropHorizontal() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropVertical() {
    let canDrop = true;
    if (squares[this.grids[0].row + 1][this.grids[0].col] !== null) {
      canDrop = false;
    }
    return canDrop;
  }
}

class OBlock {
  grids = [];
  color = 'yellow';
  shadowColor = 'rgba(255, 255, 0, 0.3)';

  create() {
    for (let i = 9; i < 11; i++) {
      if (squares[1][i] === null) {
        squares[1][i] = this.color;
        this.grids.push({row: 1, col: i});
      }
    }
    for (let i = 9; i < 11; i++) {
      if (squares[0][i] === null) {
        squares[0][i] = this.color;
        this.grids.push({row: 0, col: i});
      }
    }
  }

  drop() {
    if (this.grids[0].row === 39 || !this.canDrop()) {
      stopDropping();
    } else {
      for (let i = 0; i < this.grids.length; i++) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].row++;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    for (let i = 0; i < this.grids.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.shadowColor;
      if (i < 2) {
        ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
      } else {
        ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
      }
      ctx.fill();
    }
  }

  moveLeft() {
    if (
      this.grids[0].col !== 0 &&
      squares[this.grids[0].row][this.grids[0].col - 1] === null &&
      squares[this.grids[2].row][this.grids[2].col - 1] === null
    ) {
      for (let i = 0; i < this.grids.length; i++) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].col--;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      this.grids[1].col !== 19 &&
      squares[this.grids[1].row][this.grids[1].col + 1] === null &&
      squares[this.grids[3].row][this.grids[3].col + 1] === null
    ) {
      for (let i = this.grids.length - 1; i >= 0; i--) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].col++;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (
      this.grids[0].row !== 39 &&
      squares[this.grids[0].row + 1][this.grids[0].col] === null &&
      squares[this.grids[1].row + 1][this.grids[1].col] === null
    ) {
      const bottomPoint = this.getBottomPoint();
      for (let i = this.grids.length - 1; i >= 0; i--) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        if (i < 2) {
          this.grids[i].row = bottomPoint;
        } else {
          this.grids[i].row = bottomPoint - 1;
        }
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    for (let row = this.grids[0].row + 1; row < 40; row++) {
      if (squares[row][this.grids[0].col] !== null) {
        bottomPoint = row - 1;
        break;
      }
    }
    if (bottomPoint === undefined) {
      bottomPoint = 39;
    }
    for (let row = this.grids[1].row + 1; row < 40; row++) {
      if (squares[row][this.grids[1].col] !== null) {
        if (bottomPoint > row - 1) {
          bottomPoint = row - 1;
        }
        break;
      }
    }
    return bottomPoint;
  }

  canDrop() {
    let canDrop = true;
    for (let i = 0; i < 2; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }
}

class SBlock {
  grids = [];
  color = 'green';
  shadowColor = 'rgba(0, 128, 0, 0.3)';
  direction = direction.horizontal;

  create() {
    for (let i = 10; i > 8; i--) {
      if (squares[0][i] === null) {
        squares[0][i] = this.color;
        this.grids.push({row: 0, col: i});
      }
    }
    for (let i = 9; i > 7; i--) {
      if (squares[1][i] === null) {
        squares[1][i] = this.color;
        this.grids.push({row: 1, col: i});
      }
    }
  }

  drop() {
    if (
      this.direction === direction.horizontal &&
      (
        this.grids[3].row === 39 ||
        !this.canDropHorizontal()
      ) ||
      this.direction === direction.vertical &&
      (
        this.grids[3].row === 39 ||
        !this.canDropVertical()
      )
    ) {
      stopDropping();
    } else {
      for (let i = this.grids.length - 1; i >= 0; i--) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].row++;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    if (this.direction === direction.horizontal) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i < 2) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        }
        ctx.fill();
      }
    } else {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i < 2) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint + i - 2) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint + i - 3) * 20, 20, 20);
        }
        ctx.fill();
      }
    }
  }

  rotate() {
    if (this.direction === direction.horizontal) {
      this.direction = direction.vertical;
      const pivot = this.grids[2];
      if (
        squares[pivot.row - 1][pivot.col - 1] === null &&
        squares[pivot.row + 1][pivot.col] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 1) {
            this.grids[i].row += 1;
          }
          this.grids[i].col += i - 2;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else {
      this.direction = direction.horizontal;
      const pivot = this.grids[2];
      if (
        pivot.col !== 19 &&
        squares[pivot.row][pivot.col + 1] === null &&
        squares[pivot.row + 1][pivot.col - 1] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1;
          }
          this.grids[i].col += 2 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        pivot.col === 19 &&
        squares[pivot.row + 1][pivot.col - 1] === null &&
        squares[pivot.row + 1][pivot.col - 2] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1;
          }
          this.grids[i].col += 1 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveLeft() {
    if (
      squares[this.grids[3].row][this.grids[3].col - 1] === null &&
      squares[this.grids[1].row][this.grids[1].col - 1] === null &&
      (
        this.direction === direction.horizontal &&
        this.grids[3].col !== 0 ||
        this.direction === direction.vertical &&
        this.grids[0].col !== 0 &&
        squares[this.grids[0].row][this.grids[0].col - 1] === null
      )
    ) {
      if (this.direction === direction.horizontal) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col -= 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col -= 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      squares[this.grids[0].row][this.grids[0].col + 1] === null &&
      squares[this.grids[2].row][this.grids[2].col + 1] === null &&
      (
        this.direction === direction.horizontal &&
        this.grids[0].col !== 19 ||
        this.direction === direction.vertical &&
        this.grids[3].col !== 19 &&
        squares[this.grids[3].row][this.grids[3].col + 1] === null
      )
    ) {
      if (this.direction === direction.horizontal) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col += 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col += 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (this.direction === direction.horizontal) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - (2 - i);
          } else {
            this.grids[i].row = bottomPoint - (3 - i);
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    if (this.direction === direction.horizontal) {
      for (let row = this.grids[2].row + 1; row < 40; row++) {
        if (squares[row][this.grids[2].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          if (bottomPoint > row - 1) {
            bottomPoint = row - 1;
          }
          break;
        }
      }
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          if (bottomPoint > row) {
            bottomPoint = row;
          }
          break;
        }
      }
    } else {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[1].row + 1; row < 40; row++) {
        if (squares[row][this.grids[1].col] !== null) {
          if (bottomPoint > row) {
            bottomPoint = row;
          }
          break;
        }
      }
    }
    return bottomPoint;
  }

  canDropHorizontal() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i++) {
      if (i !== 1 && squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropVertical() {
    let canDrop = true;
    for (let i = 1; i < this.grids.length; i += 2) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }
}

class ZBlock {
  grids = [];
  color = 'red';
  shadowColor = 'rgba(255, 0, 0, 0.3)';
  direction = direction.horizontal;

  create() {
    for (let i = 8; i < 10; i++) {
      if (squares[0][i] === null) {
        squares[0][i] = this.color;
        this.grids.push({row: 0, col: i});
      }
    }
    for (let i = 9; i < 11; i++) {
      if (squares[1][i] === null) {
        squares[1][i] = this.color;
        this.grids.push({row: 1, col: i});
      }
    }
  }

  drop() {
    if (
      this.direction === direction.horizontal &&
      (
        this.grids[3].row === 39 ||
        !this.canDropHorizontal()
      ) ||
      this.direction === direction.vertical &&
      (
        this.grids[3].row === 39 ||
        !this.canDropVertical()
      )
    ) {
      stopDropping();
    } else {
      for (let i = this.grids.length - 1; i >= 0; i--) {
        squares[this.grids[i].row][this.grids[i].col] = null;
        this.grids[i].row++;
        squares[this.grids[i].row][this.grids[i].col] = this.color;
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    if (this.direction === direction.horizontal) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i < 2) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        }
        ctx.fill();
      }
    } else {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i < 2) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint + i - 2) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint + i - 3) * 20, 20, 20);
        }
        ctx.fill();
      }
    }
  }

  rotate() {
    if (this.direction === direction.horizontal) {
      this.direction = direction.vertical;
      const pivot = this.grids[2];
      if (
        squares[pivot.row - 1][pivot.col + 1] === null &&
        squares[pivot.row + 1][pivot.col] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 1) {
            this.grids[i].row += 1;
          }
          this.grids[i].col += 2 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else {
      this.direction = direction.horizontal;
      const pivot = this.grids[2];
      if (
        pivot.col !== 0 &&
        squares[pivot.row][pivot.col - 1] === null &&
        squares[pivot.row + 1][pivot.col + 1] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1;
          }
          this.grids[i].col += i - 2;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        pivot.col === 0 &&
        squares[pivot.row + 1][pivot.col + 1] === null &&
        squares[pivot.row + 1][pivot.col + 2] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1;
          }
          this.grids[i].col += i - 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveLeft() {
    if (
      squares[this.grids[0].row][this.grids[0].col - 1] === null &&
      squares[this.grids[2].row][this.grids[2].col - 1] === null &&
      (
        this.direction === direction.horizontal &&
        this.grids[0].col !== 0 ||
        this.direction === direction.vertical &&
        this.grids[3].col !== 0 &&
        squares[this.grids[3].row][this.grids[3].col - 1] === null
      )
    ) {
      if (this.direction === direction.horizontal) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col -= 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col -= 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      squares[this.grids[1].row][this.grids[1].col + 1] === null &&
      squares[this.grids[3].row][this.grids[3].col + 1] === null &&
      (
        this.direction === direction.horizontal &&
        this.grids[3].col !== 19 ||
        this.direction === direction.vertical &&
        this.grids[0].col !== 19 &&
        squares[this.grids[0].row][this.grids[0].col + 1] === null
      )
    ) {
      if (this.direction === direction.horizontal) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col += 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col += 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (this.direction === direction.horizontal) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - (2 - i);
          } else {
            this.grids[i].row = bottomPoint - (3 - i);
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    if (this.direction === direction.horizontal) {
      for (let row = this.grids[2].row + 1; row < 40; row++) {
        if (squares[row][this.grids[2].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          if (bottomPoint > row - 1) {
            bottomPoint = row - 1;
          }
          break;
        }
      }
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          if (bottomPoint > row) {
            bottomPoint = row;
          }
          break;
        }
      }
    } else {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[1].row + 1; row < 40; row++) {
        if (squares[row][this.grids[1].col] !== null) {
          if (bottomPoint > row) {
            bottomPoint = row;
          }
          break;
        }
      }
    }
    return bottomPoint;
  }

  canDropHorizontal() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i++) {
      if (i !== 1 && squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropVertical() {
    let canDrop = true;
    for (let i = 1; i < this.grids.length; i += 2) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }
}

class JBlock {
  grids = [];
  color = 'blue';
  shadowColor = 'rgba(0, 0, 255, 0.3)';
  direction = direction.left;

  create() {
    for (let i = 10; i > 7; i--) {
      if (squares[1][i] === null) {
        squares[1][i] = this.color;
        this.grids.push({row: 1, col: i});
      }
    }
    squares[0][8] = this.color;
    this.grids.push({row: 0, col: 8});
  }

  drop() {
    if (
      this.direction === direction.left && this.grids[0].row === 39 ||
      this.direction === direction.up && this.grids[0].row === 39 ||
      this.direction === direction.right && this.grids[3].row === 39 ||
      this.direction === direction.down && this.grids[3].row === 39 ||
      this.direction === direction.left && !this.canDropLeft() ||
      this.direction === direction.up && !this.canDropUp() ||
      this.direction === direction.right && !this.canDropRight() ||
      this.direction === direction.down && !this.canDropDown()
    ) {
      stopDropping();
    } else {
      if (
        this.direction === direction.left ||
        this.direction === direction.up
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    if (this.direction === direction.left) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.up) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 2) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - i) * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.right) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.down) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - (2 - i)) * 20, 20, 20);
        }
        ctx.fill();
      }
    }
  }

  rotate() {
    if (this.direction === direction.left) {
      this.direction = direction.up;
      const pivot = this.grids[1];
      if (
        squares[pivot.row - 1][pivot.col + 1] === null &&
        squares[pivot.row - 1][pivot.col] === null &&
        squares[pivot.row + 1][pivot.col] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1 - i;
          }
          this.grids[i].col += i - 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.up) {
      this.direction = direction.right;
      const pivot = this.grids[1];
      if (
        pivot.col !== 0 &&
        squares[pivot.row][pivot.col + 1] === null &&
        squares[pivot.row + 1][pivot.col + 1] === null &&
        squares[pivot.row][pivot.col - 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += i - 1;
          if (i % 2 === 0) {
            this.grids[i].col += i - 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        pivot.col === 0 &&
        squares[pivot.row][pivot.col + 1] === null &&
        squares[pivot.row][pivot.col + 2] === null &&
        squares[pivot.row + 1][pivot.col + 2] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += i - 1;
          if (i % 2 === 0) {
            this.grids[i].col += i;
          } else {
            this.grids[i].col += 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.right) {
      this.direction = direction.down;
      const pivot = this.grids[1];
      if (
        squares[pivot.row - 1][pivot.col] === null &&
        squares[pivot.row + 1][pivot.col] === null &&
        squares[pivot.row + 1][pivot.col - 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += i - 1;
          }
          this.grids[i].col += 1 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.down) {
      this.direction = direction.left;
      const pivot = this.grids[2];
      if (
        pivot.col !== 19 &&
        squares[pivot.row - 1][pivot.col - 1] === null &&
        squares[pivot.row][pivot.col + 1] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += 2 - i;
          if (i % 2 === 0) {
            this.grids[i].col += 1 - i;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        pivot.col === 19 &&
        squares[pivot.row - 1][pivot.col - 2] === null &&
        squares[pivot.row][pivot.col - 2] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += 2 - i;
          if (i % 2 === 0) {
            this.grids[i].col -= i;
          } else {
            this.grids[i].col -= 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveLeft() {
    if (
      this.grids[3].col !== 0 &&
      squares[this.grids[3].row][this.grids[3].col - 1] === null &&
      (
        this.direction === direction.left &&
        squares[this.grids[2].row][this.grids[2].col - 1] === null ||
        this.direction === direction.down &&
        squares[this.grids[0].row][this.grids[0].col - 1] === null &&
        squares[this.grids[1].row][this.grids[1].col - 1] === null
      ) ||
      this.grids[0].col !== 0 &&
      squares[this.grids[0].row][this.grids[0].col - 1] === null &&
      (
        this.direction === direction.right &&
        squares[this.grids[3].row][this.grids[3].col - 1] === null ||
        this.direction === direction.up &&
        squares[this.grids[1].row][this.grids[1].col - 1] === null &&
        squares[this.grids[2].row][this.grids[2].col - 1] === null
      )
    ) {
      if (this.direction === direction.left || this.direction === direction.down) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col--;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col--;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      this.grids[0].col !== 19 &&
      squares[this.grids[0].row][this.grids[0].col + 1] === null &&
      (
        this.direction === direction.left &&
        squares[this.grids[3].row][this.grids[3].col + 1] === null ||
        this.direction === direction.down &&
        squares[this.grids[1].row][this.grids[1].col + 1] === null &&
        squares[this.grids[2].row][this.grids[2].col + 1] === null
      ) ||
      this.grids[3].col !== 19 &&
      squares[this.grids[3].row][this.grids[3].col + 1] === null &&
      (
        this.direction === direction.right &&
        squares[this.grids[2].row][this.grids[2].col + 1] === null ||
        this.direction === direction.up &&
        squares[this.grids[0].row][this.grids[0].col + 1] === null &&
        squares[this.grids[1].row][this.grids[1].col + 1] === null
      )
    ) {
      if (this.direction === direction.left || this.direction === direction.down) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (this.direction === direction.left) {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === this.grids.length - 1) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.up) {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === this.grids.length - 1) {
            this.grids[i].row = bottomPoint - 2;
          } else {
            this.grids[i].row = bottomPoint - i;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.right) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === this.grids.length - 1) {
            this.grids[i].row = bottomPoint;
          } else {
            this.grids[i].row = bottomPoint - 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.down) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - (2 - i);
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    if (this.direction === direction.left) {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 1; i < 3; i++) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row - 1) {
              bottomPoint = row - 1;
            }
            break;
          }
        }
      }
    } else if (this.direction === direction.up) {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          if (bottomPoint - 1 > row) {
            bottomPoint = row + 1;
          }
          break;
        }
      }
    } else if (this.direction === direction.right) {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 0; i < 2; i++) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row) {
              bottomPoint = row;
            }
            break;
          }
        }
      }
    } else if (this.direction === direction.down) {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[2].row + 1; row < 40; row++) {
        if (squares[row][this.grids[2].col] !== null) {
          if (bottomPoint > row - 1) {
            bottomPoint = row - 1;
          }
          break;
        }
      }
    }
    return bottomPoint;
  }

  canDropUp() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i += 3) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropDown() {
    let canDrop = true;
    for (let i = 2; i < this.grids.length; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropLeft() {
    let canDrop = true;
    for (let i = 0; i < 3; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropRight() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i++) {
      if (i !== 2 && squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }
}

class LBlock {
  grids = [];
  color = 'orange';
  shadowColor = 'rgba(255, 165, 0, 0.3)';
  direction = direction.right;

  create() {
    for (let i = 9; i < 12; i++) {
      if (squares[1][i] === null) {
        squares[1][i] = this.color;
        this.grids.push({row: 1, col: i});
      }
    }
    squares[0][11] = this.color;
    this.grids.push({row: 0, col: 11});
  }

  drop() {
    if (
      this.direction === direction.right && this.grids[0].row === 39 ||
      this.direction === direction.down && this.grids[3].row === 39 ||
      this.direction === direction.left && this.grids[3].row === 39 ||
      this.direction === direction.up && this.grids[0].row === 39 ||
      this.direction === direction.right && !this.canDropRight() ||
      this.direction === direction.down && !this.canDropDown() ||
      this.direction === direction.left && !this.canDropLeft() ||
      this.direction === direction.up && !this.canDropUp()
    ) {
      stopDropping();
    } else {
      if (
        this.direction === direction.right ||
        this.direction === direction.up
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    if (this.direction === direction.right) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.down) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - (2 - i)) * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.left) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.up) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 3) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 2) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - i) * 20, 20, 20);
        }
        ctx.fill();
      }
    }
  }

  rotate() {
    if (this.direction === direction.right) {
      this.direction = direction.down;
      const pivot = this.grids[1];
      if (
        squares[pivot.row - 1][pivot.col] === null &&
        squares[pivot.row + 1][pivot.col] === null &&
        squares[pivot.row + 1][pivot.col + 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += i - 1;
          if (i % 2 === 0) {
            this.grids[i].col += 1 - i;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.down) {
      this.direction = direction.left;
      const pivot = this.grids[1];
      if (
        pivot.col !== 0 &&
        squares[pivot.row][pivot.col + 1] === null &&
        squares[pivot.row][pivot.col - 1] === null &&
        squares[pivot.row + 1][pivot.col - 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1 - i;
          }
          this.grids[i].col += 1 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        pivot.col === 0 &&
        squares[pivot.row][pivot.col + 1] === null &&
        squares[pivot.row][pivot.col + 2] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += 1 - i;
          }
          this.grids[i].col += 2 - i;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.left) {
      this.direction = direction.up;
      const pivot = this.grids[1];
      if (
        squares[pivot.row + 1][pivot.col] === null &&
        squares[pivot.row - 1][pivot.col] === null &&
        squares[pivot.row - 1][pivot.col - 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row += 1 - i;
          if (i % 2 === 0) {
            this.grids[i].col += i - 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.up) {
      this.direction = direction.right;
      const pivot = this.grids[0];
      if (
        pivot.col !== 19 &&
        squares[pivot.row - 1][pivot.col + 1] === null &&
        squares[pivot.row][pivot.col + 1] === null &&
        squares[pivot.row][pivot.col - 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += i;
          } else {
            this.grids[i].row += 1;
          }
          this.grids[i].col += i - 1;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else if (
        pivot.col === 19 &&
        squares[pivot.row][pivot.col - 1] === null &&
        squares[pivot.row][pivot.col - 2] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i % 2 === 0) {
            this.grids[i].row += i;
          } else {
            this.grids[i].row += 1;
          }
          this.grids[i].col += i - 2;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveLeft() {
    if (
      this.grids[0].col !== 0 &&
      squares[this.grids[0].row][this.grids[0].col - 1] === null &&
      (
        this.direction === direction.right &&
        squares[this.grids[3].row][this.grids[3].col - 1] === null ||
        this.direction === direction.down &&
        squares[this.grids[1].row][this.grids[1].col - 1] === null &&
        squares[this.grids[2].row][this.grids[2].col - 1] === null
      ) ||
      this.grids[3].col !== 0 &&
      squares[this.grids[3].row][this.grids[3].col - 1] === null &&
      (
        this.direction === direction.left &&
        squares[this.grids[2].row][this.grids[2].col - 1] === null ||
        this.direction === direction.up &&
        squares[this.grids[0].row][this.grids[0].col - 1] === null &&
        squares[this.grids[1].row][this.grids[1].col - 1] === null
      )
    ) {
      if (this.direction === direction.right || this.direction === direction.down) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col--;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col--;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      this.grids[3].col !== 19 &&
      squares[this.grids[3].row][this.grids[3].col + 1] === null &&
      (
        this.direction === direction.right &&
        squares[this.grids[2].row][this.grids[2].col + 1] === null ||
        this.direction === direction.down &&
        squares[this.grids[0].row][this.grids[0].col + 1] === null &&
        squares[this.grids[1].row][this.grids[1].col + 1] === null
      ) ||
      this.grids[0].col !== 19 &&
      squares[this.grids[0].row][this.grids[0].col + 1] === null &&
      (
        this.direction === direction.left &&
        squares[this.grids[3].row][this.grids[3].col + 1] === null ||
        this.direction === direction.up &&
        squares[this.grids[1].row][this.grids[1].col + 1] === null &&
        squares[this.grids[2].row][this.grids[2].col + 1] === null
      )
    ) {
      if (this.direction === direction.right || this.direction === direction.down) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (this.direction === direction.right) {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === this.grids.length - 1) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.down) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0 ; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - (2 - i);
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.left) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === this.grids.length - 1) {
            this.grids[i].row = bottomPoint;
          } else {
            this.grids[i].row = bottomPoint - 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.up) {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row = bottomPoint - i;
          } else {
            this.grids[i].row = bottomPoint - 2;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    if (this.direction === direction.right) {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 1; i < 3; i++) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row - 1) {
              bottomPoint = row - 1;
            }
            break;
          }
        }
      }
    } else if (this.direction === direction.down) {
      for (let row = this.grids[2].row + 1; row < 40; row++) {
        if (squares[row][this.grids[2].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          if (bottomPoint > row - 1) {
            bottomPoint = row - 1;
          }
          break;
        }
      }
    } else if (this.direction === direction.left) {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 0; i < 2; i++) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row) {
              bottomPoint = row;
            }
            break;
          }
        }
      }
    } else if (this.direction === direction.up) {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          if (bottomPoint - 1 > row) {
            bottomPoint = row + 1;
          }
          break;
        }
      }
    }
    return bottomPoint;
  }

  canDropUp() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i += 3) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropDown() {
    let canDrop = true;
    for (let i = 2; i < this.grids.length; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropLeft() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i++) {
      if (i !== 2 && squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropRight() {
    let canDrop = true;
    for (let i = 0; i < 3; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }
}

class TBlock {
  grids = [];
  color = 'purple';
  shadowColor = 'rgba(128, 0, 128, 0.3)';
  direction = direction.up;

  create() {
    squares[0][9] = this.color;
    this.grids.push({row: 0, col: 9});
    for (let i = 8; i < 11; i++) {
      if (squares[1][i] === null) {
        squares[1][i] = this.color;
        this.grids.push({row: 1, col: i});
      }
    }
  }

  drop() {
    if (
      this.direction === direction.up && this.grids[3].row === 39 ||
      this.direction === direction.right && this.grids[3].row === 39 ||
      this.direction === direction.down && this.grids[0].row === 39 ||
      this.direction === direction.left && this.grids[1].row === 39 ||
      this.direction === direction.up && !this.canDropUp() ||
      this.direction === direction.right && !this.canDropRight() ||
      this.direction === direction.down && !this.canDropDown() ||
      this.direction === direction.left && !this.canDropLeft()
    ) {
      stopDropping();
    } else {
      if (
        this.direction === direction.down ||
        this.direction === direction.left
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].row++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  shadow() {
    const bottomPoint = this.getBottomPoint();
    if (this.direction === direction.up) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 0) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.right) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 0) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - (3 - i)) * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.down) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 0) {
          ctx.fillRect(this.grids[i].col * 20, bottomPoint * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        }
        ctx.fill();
      }
    } else if (this.direction === direction.left) {
      for (let i = 0; i < this.grids.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.shadowColor;
        if (i === 0) {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - 1) * 20, 20, 20);
        } else {
          ctx.fillRect(this.grids[i].col * 20, (bottomPoint - (i - 1)) * 20, 20, 20);
        }
        ctx.fill();
      }
    }
  }

  rotate() {
    if (this.direction === direction.up) {
      this.direction = direction.right;
      const pivot = this.grids[2];
      if (squares[pivot.row + 1][pivot.col] === null) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row += 1;
          } else {
            this.grids[i].row += i - 2;
          }
          if (i < 2) {
            this.grids[i].col += 1 - i;
          } else {
            this.grids[i].col += 2 - i;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
        squares[this.grids[1].row][this.grids[1].col] = null;
        this.grids[1].col += 1;
        squares[this.grids[1].row][this.grids[1].col] = this.color;
      }
    } else if (this.direction === direction.right) {
      this.direction = direction.down;
      const pivot = this.grids[2];
      if (
        pivot.col !== 0 &&
        squares[pivot.row][pivot.col - 1] === null
      ) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i < 2) {
            this.grids[i].row += 1 - i;
          } else {
            this.grids[i].row += 2 - i;
          }
          if (i === 0) {
            this.grids[i].col -= 1;
          } else {
            this.grids[i].col += 2 - i;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
        squares[this.grids[1].row][this.grids[1].col] = null;
        this.grids[1].row += 1;
        squares[this.grids[1].row][this.grids[1].col] = this.color;
      } else if (
        pivot.col === 0 &&
        squares[pivot.row][pivot.col + 2] === null &&
        squares[pivot.row + 1][pivot.col + 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row += 1;
          } else {
            this.grids[i].row += 2 - i;
          }
          if (i !== 0) {
            this.grids[i].col += 3 - i;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.down) {
      this.direction = direction.left;
      const pivot = this.grids[2];
      if (squares[pivot.row - 1][pivot.col] === null) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row -= 1;
          } else {
            this.grids[i].row += 2 - i;
          }
          if (i < 2) {
            this.grids[i].col += i - 1;
          } else {
            this.grids[i].col += i - 2;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
        squares[this.grids[1].row][this.grids[1].col] = null;
        this.grids[1].col -= 1;
        squares[this.grids[1].row][this.grids[1].col] = this.color;
      }
    } else if (this.direction === direction.left) {
      this.direction = direction.up;
      const pivot = this.grids[1];
      if (
        pivot.col !== 19 &&
        squares[pivot.row][pivot.col - 1] === null &&
        squares[pivot.row][pivot.col + 1] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i !== 0) {
            this.grids[i].row += i - 1;
            this.grids[i].col += i - 2;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
        squares[this.grids[0].row][this.grids[0].col] = null;
        this.grids[0].col += 1;
        squares[this.grids[0].row][this.grids[0].col] = this.color;
      } else if (
        pivot.col === 19 &&
        squares[pivot.row][pivot.col - 1] === null &&
        squares[pivot.row][pivot.col - 2] === null
      ) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i !== 0) {
            this.grids[i].row += i - 1;
            this.grids[i].col += i - 3;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveLeft() {
    if (
      this.grids[1].col !== 0 &&
      squares[this.grids[1].row][this.grids[1].col - 1] === null &&
      (
        this.direction === direction.up &&
        squares[this.grids[0].row][this.grids[0].col - 1] === null ||
        this.direction === direction.right &&
        squares[this.grids[2].row][this.grids[2].col - 1] === null &&
        squares[this.grids[3].row][this.grids[3].col - 1] === null
      ) ||
      squares[this.grids[0].row][this.grids[0].col - 1] === null &&
      squares[this.grids[3].row][this.grids[3].col - 1] === null &&
      (
        this.direction === direction.down &&
        this.grids[3].col !== 0 ||
        this.direction === direction.left &&
        this.grids[0].col !== 0 &&
        squares[this.grids[1].row][this.grids[1].col - 1] === null
      )
    ) {
      if (this.direction === direction.up || this.direction === direction.left) {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col--;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col--;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveRight() {
    if (
      this.grids[3].col !== 19 &&
      squares[this.grids[3].row][this.grids[3].col + 1] === null &&
      (
        this.direction === direction.up &&
        squares[this.grids[0].row][this.grids[0].col + 1] === null ||
        this.direction === direction.left &&
        squares[this.grids[1].row][this.grids[1].col + 1] === null &&
        squares[this.grids[2].row][this.grids[2].col + 1] === null
      ) ||
      squares[this.grids[0].row][this.grids[0].col + 1] === null &&
      squares[this.grids[1].row][this.grids[1].col + 1] === null &&
      (
        this.direction === direction.right &&
        this.grids[0].col !== 19 &&
        squares[this.grids[3].row][this.grids[3].col + 1] === null ||
        this.direction === direction.down &&
        this.grids[1].col !== 19
      )
    ) {
      if (this.direction === direction.up || this.direction === direction.left) {
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      } else {
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          this.grids[i].col++;
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
    this.shadow();
  }

  moveBottom() {
    if (this.direction === direction.up) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[2].row + 1][this.grids[2].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.right) {
      if (
        this.grids[3].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = this.grids.length - 1; i >= 0 ; i--) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint - (3 - i);
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.down) {
      if (
        this.grids[0].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null &&
        squares[this.grids[3].row + 1][this.grids[3].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row = bottomPoint;
          } else {
            this.grids[i].row = bottomPoint - 1;
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    } else if (this.direction === direction.left) {
      if (
        this.grids[1].row !== 39 &&
        squares[this.grids[0].row + 1][this.grids[0].col] === null &&
        squares[this.grids[1].row + 1][this.grids[1].col] === null
      ) {
        const bottomPoint = this.getBottomPoint();
        for (let i = 0; i < this.grids.length; i++) {
          squares[this.grids[i].row][this.grids[i].col] = null;
          if (i === 0) {
            this.grids[i].row = bottomPoint - 1;
          } else {
            this.grids[i].row = bottomPoint - (i - 1);
          }
          squares[this.grids[i].row][this.grids[i].col] = this.color;
        }
      }
    }
  }

  getBottomPoint() {
    let bottomPoint;
    if (this.direction === direction.up) {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 1; i < 3; i++) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row - 1) {
              bottomPoint = row - 1;
            }
            break;
          }
        }
      }
    } else if (this.direction === direction.right) {
      for (let row = this.grids[3].row + 1; row < 40; row++) {
        if (squares[row][this.grids[3].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          if (bottomPoint > row) {
            bottomPoint = row;
          }
          break;
        }
      }
    } else if (this.direction === direction.down) {
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let i = 1; i < 4; i += 2) {
        for (let row = this.grids[i].row + 1; row < 40; row++) {
          if (squares[row][this.grids[i].col] !== null) {
            if (bottomPoint > row) {
              bottomPoint = row;
            }
            break;
          }
        }
      }
    } else if (this.direction === direction.left) {
      for (let row = this.grids[1].row + 1; row < 40; row++) {
        if (squares[row][this.grids[1].col] !== null) {
          bottomPoint = row - 1;
          break;
        }
      }
      if (bottomPoint === undefined) {
        bottomPoint = 39;
      }
      for (let row = this.grids[0].row + 1; row < 40; row++) {
        if (squares[row][this.grids[0].col] !== null) {
          if (bottomPoint > row) {
            bottomPoint = row;
          }
          break;
        }
      }
    }
    return bottomPoint;
  }

  canDropUp() {
    let canDrop = true;
    for (let i = 1; i < this.grids.length; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropDown() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i++) {
      if (i !== 2 && squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropLeft() {
    let canDrop = true;
    for (let i = 0; i < 2; i++) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }

  canDropRight() {
    let canDrop = true;
    for (let i = 0; i < this.grids.length; i += 3) {
      if (squares[this.grids[i].row + 1][this.grids[i].col] !== null) {
        canDrop = false;
      }
    }
    return canDrop;
  }
}

function checkLine() {
  for (let row = 0; row < 40; row++) {
    let hasLineFilled = true;
    for (let col = 0; col < squares[row].length; col++) {
      if (squares[row][col] === null) {
        hasLineFilled = false;
      }
    }
    if (hasLineFilled) {
      squares.splice(row, 1);
      squares.unshift([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
    }
  }
}

function stopDropping() {
  clearInterval(dropObj);
  checkLine();
  draw();
  showNewObject();
}

function createShape() {
  const num = Math.floor(Math.random() * 13);
  let shape = null;
  if (num === 0) {
    shape = new IBlock();
  } else if (num === 1 || num === 2) {
    shape = new OBlock();
  } else if (num === 3 || num === 4) {
    shape = new SBlock();
  } else if (num === 5 || num === 6) {
    shape = new ZBlock();
  } else if (num === 7 || num === 8) {
    shape = new JBlock();
  } else if (num === 9 || num === 10) {
    shape = new LBlock();
  } else if (num === 11 || num === 12) {
    shape = new TBlock();
  }
  shape.create();
  return shape;
}

function dropObject() {
  dropObj = setInterval(function() {
    currentObj.drop();
    draw();
  }, speed);
}

function showNewObject() {
  currentObj = createShape();
  draw();
  dropObject();
}

function clearDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFrame() {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}

function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = '#f0f0f0';
  for (let i = 1; i < 20; i++) {
    ctx.moveTo(20 * i, 1);
    ctx.lineTo(20 * i, canvas.height - 1);
    ctx.stroke();
  }
  for (let i = 1; i < 40; i++) {
    ctx.moveTo(1, 20 * i);
    ctx.lineTo(canvas.width - 1, 20 * i);
    ctx.stroke();
  }
}

function draw() {
  clearDrawing();
  if (currentObj !== null) {
    currentObj.shadow();
  }
  for (let row = 0; row < squares.length; row++) {
    for (let col = 0; col < squares[row].length; col++) {
      if (squares[row][col] !== null) {
        ctx.beginPath();
        ctx.fillStyle = squares[row][col];
        ctx.fillRect(20 * col, 20 * row, 20, 20);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = '#f0f0f0';
        ctx.strokeRect(20 * col, 20 * row, 20, 20);
        ctx.stroke();
      }
    }
  }
  drawGrid();
  drawFrame();
}

function changeSpeed(newSpeed) {
  speed = newSpeed;
  clearInterval(dropObj);
  dropObject();
}

rotate.addEventListener('click', () => {
  if (currentObj !== null && dropObj !== null && !(currentObj instanceof OBlock)) {
    currentObj.rotate();
    draw();
  }
});

up.addEventListener('click', () => {
  if (currentObj !== null && dropObj !== null) {
    currentObj.shadow();
    currentObj.moveBottom();
    draw();
  }
});

down.addEventListener('click', () => {
  if (currentObj !== null && dropObj !== null) {
    currentObj.shadow();
    currentObj.drop();
    draw();
  }
});

down.addEventListener('pointerdown', () => {
  if (currentObj !== null && dropObj !== null) {
    changeSpeed(100);
    down.addEventListener('pointerup', () => {
      changeSpeed(700);
    }, { once: true })
  }
});

left.addEventListener('click', () => {
  if (currentObj !== null && dropObj !== null) {
    currentObj.moveLeft();
    draw();
  }
});

left.addEventListener('pointerdown', () => {
  let moveLeftObj;
  if (currentObj !== null && dropObj !== null) {
    moveLeftObj = setInterval(function() {
      currentObj.moveLeft();
      draw();
    }, 100);
    left.addEventListener('pointerup', () => {
      clearInterval(moveLeftObj);
    }, { once: true })
  }
});

right.addEventListener('click', () => {
  if (currentObj !== null && dropObj !== null) {
    currentObj.moveRight();
    draw();
  }
});

right.addEventListener('pointerdown', () => {
  let moveRightObj;
  if (currentObj !== null && dropObj !== null) {
    moveRightObj = setInterval(function() {
      currentObj.moveRight();
      draw();
    }, 100);
    right.addEventListener('pointerup', () => {
      clearInterval(moveRightObj);
    }, { once: true })
  }
});

draw();
showNewObject();
