import React from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { PiScalesBold } from "react-icons/pi";
import { BsMinecartLoaded } from "react-icons/bs";
import { FaGlobeAfrica } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";

function Filter({
  filterButtons,
  sortButtons,
  handleFilter,
  activeFilters,
  selectedRegion,
  selectedSorting,
  handleSorter,
  setShowDetail,
  showDetail,
  detailButtons,
  setQuery,
  setShowMap,
  showMap,
  setMainImage
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full my-6 text-xs md:text-sm md:px-20 lg:px-14 xl:px-20 2xl:px-40 ">
      {showDetail || showMap ? (
        <>
          <div className="flex gap-1 md:gap-2 my-1">
            {detailButtons.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(item)}
                className={
                  selectedRegion === item
                    ? "cursor-pointer rounded-full border p-2 bg-teal-500 text-white hover:shadow-xl active:scale-95 transition duration-200"
                    : "cursor-pointer rounded-full border-2 border-teal-500 text-teal-600 py-2 px-3 hover:shadow-xl active:scale-95 transition duration-200"
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-1 md:gap-3 my-1">
            <button
              onClick={() => {
                setShowDetail(true), setShowMap(false);
              }}
              className={
                "cursor-pointer active:scale-95 transition duration-200"
              }
            >
              <RiGalleryView2
                className={`h-10 w-10 p-2  rounded-full border-2 border-amber-500 hover:shadow-xl ${
                  showDetail === true
                    ? "bg-amber-500 text-white"
                    : " text-amber-500"
                }  `}
              />
            </button>

            <button
              onClick={() => {
                setShowDetail(true), setShowMap(true);
              }}
              className={
                "cursor-pointer active:scale-95 transition duration-200"
              }
            >
              <FaGlobeAfrica
                className={`h-10 w-10 p-2  rounded-full border-2 border-teal-500 hover:shadow-xl ${
                  showMap === true ? "bg-teal-500 text-white" : " text-teal-500"
                }  `}
              />
            </button>

            <button
              onClick={() => {
                setShowDetail(false), setShowMap(false), setMainImage('');
              }}
              className={
                "cursor-pointer active:scale-95 transition duration-200 "
              }
            >
              <HiOutlineX
                className={`h-10 w-10 p-2  rounded-full border-2 border-rose-500 text-rose-500 hover:shadow-xl`}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-1 md:gap-3 my-1">
            {filterButtons.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleFilter(item)}
                className={
                  selectedRegion === item
                    ? "cursor-pointer rounded border p-2 bg-teal-500 text-white active:scale-95 transition duration-200 hover:shadow-xl"
                    : "cursor-pointer rounded border-2 p-2 border-teal-500 text-teal-600 active:scale-95 transition duration-200 hover:shadow-xl"
                }
              >
                {item}
              </button>
            ))}
          </div>


          <div className='flex  justify-center items-center'>
        <input 
        // value={searchValue}
        // onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        className='text-sm rounded pl-3 w-60 text-gray-800 outline-none py-2 border-2 border-gray-400'
        placeholder="Search Countries"
        />
       </div>



          <div className="flex  gap-1 md:gap-3">
            {sortButtons.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSorter(item)}
                className={
                  "cursor-pointer active:scale-95 transition duration-200"
                }
              >
                {item === "Favorites" ? (
                  <HiHeart
                    className={`h-10 w-10 p-2  rounded-full border-2 border-rose-500 hover:shadow-xl ${
                      selectedSorting === "Favorites"
                        ? "bg-rose-500 text-white"
                        : " text-rose-500"
                    }`}
                  />
                ) : item === "Rating" ? (
                  <BsMinecartLoaded
                    className={`h-10 w-10 p-2  rounded-full border-2 border-teal-500 hover:shadow-xl ${
                      selectedSorting === "Rating"
                        ? "bg-teal-500 text-white"
                        : " text-teal-500"
                    }`}
                  />
                ) : item === "Population" ? (
                  <HiUsers
                    className={`h-10 w-10 p-2  rounded-full border-2 border-amber-500 hover:shadow-xl ${
                      selectedSorting === "Population"
                        ? "bg-amber-500 text-white"
                        : " text-amber-500"
                    }`}
                  />
                ) : (
                  <PiScalesBold
                    className={`h-10 w-10 p-2  rounded-full border-2 border-blue-500 hover:shadow-xl ${
                      selectedSorting === "Area"
                        ? "bg-blue-500 text-white"
                        : " text-blue-500"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Filter;
