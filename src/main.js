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
} from "./js/constants/constants";

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
import sendEmail from "./js/utils/sendEmail";

const RANDOMUSERAPI = new RandomUserApi(URL, ALLBUTTONS);
const GENDER = new Gender();
const NAME = new Name();
const EMAIL = new Email(sendEmail);
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
const DATASTORAGE = new DataStorage(RANDOMUSERAPI, ALLBUTTONS); //TABLEROW, DELETEROW);
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
  CLEARBUTTON
);

COUNTERCONTAINER.addEventListener("click", () => {
  CONTROLLER.activePageButton(TABLE);
  CONTROLLER.renderOnClick();
});
window.addEventListener("load", () => {
  CONTROLLER.renderOnWindowLoad();
});
DELETEBUTTON.addEventListener("click", () => {
  CONTROLLER.renderWhileDelete();
});

ADDBUTTON.addEventListener("click", () => {
  CONTROLLER.renderRow();

  // CONTROLLER.deleteButtonVisible();
});

CLEARBUTTON.addEventListener("click", () => {
  CONTROLLER.clearAllRender();
});
