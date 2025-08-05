const Button = (props) => {
  return (
    <button onClick={props.func}>{props.title}</button>
  );
};

export default Button;
