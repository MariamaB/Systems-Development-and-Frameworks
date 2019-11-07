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
      it("doesn't show input field", () => {   
      expect(wrapper.vm.onEdit).toBeFalsy()
      });
      it("has the expected html structure", () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      
      describe('Click on `Edit` button', () => {
        it("shows input field", () => {
          const aArray = wrapper.findAll('a')
          const Edit = aArray.at(0)
          Edit.trigger('click')
          expect(wrapper.vm.onEdit).toBeTruthy()

        });

        describe('edit text and submit', () => {
          it("$emit `Save` with edited todo", () => {
          wrapper.setProps({id:1,message: 'Moi'}) //since OnEdit is true we can overwrite item          
          const aArray = wrapper.findAll('a')
          const Save = aArray.at(1)  // because of  v-if condition Save button is now second element 
          Save.trigger('click')
          expect(wrapper.vm.onEdit).toBeFalsy()
          expect(wrapper.vm.message).toBe('Moi')
        });
        it("has the expected html structure", () => {
          expect(wrapper.element).toMatchSnapshot();  // 2 Snapshot are produced to examine the state before and after edit, to see state while editting "Save click" should be commented and except onEdit must be Truthy
        });
        });
        
        
        //Note in Snapshot just 2 icons can be seen according to the statement v-if="!this.onEdit"
      });
  });
});