export interface Movie {
    id : number | null;
    title : string;
    jacket : string;
    duration : string | null;
    type : string;
    description : string | null;
    release : Date | null;
    actors : number[] | null;
}