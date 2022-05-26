import React, { useState } from "react";
import "./Rentals.css";
import { Link, useLocation } from "react-router-dom";
import { Button, ConnectButton, Icon} from "web3uikit";
//import {useLocation} from "react-router";
import logo from "../images/airbnbRed.png";
import RentalsMap from "../components/RentalsMap";
//import {searchFilters}
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";

//import { ConnectButton } from "web3uikit";
// To start the node js server use "nvm use 16.15.0"

const Rentals = () => {
  const{state: searchFilters} = useLocation();
  const [highLight, setHighLight] = useState();
  const {Moralis} = useMoralis();
  const [rentalsList, setRentalsList] = useState();
  const [coordinates, setcoordinates] = useState([]);

  // const rentalsList = [
  //   {
  //     attributes: {
  //       city: "New York",
  //       unoDescription: "3 Guests • 2 Beds • 2 Rooms",
  //       dosDescription: "Wifi • Kitchen • Living Area",
  //       imgUrl:
  //         "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
  //       lat: "40.716862",
  //       long: "-73.999005",
  //       name: "Apartment in China Town",
  //       pricePerDay: "3",
  //     },
  //   },
  // ];

  // let cords = [];
  // rentalsList.forEach((e) => {
  //   cords.push({ last: e.attributes.lat, lng: e.attributes.long});
  // });

  useEffect(() => {

    async function fetchRentalsList(){

      const Rentals = Moralis.Object.extend("Rentals");
      const query = new Moralis.Query(Rentals);
      query.equalTo("city", searchFilters.destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", searchFilters.guests);

      const result = await query.find();

      let cords = [];
      result.forEach((e) => {
        cords.push({ last: e.attributes.lat, lng: e.attributes.long});
     });

      setcoordinates(cords);
      setRentalsList(result);

    }

    fetchRentalsList()

  }, [searchFilters])

  return (
    <>
     
     <div className="topBanner">
       <div>
         <Link to="/">
           <img className="logo" src={logo} alt="logo"></img>
         </Link>
       </div>
       <div className="searchReminder">

         <div className="filter">
           {searchFilters.destination}
       </div>
       <div className="vl" />
       <div className="filter">
       {`
         ${searchFilters.checkIn.toLocaleString("default", {month: "short",})}
         ${searchFilters.checkIn.toLocaleString("default", {day: "2-digit",})}
         -
         ${searchFilters.checkOut.toLocaleString("default", {month: "short",})}
         ${searchFilters.checkOut.toLocaleString("default", {day: "2-digit",})}
         `}
         </div>
       <div className="vl" />
       <div className="filter"></div>
        {searchFilters.guests} Guest
       </div>
       <div className="searchFiltersIcon">
         <Icon fill="#ffffff" size={20} svg="search" />
       </div>
       <div className="lrContainers">
         <ConnectButton />
       </div>
     </div>

      <hr className="line" />
      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stay Here! Cool Destination Left Side :-)
          {rentalsList &&
          rentalsList.map((e, i) => {
            return(
              <>
                  <hr className="line2" />
                  {/* <div className="rentalDiv"> */}
                  <div className={highLight == i ? "rentalDivH ": "rentalDiv"}>
                    <img className="rentalImg" src={e.attributes.imgUrl}></img>
                    <div className="rentalInfo">
                      <div className="rentalTitle">{e.attributes.name}</div>
                      <div className="rentalDesc">
                        {e.attributes.unoDescription}
                      </div>
                      <div className="rentalDesc">
                        {e.attributes.dosDescription}
                      </div>
                      <div className="bottomButtom">
                        <Button
                          text="Stay Here"
                          />
                          <div className="price">
                            <Icon fill="#808080" size={10} svg="matic" /> {e.attributes.pricePerDay} / Day
                          </div>
        
                      </div>
                    </div>
                  </div>
              </>

            )
          }
          )}
        </div>
      
      <div className="rentalsContentR">
          Stay Here! Cool Destination Right Side :-)
          {/* <RentalsMap locations={cords} setHighLight={setHighLight}/> */}
          <RentalsMap locations={coordinates} setHighLight={setHighLight}/>
        </div>
        </div>

        

     {/* <hr className="line"  />
     <div className="rentalsContent">
       <div className="rentalContentL">
         Stay here! Cool Destination :-)
       </div>
       <div className="rentalContentR">
       Stay here! Cool Destination On The Rightside:-)
       </div>
     </div> */}



    </>
  );
};

export default Rentals;
