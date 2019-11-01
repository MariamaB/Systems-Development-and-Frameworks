import { shallowMount, describe, it, expect } from '@vue/test-utils';
import ListItem from '../src/components/ListItem.vue';

describe('Test ListItem.vue', () => {
	it('render props.message when passed', () => {
		const message = 'new todo';
		const wrapper = shallowMount(ListItem, {
			propsData: { message }
		});
		expect(wrapper.text()).toMatch(message);
	});
});
