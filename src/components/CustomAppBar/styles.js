import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  grid: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },

  appbar: {
    backgroundColor: "white",
    position: "sticky"
  },

  balanceText: {
    marginLeft: '5px',
    marginRight: '5px',
    color: "black"
  },

}));