function Solar() {

    this.sun = {
        ... new Sphere(50),
        radius : 0.4,
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

    this.saturn = {
        ... new Sphere(),
        disk : { 
            ... new Disk(20, 0.9),
            radius : 0.3,
            color : [0.4, 0.4, 0.5, 1.0]
        },
        radius : 0.2,
        orbit : 3.5,
        color : [0.9, 0.65, 0.0, 1.0]
    }

    this.diameter = 2 * (this.earth.orbit + this.moon.orbit + this.moon.radius 
                        + this.saturn.orbit);

    this.setP = function (P){
        this.sun.P = P;
        this.earth.P = P;
        this.moon.P = P;
        this.saturn.P = P
        this.saturn.disk.P = P
    };
};