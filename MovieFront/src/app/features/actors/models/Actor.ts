import { Gender } from "./Gender";
import { Location } from "./Location";

export interface Actor {
    id : number;
    name : string;
    profile : string;
    birthDate : Date | null;
    gender : Gender | string;
    location : Location;
    biography : string | null;
}