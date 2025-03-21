import useData from "./useData";

interface StructuredFormattingModel {
  mainText: string;
}

export interface City {
  description: string;
  placeId: string;
  structuredFormatting: StructuredFormattingModel;
}

const useCities = (searchTerm: string) =>
  useData<City>(
    "/api/cities/search",
    500,
    searchTerm.length > 2 ? { params: { cityName: searchTerm } } : null,
    [searchTerm]
  );

export default useCities;
