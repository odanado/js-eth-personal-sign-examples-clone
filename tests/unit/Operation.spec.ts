import { shallowMount } from '@vue/test-utils'
import Operation from '@/components/Operation.vue'

describe('Operation.vue', () => {
  let name: string
  let wrapper: ReturnType<typeof shallowMount>
  beforeEach(() => {
    name = 'Eth_Sign'
    wrapper = shallowMount(Operation, {
      propsData: { name }
    })
  })
  it('name', () => {
    expect(wrapper.find('.column').text()).toMatch(name)
  })
  it('button text', () => {
    const elem = wrapper.find('.column > input')
    expect(elem.attributes().type).toMatch('submit')
    expect(elem.attributes().value).toMatch(name.toLowerCase())
  })
})
