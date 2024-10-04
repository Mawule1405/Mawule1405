import { Article } from "./Article";
import {FormeGalenique} from "./FormeGalenique";
import {SpecialitePharmaceutique} from "./SpecialitePharmaceutique";

export interface Medicament extends Article{
  concentration : string;
  uniteConcentration : string;
  formeGalenique : FormeGalenique;
  specialitePharmaceutique : SpecialitePharmaceutique;
}
