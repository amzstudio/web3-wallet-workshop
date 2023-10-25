import React, { useState } from 'react';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import peccy from '../../css/image/peccy.jpeg';
import starpeccy from '../../css/image/starpeccy.jpeg';
import jessy from '../../css/image/jessy.jpeg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const steps = [
    {
      label: 'From',
    },
    {
      label: 'To',
    },
    {
      label: 'Amount',
    },
  ];

export default function Send() {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const [friend, setFriend] = React.useState('');

    const handleChange = (event) => {
        setFriend(event.target.value);
    };


    return (
        <Container
          header={
            <SpaceBetween direction="horizontal" size="l">
            <Header
              variant="h1"
              description=""
            >
            <SpaceBetween direction="horizontal" size="l">
              Send Token
              <Button href="/wallet" sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
            </SpaceBetween>
            </Header>
            </SpaceBetween>
          }
        >
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant='subtitle1'>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                {index === 0 && 
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'whitesmoke' }}>
                <ListItem>
                  <ListItemAvatar>
                  <Avatar
                alt="peccy"
                src={peccy}
                sx={{ width: 56, height: 56 }}
                />
                </ListItemAvatar>
                  <ListItemText primary="Peccy" disableTypography="true"  sx={{ margin: 2, color: 'text.primary', fontSize: 20, fontWeight: 'medium' }} />
                </ListItem>
                </List>
                }
                {index === 1 &&
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <Select
                        displayEmpty
                        value={friend}
                        onChange={handleChange}
                        defaultValue='Select Friend'
                        >
                        <MenuItem value={10}>     
                                <ListItemButton >
                                    <ListItemAvatar>
                                    <Avatar alt="starpeccy" src={starpeccy} />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="StarPeccy" disableTypography="true"  sx={{ margin: 2, color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}
                                     />
                                </ListItemButton>
                        </MenuItem>
                        <MenuItem value={20}>              
                                  <ListItemButton  >
                                      <ListItemAvatar>
                                         <Avatar alt="jessy" src={jessy} />
                                      </ListItemAvatar>
                
                                    <ListItemText
                                         primary="Jessy" disableTypography="true"  sx={{ margin: 2, color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}
                                     />
                                    </ListItemButton>
                        </MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                }
                {index === 2 &&
                    <Box sx={{ minWidth: 120 }}>

                    </Box>
                }

                  <Button
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                { index > 0 &&
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                  }
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
        </Container>
      );
}