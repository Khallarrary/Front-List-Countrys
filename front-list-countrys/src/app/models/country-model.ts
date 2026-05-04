export interface Country {
  name: string;
  officialName: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  flagUrl: string;
  flagAlt: string;
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
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}
