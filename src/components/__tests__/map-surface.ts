import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import MapSurface from '../map-surface.vue';

describe('MapSurface', () => {
  it('renders properly', () => {
    const wrapper = mount(MapSurface, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
