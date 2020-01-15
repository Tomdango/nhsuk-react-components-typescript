/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import ListPanel from '../src/components/list-panel/full';

const stories = storiesOf('List Panel', module);

stories.add('Standard', () => (
  <ListPanel>
    <ListPanel.Panel label="A" labelProps={{ id: 'A' }} backToTopButton>
      <ListPanel.LinkItem href="/conditions/abdominal-aortic-aneurysm/">AAA</ListPanel.LinkItem>
      <ListPanel.LinkItem href="/conditions/abdominal-aortic-aneurysm/">
        Abdominal aortic aneurysm
      </ListPanel.LinkItem>
      <ListPanel.LinkItem href="/conditions/abscess/">Abscess</ListPanel.LinkItem>
    </ListPanel.Panel>
  </ListPanel>
));
