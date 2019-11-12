import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import mercadoPago from '../../../images/mercadoPagoNuevo.jpg';
import tarjetaCredito from '../../../images/tarjetas.jpg';
import tarjetaDebito from '../../../images/tarjetaDebito.jpg';
import efectivo from '../../../images/efectivo3.jpg';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        width: 50,
        height: 50,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));
  

const payments = [
    {
        title: "Mercado Pago",
        description: "Fast, safe and no additional cost. Powered by Mercado Libre",
        image: mercadoPago,
        width: 250,
        height: 200
    },
    {
        title: "Credit cards",
        description: "We accept any credit card (Visa, Mastercard, Amex) from any bank",
        image: tarjetaCredito,
        width: 200,
        height: 200,
        marginLeft: 20

    },
    {
        title: "Debit cards",
        description: "We accept any debit card from any bank",
        image: tarjetaDebito,
        width: 200,
        height: 200,
        marginLeft: 20
    },
  
    {
        title: "Cash",
        description: "We accept cash payments",
        image: efectivo,
        width: 200,
        height: 200,
        marginLeft: 20
    },
  ];

  
export default function PaymentCard() {
  const classes = useStyles();
 

  return (
    <div className={classes.root}>
     {payments.map(payment => (
      <Card className={classes.card} style={{width: 250, marginLeft: 30, marginRight: 30, marginTop: 10}}>
        <CardMedia
          className={classes.image}
          image={payment.image}
          style={{width: payment.width, height: payment.height, 'margin-left': payment.marginLeft}}	
          title={payment.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {payment.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {payment.description}
          </Typography>
        </CardContent>
      <CardActions>
      </CardActions>
    </Card>
     ))}
     </div>
     
  );
}