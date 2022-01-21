import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  addButton: {
    marginTop: '20px',
    borderRadius: "5em",
    backgroundColor: "#424242",
    '&:hover' : {
      backgroundColor: "#000000",
      color: "#ffffff"
    },
  },
  clearButton: {
    marginTop: '20px',
    borderRadius: "5em",
  },
}));