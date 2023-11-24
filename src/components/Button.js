import './Button.css';

const Button = ({nome, onClick}) => {
  return (
    <div>
        <button onClick={onClick} className='button'>{nome}</button>
    </div>
  )
}

export default Button