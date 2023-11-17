import {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useSelector} from "../store";
import {
  fetchGetRecommendedProducts,
  fetchGetSelectedProduct, recommendedProductsSelector,
  selectedProductSelector, setRecommendedProducts,
  setSelectedProduct
} from "../store/products/product.slice.ts";
import {useNavigate, useParams} from "react-router";
import {Box, Chip, Drawer, Modal, Rating, Stack} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useUpdateEffect} from "usehooks-ts";
import Header from "../components/Header.tsx";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecommendIcon from '@mui/icons-material/Recommend';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/product/ProductCard.tsx";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
};

const Product: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedProduct = useSelector(selectedProductSelector)
  const recommendedProducts = useSelector(recommendedProductsSelector)
  const params = useParams()
  const [openImage, setOpenImage] = useState(false)
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    if(params.id) {
      dispatch(fetchGetSelectedProduct({id: +params.id}))
    }
    return () => {
      dispatch(setSelectedProduct(null))
      dispatch(setRecommendedProducts({recommendedProducts: []}))
      setState({...state, bottom: false})
    }
  }, [params.id])
  useUpdateEffect(() => {
    if(selectedProduct?.id) {
      dispatch(fetchGetRecommendedProducts({id: selectedProduct.id}))
    }
  }, [selectedProduct])
  const handleCloseImage = () => {
    setOpenImage(false)
  }
  useEffect(() => {
    console.log(recommendedProducts)
  }, [recommendedProducts]);
  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`)
    setState({...state, bottom: false})
  }
  return (
    <Box>
      <Header/>
      <Stack direction="row" gap={5} sx={{ py: 5, px: 10 }}>
        <Box
          onClick={() => setOpenImage(true)}
          component="img"
          sx={{
            maxWidth: { xs: 350, md: 500 },
          }}
          alt={selectedProduct?.image}
          src={selectedProduct?.image}
        />
        <Box>
          <Stack sx={{ mb: 3 }} direction="row" alignItems="center" gap={2}>
            <Chip icon={<AttachMoneyIcon />} label={selectedProduct?.price} color="primary" variant="filled" sx={{ fontSize: 16 }}/>
            <Chip label={selectedProduct?.category} color="secondary" sx={{ fontSize: '16px' }} size="medium"/>
            <Button variant="outlined" endIcon={<RecommendIcon />} onClick={() => setState({...state, bottom: true})}>
              Show similar products
            </Button>
          </Stack>
          <Typography variant="h4" sx={{ mb: 3 }} >
            {selectedProduct?.title} {' '}
            <Rating name="rating" value={selectedProduct?.rating.rate ? +selectedProduct?.rating.rate : 0} readOnly />
          </Typography>

          <Typography variant="h5">
            {selectedProduct?.description}
          </Typography>
        </Box>
      </Stack>
      <Drawer anchor="bottom" open={state["bottom"]} onClose={() => setState({...state, bottom: false})}>
        <Stack>
          <Button variant="contained" onClick={() => setState({...state, bottom: false})}><ArrowDropUpIcon/></Button>
          <Grid container justifyContent="space-between" alignItems="stretch" sx={{ px: 4, py: 3, gap: 2 }}>
            {recommendedProducts.map((product) => (
              <Grid item onClick={() => handleNavigate(product.id)}>
                <ProductCard description={product.description} price={product.price} category={product.category} image={product.image} rating={product.rating} title={product.title}/>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Drawer>
      <Modal
        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="img"
            sx={{
              maxWidth: { xs: 350, md: 500 },
            }}
            alt={selectedProduct?.image}
            src={selectedProduct?.image}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Product;