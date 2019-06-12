import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = ({course}) => {
  return (
    <>
      {course.parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
  
}

const Total = ({course}) => {
  const total = (course.parts.map(part => part.exercises)).reduce((a, b) => a + b, 0);
  return (
    <>
      <p>
        <strong>
          total of {total} exercises
        </strong>
      </p>
    </>
  )
  
}

const Part = ({name, exercises}) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
};

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10
      },{
        id: 2,
        name: "Using props to add data",
        exercises: 7
      },{
        id: 3,
        name: "State of a component",
        exercises: 14
      }
    ]
  };
  return (
    <div>
      <Course course={course}/>
    </div>
  )
  
  
}

ReactDOM.render(<App />, document.getElementById('root'));

