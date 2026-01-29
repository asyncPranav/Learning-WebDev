const App = () => {
  function getName(name) {
    return name;
  }

  function handleClick() {
    alert("Button clicked!");
  }

  const handleInput = (event) => {
    // console.clear();
    console.log("Input changed: " + event.target.value);
  };

  const name1 = "asyncPranav";
  const name2 = "Pranav singh chandel";

  return (
    <div>
      <h1>Hello {getName(name1)}</h1>
      <h1>Bye {getName(name2)}</h1>
      <button onClick={handleClick}>Click Me</button>
      &nbsp;
      <button onClick={() => alert("Say Hello Button Clicked !!")}>Say Hello</button>
      <br />
      <br />
      <input type="text" onChange={handleInput} placeholder="Type something..."/>
      <br />
      <p
        onMouseOver={() => console.log("Mouse hovered over the paragraph!")}
        onDoubleClick={() => console.log("Double clicked over the paragraph!")}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, ipsa
        fuga cumque magni assumenda quidem ab enim earum quod ea corrupti sed
        error quam iusto a tempore voluptatibus quia qui?
      </p>
    </div>
  );
};

export default App;
