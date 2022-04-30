export interface Frame {
    firstPipe: PipePair;
    secondPipe: PipePair;
    bird: Bird;
    gameOver: boolean;
    gameStarted: boolean;
    width: number;
    height: number;
    score: number;
    ground: Ground;
}

export interface Bird {
  top: number;
  left: number;
  size: number;
}

export interface Ground {
  height: number;
}

export interface PipePair {
  topPipe: Pipe;
  bottomPipe: Pipe;
  show: boolean;
  left: number;
  width: number;
}

export interface Pipe {
  top: number;
  height: number;
  text: string;
}


export class GameController {
  private frame: Frame;

  private velocity = 0;

  constructor(
    public readonly height = 800,
    public readonly width = 400,
    public readonly pipeWidth = 50,
    public pipeGap = 170,
    public readonly minTopForTopPipe = 50,
    public readonly maxTopForTopPipe = 350,
    public readonly generateNewPipePercent = 0.7,
    public readonly speed = 1,
    public readonly groundHeight = 20,
    public readonly birdX = 40,
    public readonly birdSize = 40,
    public readonly gravity = 1.5,
    public readonly jumpVelocity = 10,
    public readonly slowVelocityBy = 0.3
  ) {}

  public newGame() {
    let firstPipe = this.createPipe(true);
    let secondPipe = this.createPipe(false);

    this.frame = {
      firstPipe,
      secondPipe,

      score: 0,
      width: this.width,
      height: this.height,
      gameOver: false,
      gameStarted: false,
      bird: {
        left: this.birdX,
        top: this.height / 2 - this.birdSize / 2,
        size: this.birdSize,
      },
      ground: {
        height: this.groundHeight,
      }
    }

    return this.frame;
  }

  private randomYForTopPipe(): number {
    return (
      this.minTopForTopPipe + 
      (this.maxTopForTopPipe - this.minTopForTopPipe) * Math.random()
    );
  }

  private randomTextForPipe(): string {
    const subQueryText = [
      'SubQuery',
      'Decentrailised Data',
      'Indexer',
      'Consumer',
      'Delegator',
      'SubQuery Projects',
      'SubQuery SDK',
      'SubQuery Explorer',
      'SubQuery Network',
      'Web3 Infrastructure',
      'Open-source',
      'SubQuery Token',
      'SQT',
      'Pay As You Go',
      'Closed Agreement',
      'Open Agreement',
      '♥Sally♥',
    ]
    const randindex = Math.floor(Math.random() * subQueryText.length);

    return subQueryText[randindex];
  }

  private randomGapForPipe(): number {
    const gapmin = 155;
    const gapmax = 180;

    return Math.floor(Math.random() * ( 1 + gapmax - gapmin )) + gapmin;
  }

  private createPipe(show: boolean): PipePair {
    const height = this.randomYForTopPipe();
    const randtext = this.randomTextForPipe();
    const randgap = this.randomGapForPipe();
    
    return {
      topPipe: {
        top: 0,
        height,
        text: randtext,
      },
      bottomPipe: {
        top: height + randgap,
        height: this.height,
        text: randtext,
      },
      left: this.width - this.pipeWidth,
      width: this.pipeWidth,
      show,
    };
  }

  public nextFrame() {
    if(this.frame.gameOver || !this.frame.gameStarted) {
      return this.frame;
    }

    this.frame.firstPipe = this.movePipe(
      this.frame.firstPipe,
      this.frame.secondPipe
    );
    this.frame.secondPipe = this.movePipe(
      this.frame.secondPipe,
      this.frame.firstPipe
    );

    if (
      this.frame.bird.top >= this.height - this.groundHeight - this.birdSize
    ){
      this.frame.bird.top = this.height - this.groundHeight - this.birdSize;
      this.frame.gameOver = true;
      return this.frame;
    }

    if(this.hasCollidedWithPipe()){
      this.frame.gameOver = true;
      return this.frame;
    }

    // Gravity
    if(this.velocity > 0){
      this.velocity -= this.slowVelocityBy;
    }

    // Add score
    if (this.frame.firstPipe.left + this.pipeWidth == this.birdX - this.speed) {
      this.frame.score += 1;
    }

    // Add Score
    if (
      this.frame.secondPipe.left + this.pipeWidth ==
      this.birdX - this.speed
    ) {
      this.frame.score += 1;
    }

    this.frame.bird.top += Math.pow(this.gravity, 2) - this.velocity;
 
    return this.frame;
  }

  public start() {
    this.newGame();
    this.frame.gameStarted = true;
    return this.frame;
  }

  private movePipe(pipe: PipePair, otherPipe:PipePair){
    if (pipe.show && pipe.left <= this.pipeWidth * -1) {
      pipe.show = false;
      return pipe;
    }

    if (pipe.show){
      pipe.left -= this.speed;
    }

    if (
      otherPipe.left < this.width * (1 - this.generateNewPipePercent) && otherPipe.show && !pipe.show
    ){
      return this.createPipe(true);
    }

    return pipe;
  }

  public jump() {
    if (this.velocity <= 0){
      this.velocity += this.jumpVelocity;
    }
  }

  private checkPipe(left:number){
    return left <= this.birdX + this.birdSize && left + this.pipeWidth >= this.birdX;
  }

  private hasCollidedWithPipe() {
    if (
      this.frame.firstPipe.show &&
      this.checkPipe(this.frame.firstPipe.left)
    ) {
      return !(
        this.frame.bird.top > this.frame.firstPipe.topPipe.height &&
        this.frame.bird.top + this.birdSize <
          this.frame.firstPipe.bottomPipe.top
      );
    }

    if (
      this.frame.secondPipe.show &&
      this.checkPipe(this.frame.secondPipe.left)
    ) {
      return !(
        this.frame.bird.top > this.frame.secondPipe.topPipe.height &&
        this.frame.bird.top + this.birdSize <
          this.frame.secondPipe.bottomPipe.top
      );
    }

    return false;
  }


}
