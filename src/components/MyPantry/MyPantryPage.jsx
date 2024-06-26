import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSearch from "./DropdownSearch/DropdownSearch";
import UserIngredientsTable from "./UserIngredientsTable/UserIngredientsTable";
import MyPantrySwitch from "./MyPantrySwitch/MyPantrySwitch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import "./MyPantryPage.css";
import { Stack } from "react-bootstrap";

export default function MyPantryPage() {
  const dispatch = useDispatch();

  const recipes = useSelector((store) => store.recipes);

  return (
    <>
      {/* <Container>
        <Row>
          <Col className="col-mypantry-h1"> */}
            <h1 className="kurale-regular">MyPantry</h1>
          {/* </Col>
        </Row>
        <Row>
          <Col> */}
            {/* <Stack direction="horizontal"> */}
              <DropdownSearch />
          {/* </Col>
          <Col sm="3"> */}
              <MyPantrySwitch />
          {/* </Col> */}
            {/* </Stack> */}
        {/* </Row>
        <Row>
          <Col> */}
            <UserIngredientsTable />
          {/* </Col>
        </Row>
      </Container> */}
    </>
  );
}
