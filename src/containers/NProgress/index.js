import React from 'react';
import { NProgress } from '@tanem/react-nprogress';
import Container from './Container';
import Bar from './Bar';


const ProgressBar = ({ isLoading }) => {
  const content = isLoading ? (
    <NProgress
      animationDuration={300}
      incrementDuration={500}
      minimum={0.1}
      isAnimating
    >
      {
        ({ isFinished, progress, animationDuration }) => (
          <Container
            isFinished={isFinished}
            animationDuration={animationDuration}
          >
            <Bar progress={progress} animationDuration={animationDuration} />
          </Container>
        )
      }
    </NProgress>
  ) : '';

  return content;
}
 
export default ProgressBar;
