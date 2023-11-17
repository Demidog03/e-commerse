import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {FC} from "react";
import {Rating as RatingType} from "../../store/products/product.types.ts";
import {Badge, Box, Chip, Rating } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ProductCardProps {
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: RatingType
}

const ProductCard: FC<ProductCardProps> = ({title, image, category, rating, price, description}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (e: any) => {
    e.stopPropagation()
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 350, height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {title[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={category}
      />
      <Box>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="Paella dish"
          sx={{ width: 350 }}
        />
        <CardContent>
          <Chip label={"$ " + price} />
        </CardContent>
        <CardActions disableSpacing>
          <Badge badgeContent={rating.count} color="primary" max={999}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Badge>
          <Rating name="read-only" value={rating.rate} readOnly />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {description}
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}

export default ProductCard