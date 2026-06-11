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
  names: {
    common: string;
    official: string;
    translations?: {
      por?: {
        common: string;
        official: string;
      };
    };
  };
  capitals?: {
    name: string;
    primary?: boolean;
  }[];
  region: string;
  subregion?: string;
  population: number;
  flag: {
    description?: string;
    url_png?: string;
    url_svg?: string;
  };
  codes?: {
    alpha_2?: string;
    alpha_3?: string;
  };
}

export interface CountryApiListResponse {
  data: {
    objects: CountryApiResponse[];
  };
}
