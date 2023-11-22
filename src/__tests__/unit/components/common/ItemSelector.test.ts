import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import ElementPlus from 'element-plus';
import ItemSelector from '@/components/common/ItemSelector.vue';

const TEAM_OPTIONS = [
  { _id: 'a123', name: 'Vue' },
  { _id: 'b456', name: 'PHP' },
  { _id: 'c789', name: 'JAVA' },
];

function setup(): void {
  render(ItemSelector, {
    global: {
      plugins: [ElementPlus, createTestingPinia()],
    },
    props: {
      modelValue: 'Vue',
      options: TEAM_OPTIONS,
    },
  });
}
describe('ItemSelector', () => {
  beforeAll(() => {
    setup();
  });
  it('Select Value', async () => {
    const select = screen.getByPlaceholderText('Select') as HTMLInputElement;
    expect(select.value).toBe('Vue');
    await fireEvent.update(select, 'JAVA');
    expect(select.value).toBe('JAVA');
  });
});
