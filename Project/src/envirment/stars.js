import { PointsMaterial, BufferGeometry, BufferAttribute, Points } from "three";

/*
Description: Creates a given numvber of stars at random positions in
the distance
********************************************************************
Varible(s):
    -num: the number of stars to be rendered
    -far: the number of the far veiing plane
********************************************************************
Reurns: its self
*/
export default function Stars(num = 500, far){

    this.material = new PointsMaterial({
        size: 0.01
    });

    let positions = new Float32Array(num*3);

    for (i = 0; i < num*3; i++){
        let num = (Math.random() - 0.5) * far * 2;

        positions[i] = num;
    }

    this.geometry = new BufferGeometry();

    attribute = new BufferAttribute(positions, 3);

    this.geometry.setAttribute(
        "position", 
        attribute
    );

    this.points = new Points(
        this.geometry, 
        this.material
    );

    return this;

}