import './Button.css';

const Button = ({nome}) => {
  return (
    <div>
        <button className='button'>{nome}</button>
    </div>
  )
}

export default Button