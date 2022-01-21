import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  button: {
    marginTop: '20px',
    borderRadius: "5em",
    backgroundColor: "#424242",
    '&:hover' : {
      backgroundColor: "#000000",
      color: "#ffffff"
    },
  },
  microphoneButton: {
    marginTop: '15px',
    backgroundColor: "#424242",
    color: "#ffffff",
    '&:hover' : {
      backgroundColor: "#000000",
      color: "#ffffff"
    },
  },
}));