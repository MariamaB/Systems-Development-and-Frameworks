/*import List from '@/components/List.vue';
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
        
      describe('fill out input field and emit Add via click on button and via enter', () => {
            wrapper.find("input").setValue("alice")
            it('$emit `Add` with newTodo via button', () => {
                wrapper.find('a#add').trigger('click'); 
              
                expect(wrapper.html()).toContain('<span>alice</span>');
                const numberOfItemsAfterAdding = wrapper.findAll(ListItem).length;
                //console.log(numberOfItemsAfterAdding);
                expect(numberOfItemsAfterAdding).toEqual(4);
            

            });

            it('$emit `Add` with newTodo via enter', () => {
                wrapper.find("input").setValue("bob");
                wrapper.find("input").trigger('keydown.enter');
                expect(wrapper.html()).toContain('<span>bob</span>');
            
                const numberOfItemsAfterAdding = wrapper.findAll(ListItem).length;
               //console.log(numberOfItemsAfterAdding);
               expect(numberOfItemsAfterAdding).toEqual(5);
            
                
            });
            
        }); 
        

        
    });
        
    });

*/