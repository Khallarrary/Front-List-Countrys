export interface Country {
  name: string;
  officialName: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  flagUrl: string;
  flagAlt: string;
  portugueseName: string;
}

export interface CountryApiResponse {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  translations?: {
  por?: {
    common: string;
    official: string;
  };
};
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}
