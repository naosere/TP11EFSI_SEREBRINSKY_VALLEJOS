const FLAGS_API_URL =
    "https://countriesnow.space/api/v0.1/countries/flag/images";

const CAPITAL_API_URL =
    "https://countriesnow.space/api/v0.1/countries/capital";

export interface Country {
    name: string;
    flag: string;
}

interface CountriesResponse {
    error: boolean;
    msg: string;
    data: Country[];
}

interface CapitalResponse {
    error: boolean;
    msg: string;
    data: {
        name: string;
        capital: string;
        iso2: string;
        iso3: string;
    };
}

export async function getCountries(): Promise<Country[]> {
    const response = await fetch(FLAGS_API_URL);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los países");
    }

    const data: CountriesResponse = await response.json();

    return data.data;
}

export async function getCapital(
    country: string
): Promise<string> {
    const response = await fetch(CAPITAL_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            country: country,
        }),
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener la capital");
    }

    const data: CapitalResponse = await response.json();

    return data.data.capital;
}