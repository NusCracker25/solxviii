import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { View3DComponent } from "./view3-d/view3-d.component";
import { ThreeDRoutingModule } from "./threeD-routing.module";
import { BoxThreeComponent } from "./box-three/box-three.component";
import { UniverseComponent } from "./universe/universe.component";
import { Scene3DDirective } from "./directives/scene3-d.directive";
import { ThreeAnchorDirective } from "./directives/three-anchor.directive";
import { ControlDirective } from "./directives/control.directive";
import { AddToSceneDirective } from "./directives/add-to-scene.directive";
import { CameraComponent } from "./camera/camera.component";
import { MeshJSONComponent } from "./mesh-json/mesh-json.component";
import { ThreeObjectComponent } from "./three-object/three-object.component";
import { MeshSTLComponent } from "./mesh-stl/mesh-stl.component";

import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatTooltipModule,
  MatExpansionModule
} from "@angular/material";

/**
 * 3D module is a lazy loaded one which is to be activated for map edition/brawosing
 * when user has selected 3D browsing.
 * 3D browsing is a 3D experience on desktop with usual screen rendering
 */
@NgModule({
  imports: [
    CommonModule,
    ThreeDRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  declarations: [
    View3DComponent,
    BoxThreeComponent,
    UniverseComponent,
    Scene3DDirective,
    ThreeAnchorDirective,
    ControlDirective,
    AddToSceneDirective,
    CameraComponent,
    MeshJSONComponent,
    ThreeObjectComponent,
    MeshSTLComponent
  ],
  exports: [View3DComponent]
})
export class ThreeDModule {}
