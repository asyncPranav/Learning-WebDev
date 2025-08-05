function Header() {
  return(
    <h1>Header component</h1>
  )
}
export default Header;
/*
  - Default export can export only one thing
  - You can also write 'export default' before function Header(){..}
  - During import name can be different
*/


function Card() {
  return(
    <h1>Card component</h1>
  )
}
export {Card};
/*
  - Named export can export many things together
  - export {Card1, Card2, Card3....}
  - You can also write 'export' before function Card(){..}
  - During import name must be same 
*/