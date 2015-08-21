var React = require('react');
var flux = require("../component/flux.js");
var Application = require("../component/Application.jsx");
var TodoItem = require("../component/TodoItem.jsx");

React.render(<Application flux={flux} />, document.getElementById("container"));
