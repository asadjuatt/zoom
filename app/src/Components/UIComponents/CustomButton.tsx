import React from 'react'
import { Button } from 'react-bootstrap'
interface CustomButtonProps {
  onClick: ()=>void;
  title:string;
}
export default function CustomButton({onClick, title}: CustomButtonProps) {
  return <Button variant="primary" onClick={()=>onClick()}>{title}</Button>
}
