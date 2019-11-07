import { shallowMount } from '@vue/test-utils';
import ListItem from '@/components/ListItem.vue';

describe('ListItem.vue', () => {
	it('render props.message when passed', () => {
		const message = 'new todo';
		const wrapper = shallowMount(ListItem, {
			propsData: { message }
		});
		expect(wrapper.text()).toMatch(message);
	});
});
