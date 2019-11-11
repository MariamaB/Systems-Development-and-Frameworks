import { shallowMount } from '@vue/test-utils';
import List from '@/components/List.vue';
import ListItem from '@/components/ListItem.vue';
import { mount } from '@vue/test-utils';


describe('ListItem', () => {
	describe('TestAddToDo', () => {
		const wrapper = mount(List, {
			name: 'list',
			propsData: {}
		});
        
        it('renders input field', () => {
			expect(wrapper.html()).toContain('<input type="text" placeholder="New todo"');
        });

        it('Verify number of items initially rendered', () => {
            const numberOfItemsBeforeAdding = wrapper.findAll(ListItem).length;
            expect(numberOfItemsBeforeAdding).toEqual(3);
        });
        
        describe('fill out input field and emit Add', () => {
            wrapper.find("input").setValue("alice")
            it('$emit `Add` with newTodo', () => {
                const Add = wrapper.find('a#add'); 
                Add.trigger('click');
                expect(wrapper.html()).toContain('<span>alice</span>');
            
                const numberOfItemsAfterAdding = wrapper.findAll(ListItem).length;
               // console.log(numberOfItems);
                expect(numberOfItemsAfterAdding).toEqual(4);
                //console.log(wrapper.html());
                
            });
            
        });

        
    });
        
    });

