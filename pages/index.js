import Image from "next/image";
import { Inter } from "next/font/google";
import jsonData from "../data/country.json";
import Header from "@/components/Header";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { PiScalesBold } from "react-icons/pi";
import { BsMinecartLoaded } from "react-icons/bs";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import TravelMap from "@/components/TravelMap";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [countryData, setCountryData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedSorting, setSelectedSorting] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = ["Europe", "Americas", "Africa", "Asia", "Oceania"];
  const sortButtons = [ "Population", "Rating", "Area", "Favorites"];
  const detailButtons = ["Food", "People", "Culture", "Nature", "Travel"]
  const [showDetail, setShowDetail] = useState(false);
  const [showMap, setShowMap] = useState(false)

  const [mainImage, setMainImage] = useState()

  const [selectedCountry, setSelectedCountry] = useState("");

  let [photos, setPhotos] = useState([]);
  let [query, setQuery] = useState("");

  const handleFilter = (item) => {
    setSelectedRegion(item);
  };

  const handleSorter = (item) => {
    setSelectedSorting(item);
  };

  const [favorited, setFavorited] = useState([]);
  console.log("favorited", favorited);

  const handleFavorites = (item) => {
    setFavorited((prevFilters) =>
      prevFilters.includes(item)
        ? prevFilters.filter((filter) => filter !== item)
        : [...prevFilters, item]
    );
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

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

  // const superagent = require("superagent");
  // const clientID = "PvvWIfrMMfNqoEEuVve3X6KE1gksd31-C1Pn-SP3yL4";

  // const simpleGet = (options) => {
  //   superagent.get(options.url).then(function (res) {
  //     if (options.onSuccess) options.onSuccess(res);
  //   });
  // };

  // const numberOfPhotos = 9;
  // const url =
  //   "https://api.unsplash.com/photos/random/?count=" +
  //   numberOfPhotos +
  //   "&client_id=" +
  //   clientID;

  // useEffect(() => {
  //   const photosUrl = selectedCountry
  //     ? `${url}&query=${selectedCountry + query}`
  //     : url;

  //   simpleGet({
  //     url: photosUrl,
  //     onSuccess: (res) => {
  //       setPhotos(res.body);
  //     },
  //   });
  // }, [selectedCountry, query, url]);

  let filteredResults = searchedCountries;

  if (selectedRegion) {
    filteredResults = filteredResults.filter(
      (item) => item.region === selectedRegion
    );
  }

  if (selectedSorting && selectedSorting === "Population") {
    filteredResults = filteredResults
      .slice()
      .sort((b, a) => a.population - b.population);
  } else if (selectedSorting && selectedSorting === "Rating") {
    filteredResults = filteredResults.slice().sort((a, b) => a.gini - b.gini);
  } else if (selectedSorting && selectedSorting === "Area") {
    filteredResults = filteredResults.slice().sort((b, a) => a.area - b.area);
  } else if (selectedSorting && selectedSorting === "Favorites") {
    filteredResults = filteredResults.filter((item) =>
      favorited.includes(item)
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(
    "activeFilters",
    activeFilters,
    "filteredResults",
    filteredResults,
    "selctedRegion",
    selectedRegion,
    "selectedSorting",
    selectedSorting,
    "searchedCountries",
    searchedCountries,
    "selectedCountry",
    selectedCountry,
    "Photos",
    photos
  );

  const clickHandler = (item) => {
    setShowDetail(item);
    setSelectedCountry(item.name);
  };

  console.log("showDetail", showDetail);

  return (
    <>
      <div>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <main
        className={`flex min-h-screen flex-col items-center   ${inter.className}`}
      >
        <Filter
          filterButtons={filterButtons}
          sortButtons={sortButtons}
          handleFilter={handleFilter}
          activeFilters={activeFilters}
          selectedRegion={selectedRegion}
          selectedSorting={selectedSorting}
          handleSorter={handleSorter}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
          detailButtons={detailButtons}
          setQuery={setQuery}
          setShowMap={setShowMap}
          showMap={showMap}
          setMainImage={setMainImage}
        />

        {showDetail ? (
          //IMAGE GALLERY
          <section >
            <div className="flex flex-col md:flex-row gap-x-4   md:border-4">
            <div
              //key={i}
              // onClick={() => clickHandler(photo)}
              className="relative  flex-1 min-w-[300px] lg:min-w-[40vw]  flex-grow"
            >
              {/* {showDetail && ( */}
              <Image
                fill
                style={{ objectFit: "cover" }}
                // src={showDetail.travel}
                src={mainImage ? mainImage : showDetail.travel}
                // alt={country.name}
                className="rounded hover:opacity-90 shadow-xl "
              />
              {/* )} */}
              <div className="absolute top-2 left-0 px-2 py-1 rounded-r text-white bg-amber-500">
                {selectedCountry}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4  justify-end">
              {/* {photos.slice(0, 7).map((photo, i) => ( */}
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  // onClick={() => clickHandler(photo)}
                  onClick={() => setMainImage(showDetail.travel)}
                  className="relative w-80 md:w-[12vw] aspect-square cursor-pointer "
                >
                  {/* {photo.urls.regular && ( */}
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    // src={photo.urls.regular}
                    src={showDetail.travel}
                    // alt={country.name}
                    className="rounded hover:opacity-90 shadow-xl"
                  />
                  {/* )} */}
                  {/* <div className="absolute top-2 left-0 px-2 py-1 rounded-r text-white bg-amber-500">
                    {selectedCountry}
                  </div> */}

                  <div className="flex items-center absolute bottom-1 left-0  text-white ">
                    {selectedSorting === "Rating" ? (
                      <div className="flex flex-1 items-center gap-1 px-3 py-1 rounded-r text-white bg-blue-500">
                        <PiScalesBold className="h-5 w-5" />{" "}
                        {/* {country?.gini < 35
                          ? " Good"
                          : country?.gini < 50
                          ? " Avg"
                          : " Poor"} */}
                      </div>
                    ) : selectedSorting === "Area" ? (
                      <div className="flex flex-1 items-center gap-1 px-3 py-1 rounded-r text-white bg-teal-500">
                        <BsMinecartLoaded className="h-5 w-5" />{" "}
                        {/* {country?.area < 1000000
                          ? " Low"
                          : country?.area < 5000000
                          ? " Med"
                          : " High"} */}
                      </div>
                    ) : selectedSorting === "Population" ? (
                      <div className="flex flex-grow items-center gap-1 px-3 py-1 rounded-r text-white bg-rose-500">
                        <HiUsers className="h-5 w-5" />{" "}
                        {/* {(country?.population / 1000000).toFixed(2) + "mil"} */}
                      </div>
                    ) : null}
                  </div>
                  {/* <button
                key={country.cioc}
                className="p-2 bg-white rounded-full shadow-lg absolute top-3 right-2"
                onClick={() => handleFavorites(country)}
              >
                {favorited?.includes(country) ? (
                  <HiHeart className="h-5 w-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                ) : (
                  <HiOutlineHeart className="h-5 w-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                )}
              </button> */}
                </div>
              ))}
            </div>
            
            </div>
            {/* <div className="w-2/3 border-4">
        
        <p >
          There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by
          injected humour, or randomised words which don't look even
          slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing
          hidden in the middle of text. All the Lorem Ipsum generators on
          the Internet tend to repeat predefined chunks as necessary, making
          this the first true generator on the Internet.
        </p>
        </div> */}
         
        
          </section>
        ) : showMap ? (
          //MAP SEARCH
          <section>
            <div className="border-4 flex-1 min-w-[300px] lg:min-w-[80vw]  flex-grow">
                <TravelMap selectedCountry={selectedCountry} filteredResults={filteredResults}/>
            </div>

          </section>
        ) : (
          //MAIN SEARCH
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
              {filteredResults?.slice(0, 16).map((country, i) => (
                <div
                  key={i}
                  onClick={() => clickHandler(country)}
                  className="relative w-72 h-72 cursor-pointer "
                >
                  {country.travel && (
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      src={country?.travel}
                      alt={country?.name}
                      className="rounded hover:opacity-90 shadow-xl"
                    />
                  )}
                  <div className="absolute top-2 left-0 px-2 py-1 rounded-r text-white bg-amber-500">
                    {country?.name}
                  </div>

                  <div className="flex items-center absolute bottom-1 left-0 text-white text-xs">
                    {selectedSorting === "Rating" ? (
                      <div className="flex flex-1 items-center gap-1 px-3 py-1 rounded-r text-white bg-blue-500 ">
                        <PiScalesBold className="h-5 w-5" />{" "}
                        {country?.gini < 35
                          ? " Good"
                          : country?.gini < 50
                          ? " Avg"
                          : " Poor"}
                      </div>
                    ) : selectedSorting === "Area" ? (
                      <div className="flex flex-1 items-center gap-1 px-3 py-1 rounded-r text-white bg-teal-500">
                        <BsMinecartLoaded className="h-5 w-5" />{" "}
                        {country?.area < 1000000
                          ? " Low"
                          : country?.area < 5000000
                          ? " Med"
                          : " High"}
                      </div>
                    ) : selectedSorting === "Population" ? (
                      <div className="flex flex-grow items-center gap-1 px-3 py-1 rounded-r text-white bg-rose-500">
                        <HiUsers className="h-5 w-5" />{" "}
                        {(country?.population / 1000000).toFixed(0) + "m"}
                      </div>
                    ) : null}
                  </div>
                  <button
                    key={country?.cioc}
                    className="p-2 bg-white rounded-full shadow-lg absolute top-2 right-2"
                    onClick={() => handleFavorites(country)}
                  >
                    {favorited?.includes(country) ? (
                      <HiHeart className="h-5 w-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                    ) : (
                      <HiOutlineHeart className="h-5 w-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
