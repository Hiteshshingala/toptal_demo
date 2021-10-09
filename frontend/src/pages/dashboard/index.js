import React, { useEffect, useState } from "react";
import AddRestaurantName from "../../components/restaurant/addRestaurantName";
import RestaurantLayout from "../../components/restaurant/restaurantLayout";
import SideBar from "../../components/sidebar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./dashbord.css";
import { getUserData } from '../../services/localStorage';

function Dashboard() {
  const [isCompanyNameExist, setIsCompanyNameExist] = useState(false);
  useEffect(() => {
    checkCompanyNameExist();
  }, []);

  const checkCompanyNameExist = () => {
    let user = getUserData();
    user = user ? JSON.parse(user) : user;
    if (user && user.restaurantName) {
      setIsCompanyNameExist(true);
    } else {
      setIsCompanyNameExist(false);
    }
  };

  return (
    <>
            {!isCompanyNameExist ? (
              <>
                <AddRestaurantName checkCompanyNameExist={checkCompanyNameExist} />
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
