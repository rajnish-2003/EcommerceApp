import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export const NotLoggedInDialog = ({ open, handleClose }) => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color:'#2874f0',fontSize:19}}>{"Not Logged In !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be logged in to place an order. Please log in or sign up to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
         
        </DialogActions>
      </Dialog>
    );
  };
  