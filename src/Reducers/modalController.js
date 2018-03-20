const initialState = {
  type: "cart",
  plate: {
    id: 69195,
    title: "Овощной салат по-грузински с зеленью **",
    favorite: false,
    tagGroup: 0,
    image:
      "//dostavka1.com/upload/iblock/c33/c334caac3d2aad248154cf495d0f55cf.jpg",
    price: 155,
    description:
      "Легкий салат: свежие огурцы, томаты, острый зеленый стручковый перец, красный лук с мелко рубленной петрушкой, кинзой и базиликом. <br/>(230 гр.)",
    shortTitle: "Овощной салат по-грузински с зеленью **",
    weight: "",
    restaurant: 0
  },
  opened: false
};

export default function modalController(state = initialState, action) {
  if (action.type == "OPEN_MODAL") {
    return {
      type: "cart",
      plate: action.payload,
      opened: true
    };
  }
  if (action.type == "CLOSE_MODAL" || action.type == "HIDE_MODAL") {
    return {
      ...state,
      opened: false
    };
  }
  if (action.type == "CHANGE_CONTENT") {
    return {
      type: "cart",
      plate: action.payload,
      opened: true
    };
  }
  return state;
}
