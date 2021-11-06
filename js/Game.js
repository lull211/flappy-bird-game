class Game {
  constructor() {
    this.sky = new Sky();
    this.land = new Land(-100);
    this.bird = new Bird();
    //柱子生成器
    this.pipeProducer = new PipePareProducer(-100);
    this.timer = null;
    this.tick = 16; //移动的时间间隔，毫秒
    this.gameOver = false;
  }
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      //重新开始游戏
      window.location.reload();
    }
    this.pipeProducer.startProduce();
    this.bird.startSwing();
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.pipeProducer.pairs.forEach((pair) => {
        pair.move(duration);
        0;
      });
      if (this.isGameOver()) {
        this.stop();
        alert("Game Over !!!");
        this.gameOver = true;
      }
    }, this.tick);
  }
  isHit(rec1, rec2) {
    var centerX1 = rec1.left + rec1.width / 2;
    var centerY1 = rec1.top + rec1.height / 2;
    var centerX2 = rec2.left + rec2.width / 2;
    var centerY2 = rec2.top + rec2.height / 2;
    var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
    var disY = Math.abs(centerY1 - centerY2); //中心点纵向距离
    if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
      return true;
    }
    return false;
  }

  isGameOver() {
    if (this.bird.top === this.bird.maxY) {
      //鸟碰到了大地
      return true;
    }
    for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
      const pair = this.pipeProducer.pairs[i];
      //看柱子对pair是否跟bird进行了碰撞
      if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
        return true;
      }
    }
    
    return false;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.pipeProducer.stopProduce();
  }

  /**
   * 关键键盘事件
   */
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === " ") {
        this.bird.jump();
      }
    };
  }
}

var g = new Game();
g.regEvent();