import { Ship } from '@feature/solterms/ship';

export class DevisShip {
  ship: Ship;

  L_quille: number;
  H_quille:number;

  point2ligne = 12;
  ligne2pouce = 12;
  pied2pouce = 12;
  toise2pied = 1 / 6;
  /* les conversions ci dessous s'appliquent à partir de 1668 - définition de la toise du chatelet */
  point2metre = 0.188 * 0.001;
  ligne2metre = 2.256 * 0.001;
  pouce2metre = 2.707 * 0.01;
  pied2metre = 32.484 * 0.01;


  ddmonceau(){
    //elemens: De la Quille ch I/I p3
//     La hauteur ou la face verticale de la quille eft un huitième
// de fa longueur réduite en pouces , ou , ce qui revient
// au même , la hauteur perpendiculaire de la quille
// au defTus des tins ou chantiers qui la portent , eft de 1 ligne
// 6 points par pied de fa longueur : la quille a cette
// même hauteur dans toute fa longeur.
    this.H_quille = this.L_quille/8 ;


  }

}
