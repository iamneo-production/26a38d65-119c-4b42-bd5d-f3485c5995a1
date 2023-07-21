import React from 'react'

const NextArrow = (props) => {
    const { className, style, onClick } = props;

  return (
    <div
    className={className}
    style={{ ...style,background:"black", borderRadius:"50px",display:"flex",justifyContent:"center",padding:"4px"}}
    onClick={onClick}></div>
  )
} 

export default NextArrow;