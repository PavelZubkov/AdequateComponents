import React from 'react';
import { useAdequateComponent } from "./adequate";

function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
};

Card.Header = (props) => {
  return (
    <header className="card_header">
      {props.children}
    </header>
  );
};

Card.Body = (props) => {
  return (
    <main className="card_main">
      {props.children}
    </main>
  );
};

Card.Footer = (props) => {
  return (
    <footer className="card_footer">
      {props.children}
    </footer>
  );
};

const Button = (props) => {
  return (
    <button
      className="button"
      type="button"
      onClick={props.onClick || (() => {})}
    >
      {props.children}
    </button>
  );
};

const Text = (props) => {
  return (
    <p className="text">{props.children}</p>
  );
}

Text.Title = (props) => {
  return (
    <h1 className="title">{props.children}</h1>
  );
};

export { Card, Text, Button };
