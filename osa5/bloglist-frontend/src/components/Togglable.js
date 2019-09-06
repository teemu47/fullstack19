import React, {useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}> {props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
