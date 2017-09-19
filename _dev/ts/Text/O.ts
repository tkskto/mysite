module text {
    export class O extends THREE.Shape{
        constructor() {
            super();

            this.moveTo( 2, -2 );
            this.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
            this.bezierCurveTo( 30, 0, 30, 35,30,35 );
            this.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
            this.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
            this.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
            this.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
        }
    }
}