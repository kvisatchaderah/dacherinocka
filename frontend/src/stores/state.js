const views = [
  {
    component: 'gallery',
    name: 'галлерея',
  },
  {
    component: 'need_do',
    name: 'делать',
  },
  {
    component: 'not_need_do',
    name: 'не делать',
  },
]

const images_list = [
  {
    tag: 'мусор',
    name: 'у входа',
    images: ['./images/1.jpg'],
  },
  {
    tag: 'мусор',
    name: 'за гаражом',
    images: ['./images/2.jpg'],
  },
  {
    tag: 'мусор',
    name: 'сарай',
    images: ['./images/3.jpg'],
  },
  {
    tag: 'стекло',
    name: 'у дома',
    images: ['./images/4.jpg'],
  },
  {
    tag: 'доски',
    name: 'на месте старого распила',
    images: ['./images/5.jpg'],
  },
  {
    tag: 'место под мусор',
    name: 'за гаражом',
    images: ['./images/6.jpg'],
  },
  {
    tag: 'дрова',
    name: 'прицеп',
    images: ['./images/7.jpg'],
  },
  {
    tag: 'металл',
    name: 'у ворот',
    images: ['./images/8.jpg'],
  },
  {
    tag: 'провода',
    name: 'у дома справа',
    images: ['./images/9.jpg'],
  },
  {
    tag: 'металл',
    name: 'у дома слева',
    images: ['./images/10.jpg'],
  },
  {
    tag: 'доски',
    name: 'перед домом слева',
    images: ['./images/11.jpg'],
  },
]

export default {
  // state
  state: () => {
    return {
      // views
      active_view: views[0].component,
      views,

      active_tag: null,
      images_list,
    }
  },

  // actions
  actions: {
    open_view(view_component) {
      this.active_view = view_component
    },

    choise_tag(tag) {
      this.active_tag = tag
    },
  },
}
