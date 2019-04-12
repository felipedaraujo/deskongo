import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const Modal = ({ classes, open, values, onChange, onClose, onSubmit }) => (
  <div className={classes.root}>
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>Desk Booking Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To book your desk enter your name and the date you want your
            booking.
          </DialogContentText>

          <TextField
            autoFocus
            id="fullName"
            name="fullName"
            label="Full Name"
            value={values.fullName}
            type="text"
            onChange={onChange}
            fullWidth
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            value={values.email}
            type="text"
            onChange={onChange}
            fullWidth
          />

          <Grid container spacing={8}>
            <Grid item xs>
              <DatePicker
                autoOk
                id="startAt"
                name="startAt"
                label="Start at"
                value={values.startAt}
                onChange={value =>
                  onChange({
                    target: { name: 'startAt', value },
                  })
                }
                margin="normal"
                fullWidth
              />
            </Grid>

            <Grid item xs>
              <DatePicker
                autoOk
                id="endAt"
                name="endAt"
                label="End at"
                value={values.endAt}
                onChange={value =>
                  onChange({
                    target: { name: 'endAt', value },
                  })
                }
                margin="normal"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>
            CANCEL
          </Button>
          <Button color="primary" type="submit">
            CONFIRM
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  </div>
);

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

export default withRoot(withStyles(styles)(Modal));
