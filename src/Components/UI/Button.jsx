import CartIcon from "../../assets/bag2.png"

const Button = ({ children }) => {
  return (
    <button type="submit" className="submit-button">
      <p>
        <span>إضافة إلى السلة</span>
        <br />
        <img src={CartIcon} alt="" />
      </p>
    </button>
  )
}

export default Button
