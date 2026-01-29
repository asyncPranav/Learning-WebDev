const App = () => {

  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const user = { firstName: "Pranav", lastName: "Chandel", nickname: "asyncPranav" };
  const users = [
    { firstName: "Pranav", lastName: "Chandel", age: 21 },
    { firstName: "John", lastName: "Doe", age: 25 },
    { firstName: "Jane", lastName: "Smith", age: 30 }
  ];

  return (
    <div>
      <h2>Fruits List</h2>
      <ul>
        {
          fruits.map((item, index) => <li key={index}>{index} - {item}</li>)
        }
      </ul>

      <h2>User Information</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Nick Name: {user.nickname}</p>
      <p>Full Name : {function(user){return `${user.firstName} ${user.lastName}`}(user)}</p>
      <p>Full Name : {((user) => `${user.firstName} ${user.lastName}`)(user)}</p>
      <p>Full Name : {function(){return `${user.firstName} ${user.lastName}`}()}</p>
      <p>Full Name : {(() => `${user.firstName} ${user.lastName}`)()}</p>


      <h2>Users List</h2>
      <ul>
        {
          users.map((item) => <li>{item.firstName} {item.lastName} is {item.age} years old</li>)
         
          /*  
            Above map fn return an array of li elements like shown below:
            [
              <li>Pranav Chandel is 21 years old</li>,
              <li>John Doe is 25 years old</li>,
              <li>Jane Smith is 30 years old</li>,
            ]
          */
        }
      </ul>
    </div>
  )
}

export default App
