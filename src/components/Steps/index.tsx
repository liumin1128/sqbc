import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     button: {
//       marginTop: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     },
//     actionsContainer: {
//       marginBottom: theme.spacing(2),
//     },
//     resetContainer: {
//       padding: theme.spacing(3),
//     },
//   }),
// );

function getSteps() {
  return ['Select file', 'Select directory', 'Finally'];
}

export default function VerticalLinearStepper({
  status,
  onNext,
  onBack,
  onReset,
}) {
  // const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = async () => {
    await onNext(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    onBack(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    onReset();
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    disabled={status === 'creating'}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0}>
          {/* <Typography>Finished</Typography> */}
          <Button onClick={handleReset} variant="contained">
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
