import React from "react";

const Box = (props) => {
  return (
    <div
      style={{width: props.width, height: props.height, backgroundColor: props.bg}}>
      {console.log(props)}
      {console.log(props.children)}
      {console.log(typeof props.children)}  {/* object */}
      {props.children}
    </div>
  );
};

const Card = ({width, height, bg, children}) => {
  return (
    <div style={{width:width, height:height, backgroundColor:bg}}>
      {children}
      {console.log(children)}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Box width="100px" height="100px" bg="lightblue">
        <h3>Heading</h3>
        <p>This is a paragraph inside the box.</p>
      </Box>
      <Card width="100px" height="100px" bg="lightgreen">
        <p>Card content passed as children</p>
      </Card>
    </div>
  );
};

export default App;
