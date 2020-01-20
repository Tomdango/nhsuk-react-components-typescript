import { configure } from '@storybook/react';
import '../src/styles/_all.scss';

configure(require.context('../stories', true, /\.stories\.tsx$/), module);
