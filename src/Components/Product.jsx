import classes from "./Product.module.css"
import Button from "./UI/Button"

const Product = ({ imageUrl, title, description, weight, price }) => {
  const formSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className={classes.product}>
      {/* <div className="image">
        <img src={imageUrl} alt="" />
      </div> */}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="weight">
        <div className="key">
          <b>وزن</b>
        </div>
        <div className="value">{weight} كيلوغرام</div>
      </div>
      <div className="price">
        <div className="key">
          <b>الثمن</b>
        </div>
        <div className="value">{price} درهم</div>
      </div>
      <form onSubmit={formSubmitHandler}>
        <Button />
      </form>
    </div>
  )
}

export default Product
