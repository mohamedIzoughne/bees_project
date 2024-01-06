import "./App.css"
import Product from "./Components/Product"
import Image from "./assets/honey.png"

function App() {
  return (
    <div>
      <Product
        title={"عسل السدر"}
        description={
          " عسل السدر يتميز بلونه الداكن وقوامه الكثيف يُعتبر عسل السدر من بين أفضل أنواع العسل نظرًا لخصائصه الصحية الفريدة "
        }
        price={250}
        weight={1}
        imageUrl={Image}
      />
    </div>
  )
}

export default App
