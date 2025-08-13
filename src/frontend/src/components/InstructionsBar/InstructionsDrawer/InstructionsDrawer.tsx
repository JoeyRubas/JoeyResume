import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  AppBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Box,
  Button,
  Checkbox,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import {useLocation} from '@tanstack/react-router';
import {KmxArrowLeftFilled, KmxQuestionCircleStroked} from "@kmx/mui-icons";
import INSTRUCTIONS_CONFIG from "../../../config/instructions.ts";
import {InstructionListType, ProfileRoutes} from "../../../types/config.ts";
import useLocalStorage from '../../../hooks/useLocalStorage';
import FinishedExampleModal from "../FinishedExampleModal/FinishedExampleModal.tsx";

export default function InstructionsDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const instructionsConfig = INSTRUCTIONS_CONFIG[pathname as ProfileRoutes]
  if (!instructionsConfig) {
    return null; // No instructions available for this route
  }

  const defaultTopicsCompleted = instructionsConfig.topics?.reduce((acc, topic) =>
    ({
      ...acc,
      [topic.name]: false,
    }), {} as Record<string, boolean>);

  const [topicsCompleted, setTopicsCompleted] = useLocalStorage<Record<string, boolean>>(`route-${pathname}-defaultTopicsCompleted`, defaultTopicsCompleted);
  const initialIncompleteTopic = Object.entries(topicsCompleted).find(([_, completed]) => !completed)?.[0];

  const [openTopic, setOpenTopic] = useLocalStorage<string | undefined>(`route-${pathname}-openTopic`, initialIncompleteTopic);

  useEffect(() => {
    const nextIncompleteTopic = Object.entries(topicsCompleted).find(([_, completed]) => !completed)?.[0];
    setOpenTopic(nextIncompleteTopic);
  }, [topicsCompleted]);


  const isDisabled = (topicName: string) => {
    const topicIndex = instructionsConfig.topics?.findIndex(topic => topic.name === topicName);
    const prevTopicIndex = topicIndex !== undefined && topicIndex > 0 ? topicIndex - 1 : -1;
    if (prevTopicIndex === -1) {
      return false;
    } else {
      const prevTopicName = instructionsConfig.topics?.[prevTopicIndex]?.name;
      return !topicsCompleted || !topicsCompleted[prevTopicName];
    }
  }

  return (
    <Box data-testid='instructions-drawer'>
      <IconButton
        id='instructions-drawer-button'
        data-testid='instructions-drawer-button'
        onClick={() => setIsDrawerOpen(true)}
        edge='start' color='inherit'
        aria-label='open instructions drawer.'>
        <KmxQuestionCircleStroked/>
      </IconButton>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        slotProps={{
          backdrop: {
            onClick: () => setIsDrawerOpen(false),
          },
          paper: {
            sx: {
              margin: 'xlarge large',
              width: '33%',
            },
          },
        }}
      >
        <AppBar position='static' color='default'>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={() => setIsDrawerOpen(false)}
                        data-testid='instructions-drawer-close-button-top' aria-label='close.'>
              <KmxArrowLeftFilled/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack spacing={3} sx={{p: 3}}>
          <Typography component='h2' variant='h5' color='secondary' data-testid='instructions-heading'>
            {instructionsConfig.heading}
          </Typography>
          {instructionsConfig.topics?.map((topic, index) => (
            <Accordion disabled={isDisabled(topic.name)} expanded={openTopic === topic.name} key={`${topic.name}-topic-${index}`}>
              <AccordionSummary
                onClick={() => {
                  if (openTopic === topic.name) {
                    setOpenTopic(undefined);
                  } else {
                    // If the topic is disabled, it should not be opened
                    if (!isDisabled(topic.name)) {
                      setOpenTopic(topic.name);
                    } else {
                      setOpenTopic(undefined);
                    }
                  }}}
                sx={{display: 'flex', alignItems: 'center'}}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography component='h3' variant='h6' color='secondary' data-testid='instructions-topic-heading'>
                  {topic.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component='span' variant='body2' color='secondary' data-testid='instructions-topic-body'>
                  {topic.listType === InstructionListType.Bulleted ? (
                    <ul>
                      {topic.instructions?.map((instruction, idx) => (
                        <li key={`${instructionsConfig.heading}-instruction-${idx}`}>{instruction}</li>
                      ))}
                    </ul>
                  ) : (
                    <ol>
                      {topic.instructions?.map((instruction, idx) => (
                        <li key={`${instructionsConfig.heading}-instruction-${idx}`}>{instruction}</li>
                      ))}
                    </ol>
                  )}
                </Typography>
                {topic.topicGoalImgSrc && <FinishedExampleModal imgSrc={topic.topicGoalImgSrc}/>}
                <FormControlLabel
                  sx={{ mt: 4 }}
                  control={
                    <Checkbox
                      checked={topicsCompleted && topicsCompleted[topic.name]}
                      onChange={e => {
                        // @ts-ignore
                        setTopicsCompleted((prevState: Record<string, boolean>) => ({...prevState, [topic.name]: e.target.checked}));
                        setOpenTopic(e.target.checked ? undefined : topic.name);
                      }}
                      sx={{ mr: 1 }}
                    />
                  }
                  label="Mark as completed"
                />
              </AccordionDetails>
            </Accordion>
          ))}
          <Typography component='span' variant='body2' color='secondary' data-testid='instructions-body'>
          </Typography>
          {instructionsConfig.goalImgSrc && <FinishedExampleModal imgSrc={instructionsConfig.goalImgSrc}/>}
          <Button
            color='cta'
            data-testid='payment-breakdown-close-button'
            onClick={() => setIsDrawerOpen(false)}
            type='button'
          >
            Close
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
