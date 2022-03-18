function Solar() {

    this.sun = {
        ... new Sphere(50),
        radius : 0.25,
        color : [1.0, 1.0, 0.1, 1.0]
    };

    this.earth = {
        ... new Sphere(),
        radius : 0.15,
        orbit : 1.5,
        color : [0.0, 0.0, 1.0, 1.0]
    };

    this.moon = {
        ... new Sphere(),
        radius : 0.1,
        orbit : 0.4,
        color : [0.9, 0.9, 0.9, 1.0]
    };

    this.diameter = 2 * (this.earth.orbit + this.moon.orbit + this.moon.radius);

    this.setP = function (P){
        this.sun.P = P;
        this.earth.P = P;
        this.moon.P = P;
    };
};