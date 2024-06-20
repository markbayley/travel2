import Image from "next/image";
import { Inter } from "next/font/google";
import jsonData from "../data/country.json";
import Header from "@/components/Header";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [countryData, setCountryData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchedCountries, setSearchedCountries] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = ["Europe", "North America", "South America", "Asia", "Oceania"];
  const sortButtons = ["By Population", "By Rating", "Favorites"];



  useEffect(() => {
    setLoading(true);
    setError(null);
    //Fetch the API country data
    fetch(`https://restcountries.com/v2/all`)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.status === 404) {
          setError("Error fetching countries");
        } else {
          setCountryData(response);
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    const mergedCountries = countryData.filter((country) =>
      country?.name.toLowerCase().includes(lowerCaseSearchValue)
    );
    //Merge the API data with the local jsonData
    const updatedCountries = mergedCountries.map((flag) => {
      const travelData = jsonData.find(
        (travel) => travel.country === flag.name
      );
      return {
        ...flag,
        travel: travelData ? travelData.image : null,
        status: travelData ? travelData.status : null,
      };
    });

    setSearchedCountries(updatedCountries);
  }, [countryData, searchValue]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;








  return (
    <>
      <div>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <main
        className={`flex min-h-screen flex-col items-center justify-between xl:px-16 ${inter.className}`}
      >
        <Filter filterButtons={filterButtons} sortButtons={sortButtons}  />
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchedCountries.slice(0, 16).map((country, i) => (
            <div key={i} className="relative w-80 h-80 cursor-pointer ">
              {country.travel && (
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={country.travel}
                  alt={country.name}
             
                  className="rounded hover:opacity-90 shadow-xl"
                />
              )}
              <div className="absolute top-5 left-0 p-2 rounded-r text-white bg-amber-500">
                {country.name}
              </div>
              <div className="absolute top-1 right-0 p-2 ">
                <HiOutlineHeart className="text-rose-500 h-8 w-8" />{" "}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
