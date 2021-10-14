import React from "react";
import AddRestaurantName from "../../components/restaurant/addRestaurantName";
import RestaurantLayout from "../../components/restaurant/restaurantLayout";
import "./dashbord.css";

function Dashboard({checkCompanyNameExist, isCompanyNameExist}) {

  return (
    <>
            {!isCompanyNameExist ? (
              <>
                <AddRestaurantName checkCompanyNameExist={checkCompanyNameExist}/>
              </>
            ) : (
              <>
                <RestaurantLayout />
              </>
            )}
    </>
  );
}

export default Dashboard;
