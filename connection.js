export default class Connection extends Konva.Line {
    constructor(i, o) {
        super({ points: [], stroke: "white", strokeWidth: 2 });
        this.i = i;
        this.o = o;
    
        this.updateLine();
        this.i.onmove(() => this.updateLine());
        this.o.onmove(() => this.updateLine());
    
        this.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
            this.strokeWidth(3);
        });
        this.on("mouseleave", () => {
            document.body.style.cursor = "default";
            this.strokeWidth(2);
        });
    
        if (this.valid()) {
            this.i.addConnection(this);
            this.o.addConnection(this);
            this.propagate();
        }
    }

    disconnectAndRemove() {
        this.o.removeConnection(this);
        this.i.removeConnection(this);
        this.o.update();
        this.destroy();
    }

    getConnectorPoints(from, to, padding) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      let angle = Math.atan2(-dy, dx);
      return [
        from.x + -padding * Math.cos(angle + Math.PI),
        from.y + padding * Math.sin(angle + Math.PI),
        to.x + -padding * Math.cos(angle),
        to.y + padding * Math.sin(angle),
      ];
    }
  
    updateLine() {
      const start = this.i.absolutePosition(),
              end = this.o.absolutePosition();
      this.points(this.getConnectorPoints(start, end, 10));
    }
  
    equals( b ){
        return this.i == b.i && this.o == b.o
    }

    propagate() {
        this.o.update();
        this.o.propagate();
    }
  
    valid() {
      return this.i && this.o;
    }
  }
  