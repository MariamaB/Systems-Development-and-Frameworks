/* eslint-disable no-undef */
import { mount} from '@vue/test-utils'
import ListItem from '../src/components/ListItem'
//import List from './List'


describe('ListItem', () => {
    describe('given a `todo`', () => {
        const wrapper = mount(ListItem, {
         
          name: "item",
          propsData: {
              id : 1,
            message: 'Foo'
          }
        });
    

    
    it("renders `item.message`", () => {   
    expect(wrapper.vm.message).toBe('Foo')
    });
   

      it("has the expected html structure", () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });
    });