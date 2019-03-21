import {Mesh} from 'three-full';

export interface ThreeMdl {
    data: any;
    mesh: Mesh;
    name: string;
    uid: number;

    createMesh(): Mesh;
}
