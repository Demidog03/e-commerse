import {FC, useEffect} from 'react'
import Header from "../components/Header.tsx";
import {useSelector} from "../store";
import {fetchGetProducts, productsSelector} from "../store/products/product.slice.ts";
import {useDispatch} from "react-redux";
import ProductCard from "../components/product/ProductCard.tsx";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router";

const Home: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(productsSelector)

  useEffect(() => {
    dispatch(fetchGetProducts())
  }, []);

  return (
      <div>
        <Header/>
        <Grid container justifyContent="space-between" alignItems="stretch" sx={{ px: 4, py: 3, gap: 2 }}>
          {products?.map((product) => (
            <Grid item onClick={() => navigate(`/product/${product.id}`)}>
              <ProductCard description={product.description} price={product.price} category={product.category} image={product.image} rating={product.rating} title={product.title}/>
            </Grid>
          ))}
        </Grid>
      </div>
  )
}

export default Home