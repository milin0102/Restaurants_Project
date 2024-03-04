const express = require("express");
const app = express()
const boot = require("./configs/boot")

//calling boot file to initialize server
boot.init();

