let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  lastMoveTime = 0;

  init(paper) {
    // Add 'will-change' CSS to optimize the element for movement
    paper.style.willChange = "transform";

    const THROTTLE_DELAY = 10; // ms (adjust as necessary)

    // Throttle the mousemove events for smoother dragging
    document.addEventListener("mousemove", (e) => {
      const currentTime = Date.now();
      if (currentTime - this.lastMoveTime < THROTTLE_DELAY) {
        return; // Skip if the event fires too frequently
      }
      this.lastMoveTime = currentTime;

      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseTouchX = this.mouseX;
      this.mouseTouchY = this.mouseY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

// const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
