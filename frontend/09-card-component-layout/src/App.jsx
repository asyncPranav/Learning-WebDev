import React from "react";
import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";

const App = () => {
  return (
    <div>
      <Header text="Self learning react : props & children" />

      <Card width="200px" height={200} backgroundColor="lightgreen">
        <Content>
          <h3>Heading</h3>
          <p>This is a simple card component.</p>
        </Content>
      </Card>

      <Card width={300} height={100} backgroundColor="lightblue">
        <Content>
          <h3>Another Card</h3>
          <p>This is another simple card component.</p>
        </Content>
      </Card>
      
    </div>
  );
};

export default App;
