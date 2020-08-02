import React from 'react';
import { useAdequateComponent, useAdequateComponent as $ } from './adequate';

function Card(props) {
  const card = $(Card, props);
  return (
    <card.root as="div">
      {/*{props.children}*/}
    </card.root>
  );
};

Card.Header = function Header(props) {
  const header = $(Headers, props);
  return (
    <header.root as="header">
      {/*{props.children}*/}
    </header.root>
  );
};

Card.Body = function Body(props) {
  const body = $(Body, props);
  return (
    <body.root as="main">
      {props.children}
    </body.root>
  );
};

Card.Footer = function Footer(props) {
  const footer = $(Footer, props);
  return (
    <footer.root as="footer">
      {props.children}
    </footer.root>
  );
};

function Button(props) {
  const button = $(Button, props);
  
  return (
    <button.root as="button" type="button">
      {props.children}
    </button.root>
  );
};

function Text(props) {
  const text = $(Text, props);
  return (
    <text.root as="p">
      {props.children}
    </text.root>
  );
}

Text.Title = function Title(props) {
  const title = $(Title, props);
  return (
    <title.root as="h1">
      {props.children}
    </title.root>
  );
};

const Icon = {};

Icon.Cross = function Cross(props) {
  const cross = $(Cross, props);
  return <cross.root as="span">X</cross.root>
}


export { Card, Text, Button, Icon };
