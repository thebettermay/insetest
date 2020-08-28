import "./style.css";
import {
  URL,
  ADDBUTTON,
  DELETEBUTTON,
  TABLE,
  COUNTER,
  COUNTERCONTAINER,
  ALLBUTTONS,
  CLEARBUTTON,
  PRELOADER,
} from "./js/constants/constants";

import { img } from "./images/envelope-solid.svg";
import { img1 } from "./images/female-solid.svg";
import { img3 } from "./images/male-solid.svg";

import RandomUserApi from "./js/modules/randomUserApi";
import DataStorage from "./js/modules/dataStorage";

import TableRow from "./js/components/TableRow";
import Gender from "./js/components/Gender";
import Name from "./js/components/Name";
import Email from "./js/components/Email";
import Date from "./js/components/Date";
import Pic from "./js/components/Pic";
import Phone from "./js/components/Phone";
import Location from "./js/components/Location";
import DeleteRow from "./js/components/DeleteRow";
import Controller from "./js/components/Controller";
import RenderOnLoad from "./js/components/RenderOnLoad";

import getDate from "./js/utils/getDate";
import checkTableNodes from "./js/utils/checkTableNodes";
import storeAndGetTheData from "./js/utils/storeAndGetTheData";
import getTheData from "./js/utils/getTheData";
import getTheActivePageNumber from "./js/utils/getTheActivePageNumber";
import checkCounterNodes from "./js/utils/checkCounterNodes";

const RANDOMUSERAPI = new RandomUserApi(URL);
const GENDER = new Gender();
const NAME = new Name();
const EMAIL = new Email();
const DATE = new Date();
const PIC = new Pic();
const PHONE = new Phone();
const LOCATION = new Location();
const DELETEROW = new DeleteRow(TABLE, DELETEBUTTON, COUNTERCONTAINER);
const TABLEROW = new TableRow(
  GENDER,
  NAME,
  EMAIL,
  DATE,
  PIC,
  PHONE,
  LOCATION,
  TABLE,
  getDate
);
const DATASTORAGE = new DataStorage(RANDOMUSERAPI, ADDBUTTON); //TABLEROW, DELETEROW);
const RENDERONLOAD = new RenderOnLoad(
  GENDER,
  NAME,
  EMAIL,
  DATE,
  PIC,
  PHONE,
  LOCATION,
  TABLE,
  getDate,
  COUNTER
);
const CONTROLLER = new Controller(
  DATASTORAGE,
  TABLEROW,
  DELETEROW,
  RENDERONLOAD,
  COUNTER,
  TABLE,
  COUNTERCONTAINER,
  ALLBUTTONS,
  CLEARBUTTON,
  DELETEBUTTON,
  ADDBUTTON,
  PRELOADER,
  checkTableNodes,
  storeAndGetTheData,
  getTheData,
  getTheActivePageNumber,
  checkCounterNodes
);

CONTROLLER.eventListeners();
