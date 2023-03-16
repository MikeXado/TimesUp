import { createStore } from "@reduxjs/toolkit";
import appSlices from "./store/appSlices";

const makeStore = createStore(appSlices);

export default makeStore;
