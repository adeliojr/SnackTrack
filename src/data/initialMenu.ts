import { MenuItem, ExtraOption } from "../types/trailer";

export const COMMON_EXTRAS: ExtraOption[] = [
  {
    "id": "bacon",
    "name": "Bacon Crocante Extra",
    "price": 5
  },
  {
    "id": "queijo",
    "name": "Queijo Prato Duplo",
    "price": 4
  },
  {
    "id": "catupiry",
    "name": "Catupiry Original Extra",
    "price": 5
  },
  {
    "id": "cheddar",
    "name": "Cheddar Cremoso Extra",
    "price": 4.5
  },
  {
    "id": "cream_cheese",
    "name": "Cream Cheese Extra",
    "price": 5
  },
  {
    "id": "ovo",
    "name": "Ovo Frito na Chapa",
    "price": 2.5
  },
  {
    "id": "hamburguer",
    "name": "Hambúrguer Extra na Chapa",
    "price": 8
  },
  {
    "id": "hamburguer_costela",
    "name": "Hambúrguer de Costela Extra",
    "price": 12
  },
  {
    "id": "salsicha",
    "name": "Salsicha Extra",
    "price": 3
  },
  {
    "id": "maionese_verde",
    "name": "Pote Maionese da Casa",
    "price": 3
  },
  {
    "id": "batata_palha",
    "name": "Batata Palha Extra",
    "price": 2.5
  },
  {
    "id": "vinagrete",
    "name": "Vinagrete na Chapa",
    "price": 3
  }
];

export const INITIAL_MENU: MenuItem[] = [
  {
    "id": "cachorro-simples-fusca",
    "name": "Cachorro Simples - FUSCA",
    "kitchenName": "Cachorro Simples",
    "carModel": "FUSCA",
    "category": "dogs",
    "price": 15,
    "description": "Pão, 01 Salsicha, Batata Palha, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Batata Palha",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-quente-especial-kombi",
    "name": "Cachorro Quente Especial - KOMBI",
    "kitchenName": "Cachorro Quente Especial",
    "carModel": "KOMBI",
    "category": "dogs",
    "price": 23,
    "description": "Pão, 02 Salsichas, Queijo, Alface, Tomate, Cebola, Batata Palha, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Batata Palha",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-quente-com-bacon-passat",
    "name": "Cachorro Quente com Bacon - PASSAT",
    "kitchenName": "Cachorro Quente com Bacon",
    "carModel": "PASSAT",
    "category": "dogs",
    "price": 28,
    "description": "Pão, 02 Salsichas, Bacon, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-quente-c-calabresa-celta",
    "name": "Cachorro Quente c/ Calabresa - CELTA",
    "kitchenName": "Cachorro Quente c/ Calabresa",
    "carModel": "CELTA",
    "category": "dogs",
    "price": 29,
    "description": "Pão, 02 Salsichas, Calabresa, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Calabresa",
      "Salsicha",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "dog-burguer-vectra-gt",
    "name": "Dog Burguer  - VECTRA GT",
    "kitchenName": "Dog Burguer",
    "carModel": "VECTRA GT",
    "category": "dogs",
    "price": 30,
    "description": "Pão, 02 Salsichas, Carne de Hambúrguer Tradicional, Queijo, Batata Palha, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer Tradicional",
      "Salsicha",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Batata Palha",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-carupiry-tracker",
    "name": "Cachorro Carupiry - TRACKER",
    "kitchenName": "Cachorro Carupiry",
    "carModel": "TRACKER",
    "category": "dogs",
    "price": 30,
    "description": "Pão, 2 salsichas, catupiry, alface, tomate, cebola, maionese, ketchup e mostarda .",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Catupiry",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-catupiry-bacon-omega",
    "name": "Cachorro catupiry bacon- OMEGA",
    "kitchenName": "Cachorro catupiry bacon",
    "carModel": "OMEGA",
    "category": "dogs",
    "price": 33,
    "description": "Pão, 2 salsichas, catupiry,  bacon, alface, tomate, cebola, maionese, ketchup e mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Bacon",
      "Catupiry",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-cheddar-scort-xr3",
    "name": "Cachorro cheddar - SCORT XR3",
    "kitchenName": "Cachorro cheddar",
    "carModel": "SCORT XR3",
    "category": "dogs",
    "price": 30,
    "description": "Pão, 2 salsichas, cheddar, alface, tomate, cebola, maionese, ketchup e mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Cheddar",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-cheddar-bacon-byd",
    "name": "Cachorro cheddar bacon - BYD",
    "kitchenName": "Cachorro cheddar bacon",
    "carModel": "BYD",
    "category": "dogs",
    "price": 33,
    "description": "Pão, 2 salsichas, cheddar,  bacon, alface, tomate, cebola, maionese, ketchup e mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Bacon",
      "Cheddar",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-crean-cheese-sonata",
    "name": "Cachorro crean cheese - SONATA",
    "kitchenName": "Cachorro crean cheese",
    "carModel": "SONATA",
    "category": "dogs",
    "price": 30,
    "description": "Pão, 2 salsichas, crean cheese, alface, tomate, cebola, maionese, ketchup e mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "cachorro-crean-cheese-bacon-audi-a3",
    "name": "Cachorro crean cheese Bacon-AUDI A3",
    "kitchenName": "Cachorro crean cheese Bacon",
    "carModel": "AUDI A3",
    "category": "dogs",
    "price": 33,
    "description": "Pão, 2 salsichas, crean cheese,  Bacon, alface, tomate, cebola, maionese, ketchup e mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Salsicha",
      "Bacon",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hot Dog (Padrão)",
      "Pão Francês",
      "Pão de Hambúrguer (Bola)"
    ]
  },
  {
    "id": "hamb-rguer-up",
    "name": "Hambúrguer - UP",
    "kitchenName": "Hambúrguer",
    "carModel": "UP",
    "category": "lanches",
    "price": 21,
    "description": "Pão, Hambúrguer, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-burguer-chevette",
    "name": "X Burguer - CHEVETTE",
    "kitchenName": "X Burguer",
    "carModel": "CHEVETTE",
    "category": "lanches",
    "price": 22,
    "description": "Pão, Hambúrguer, Queijo, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Queijo",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-salada-gol-g1",
    "name": "X-Salada - GOL G1",
    "kitchenName": "X-Salada",
    "carModel": "GOL G1",
    "category": "lanches",
    "price": 25,
    "description": "Pão, Hambúrguer, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-bacon-golf",
    "name": "X - Bacon - GOLF",
    "kitchenName": "X - Bacon",
    "carModel": "GOLF",
    "category": "lanches",
    "price": 32,
    "description": "Pão, Hambúrguer, Bacon, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-bacon-egg-opala",
    "name": "X - Bacon Egg - OPALA",
    "kitchenName": "X - Bacon Egg",
    "carModel": "OPALA",
    "category": "lanches",
    "price": 35,
    "description": "Pão, Hambúrguer, Bacon, Ovos, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Bacon",
      "Ovo",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-egg-uno",
    "name": "X - Egg - UNO",
    "kitchenName": "X - Egg",
    "carModel": "UNO",
    "category": "lanches",
    "price": 28,
    "description": "Pão, Hambúrguer, Ovos, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Ovo",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "catupiry-stillo",
    "name": "Catupiry - STILLO",
    "kitchenName": "Catupiry",
    "carModel": "STILLO",
    "category": "lanches",
    "price": 29,
    "description": "Pão, Hambúrguer, Catupiry, Alface, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Catupiry",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "cheddar-diplomata",
    "name": "Cheddar - DIPLOMATA",
    "kitchenName": "Cheddar",
    "carModel": "DIPLOMATA",
    "category": "lanches",
    "price": 29,
    "description": "Pão, Hambúrguer, Cheddar, Alface, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Cheddar",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-calabresa-hb20",
    "name": "X - Calabresa - HB20",
    "kitchenName": "X - Calabresa",
    "carModel": "HB20",
    "category": "lanches",
    "price": 30,
    "description": "Pão, Hambúrguer, Calabresa, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Calabresa",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-calabresa-bacon-polo",
    "name": "X - Calabresa Bacon - POLO",
    "kitchenName": "X - Calabresa Bacon",
    "carModel": "POLO",
    "category": "lanches",
    "price": 35,
    "description": "Pão, Hambúrguer, Bacon, Calabresa, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Calabresa",
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "tr-s-queijos-cadillac",
    "name": "Três Queijos - CADILLAC",
    "kitchenName": "Três Queijos",
    "carModel": "CADILLAC",
    "category": "lanches",
    "price": 43,
    "description": "Pão, Hambúrguer, Queijo, Catupiry , Cream Cheese, Alface, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Queijo",
      "Catupiry",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "vulc-o-marea",
    "name": "Vulcão -  MAREA 🤠",
    "kitchenName": "Vulcão",
    "carModel": "MAREA 🤠",
    "category": "lanches",
    "price": 42,
    "description": "Pão Mônaco ou Brioche, Hambúrguer de Costela, Cheddar, Catupiry, Alface, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer de Costela",
      "Cheddar",
      "Catupiry",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão Brioche (Padrão)",
      "Pão Mônaco",
      "Pão de Hambúrguer (Bola)",
      "Pão Francês"
    ]
  },
  {
    "id": "double-salada-corvette",
    "name": "Double Salada - CORVETTE",
    "kitchenName": "Double Salada",
    "carModel": "CORVETTE",
    "category": "lanches",
    "price": 45,
    "description": "Pão Mônaco ou Brioche, 2 Hambúrgueres de Costela, 3 Fatias de Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão Brioche (Padrão)",
      "Pão Mônaco",
      "Pão de Hambúrguer (Bola)",
      "Pão Francês"
    ]
  },
  {
    "id": "double-bacon-hellcat",
    "name": "Double Bacon - HELLCAT",
    "kitchenName": "Double Bacon",
    "carModel": "HELLCAT",
    "category": "lanches",
    "price": 50,
    "description": "Pão Mônaco ou Brioche, 2 Hambúrgueres de Costela, Bacon, 3 Fatias de Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão Brioche (Padrão)",
      "Pão Mônaco",
      "Pão de Hambúrguer (Bola)",
      "Pão Francês"
    ]
  },
  {
    "id": "total-do-brasil-lamborguini",
    "name": "Total do Brasil - LAMBORGUINI",
    "kitchenName": "Total do Brasil",
    "carModel": "LAMBORGUINI",
    "category": "lanches",
    "price": 49,
    "description": "Pão, 02 Hambúrgueres, 02 Salsichas, Ovos, Bacon, Catupiry, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Salsicha",
      "Bacon",
      "Ovo",
      "Queijo",
      "Catupiry",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "total-do-brasil-cheddar-land-rover",
    "name": "Total do Brasil Cheddar - LAND ROVER",
    "kitchenName": "Total do Brasil Cheddar",
    "carModel": "LAND ROVER",
    "category": "lanches",
    "price": 49,
    "description": "Pão, 02 Hambúrgueres, 02 Salsichas, Ovos, Cheddar, bacon, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Salsicha",
      "Bacon",
      "Ovo",
      "Queijo",
      "Cheddar",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "total-do-brasil-crean-cheese-fiat-to",
    "name": "Total do Brasil Crean Cheese-FIAT TO",
    "kitchenName": "Total do Brasil Crean Cheese",
    "carModel": "FIAT TO",
    "category": "lanches",
    "price": 49,
    "description": "Pão, 02 Hambúrgueres, 02 Salsichas, Ovos, Crean Cheese, bacon, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Salsicha",
      "Bacon",
      "Ovo",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "mega-total-do-brasil-ferrari-l-fe",
    "name": "MEGA Total do Brasil - FERRARI LÁ FE",
    "kitchenName": "MEGA Total do Brasil",
    "carModel": "FERRARI LÁ FE",
    "category": "lanches",
    "price": 78,
    "description": "Pão, 04 Hambúrgueres, 06 Salsichas, 2 Ovos, bacon, 4 fatias de Queijo, Catupiry, batata palha,  Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Salsicha",
      "Bacon",
      "Ovo",
      "Queijo",
      "Catupiry",
      "Alface",
      "Tomate",
      "Cebola",
      "Batata Palha",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "insano-mustang",
    "name": "Insano - MUSTANG",
    "kitchenName": "Insano",
    "carModel": "MUSTANG",
    "category": "lanches",
    "price": 90,
    "description": "Pão Mônaco ou Brioche, 4 Hambúrgueres de Costela, Queijo, Catupiry, Bacon, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda\n(UM LANCHE PARA QUEM REALMENTE ESTA COM FOME)\n(NÃO FAZEMOS ALTERAÇÕES NESTE LANCHE, COMO PÃES BOLA OU FRANCÊS )",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Bacon",
      "Queijo",
      "Catupiry",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão Brioche (Padrão)",
      "Pão Mônaco",
      "Pão de Hambúrguer (Bola)",
      "Pão Francês"
    ]
  },
  {
    "id": "mega-bacon-ferrari",
    "name": "MEGA Bacon - FERRARI",
    "kitchenName": "MEGA Bacon",
    "carModel": "FERRARI",
    "category": "lanches",
    "price": 64,
    "description": "Pão Mônaco ou Brioche, 2 Hambúrgueres de Costela, MEGA quantidade de Bacon, \nFatias de Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda\n\nATENÇÃO \nCada pão tem seu jeito de preparo",
    "isAvailable": true,
    "defaultIngredients": [
      "Hambúrguer",
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão Brioche (Padrão)",
      "Pão Mônaco",
      "Pão de Hambúrguer (Bola)",
      "Pão Francês"
    ]
  },
  {
    "id": "x-frango-porche",
    "name": "X - Frango - PORCHE",
    "kitchenName": "X - Frango",
    "carModel": "PORCHE",
    "category": "lanches",
    "price": 31,
    "description": "Pão, Peito de Frango, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-frango-bacon-maclaren",
    "name": "X - Frango Bacon - MACLAREN",
    "kitchenName": "X - Frango Bacon",
    "carModel": "MACLAREN",
    "category": "lanches",
    "price": 38,
    "description": "Pão, Peito de Frango, Bacon, Queijo, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "x-frango-c-carupiry-mercedes",
    "name": "X - Frango C/ Carupiry - MERCEDES",
    "kitchenName": "X - Frango C/ Carupiry",
    "carModel": "MERCEDES",
    "category": "lanches",
    "price": 39,
    "description": "Pão, Peito de Frango, Catupiry, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Catupiry",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "empanado-de-frango-punto",
    "name": "Empanado de Frango - PUNTO",
    "kitchenName": "Empanado de Frango",
    "carModel": "PUNTO",
    "category": "lanches",
    "price": 36,
    "description": "Pão, Empanado de Frango, Queijo, Alface, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Queijo",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "empanado-de-frango-bacon-astra",
    "name": "Empanado de Frango Bacon - ASTRA",
    "kitchenName": "Empanado de Frango Bacon",
    "carModel": "ASTRA",
    "category": "lanches",
    "price": 38,
    "description": "Pão, Empanado de Frango, Bacon,  Queijo, Alface, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Bacon",
      "Queijo",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "bauru-impala-1967",
    "name": "Bauru - IMPALA 1967",
    "kitchenName": "Bauru",
    "carModel": "IMPALA 1967",
    "category": "lanches",
    "price": 41,
    "description": "Pão, Contra Filé, Queijo Derretido no Maçarico, Tomate, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Contra Filé",
      "Queijo",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "americano-camaro",
    "name": "Americano - CAMARO",
    "kitchenName": "Americano",
    "carModel": "CAMARO",
    "category": "lanches",
    "price": 45,
    "description": "Pão, Contra Filé, Queijo Derretido no Maçarico, Ovos, Alface, Tomate, Cebola, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Contra Filé",
      "Ovo",
      "Queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "bariri-bugatti",
    "name": "Bariri - BUGATTI",
    "kitchenName": "Bariri",
    "carModel": "BUGATTI",
    "category": "lanches",
    "price": 42,
    "description": "Pão Brioche, Contra Filé, Queijo, Tomate e Cebola Refogada na Chapa, Ketchup, Maionese e Mostarda",
    "isAvailable": true,
    "defaultIngredients": [
      "Contra Filé",
      "Queijo",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão Brioche (Padrão)",
      "Pão Mônaco",
      "Pão de Hambúrguer (Bola)",
      "Pão Francês"
    ]
  },
  {
    "id": "filezinho-veloster",
    "name": "Filezinho - VELOSTER",
    "kitchenName": "Filezinho",
    "carModel": "VELOSTER",
    "category": "lanches",
    "price": 42,
    "description": "Pao, Contra file, Queijo, Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Queijo",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "filezinho-c-bacon-onix",
    "name": "Filezinho c/ Bacon - ONIX",
    "kitchenName": "Filezinho c/ Bacon",
    "carModel": "ONIX",
    "category": "lanches",
    "price": 44,
    "description": "Pao, Contra file, Queijo, Bacon Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Bacon",
      "Queijo",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "filezinho-c-catupiry-saveiro",
    "name": "Filezinho c/ Catupiry - SAVEIRO",
    "kitchenName": "Filezinho c/ Catupiry",
    "carModel": "SAVEIRO",
    "category": "lanches",
    "price": 43,
    "description": "Pao, Contra file em pedaços, Catupiry, Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Catupiry",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "filezinho-c-cheddar-montana",
    "name": "Filezinho c/ Cheddar - MONTANA",
    "kitchenName": "Filezinho c/ Cheddar",
    "carModel": "MONTANA",
    "category": "lanches",
    "price": 43,
    "description": "Pao, Contra file em pedaços, Cheddar, Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Cheddar",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "churrasco-creta",
    "name": "Churrasco - CRETA",
    "kitchenName": "Churrasco",
    "carModel": "CRETA",
    "category": "lanches",
    "price": 42,
    "description": "Pao, Contra file em pedaços FEITO NA CHURRASQUEIRA, Queijo, Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Queijo",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "churrasco-bacon-corolla-cross",
    "name": "Churrasco Bacon - COROLLA CROSS",
    "kitchenName": "Churrasco Bacon",
    "carModel": "COROLLA CROSS",
    "category": "lanches",
    "price": 44,
    "description": "Pao, Contra file em pedaços FEITO NA CHURRASQUEIRA, Queijo, Bacon, Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Bacon",
      "Queijo",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "churrasco-catupiry-captiva",
    "name": "Churrasco Catupiry - CAPTIVA",
    "kitchenName": "Churrasco Catupiry",
    "carModel": "CAPTIVA",
    "category": "lanches",
    "price": 43,
    "description": "Pao, Contra file em pedaços FEITO NA CHURRASQUEIRA, Catupiry, Vinagrete na Chapa, Katchup, Maionese e Mostarda,",
    "isAvailable": true,
    "defaultIngredients": [
      "Catupiry",
      "Maionese",
      "Mostarda",
      "Vinagrete"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": [
      "Pão de Hambúrguer (Bola) [Padrão]",
      "Pão Francês",
      "Pão Brioche",
      "Pão Mônaco"
    ]
  },
  {
    "id": "por-o-de-calabresa-bmw",
    "name": "Porção de calabresa (BMW)",
    "kitchenName": "Porção de calabresa",
    "carModel": "BMW",
    "category": "porcoes",
    "price": 48,
    "description": "Deliciosa calabresa acebolada acompanhada por pão com queijo derretido",
    "isAvailable": true,
    "defaultIngredients": [
      "Calabresa",
      "Queijo",
      "Cebola"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "por-o-mista-harley-d",
    "name": "Porção Mista - (Harley D)",
    "kitchenName": "Porção Mista",
    "carModel": "Harley D",
    "category": "porcoes",
    "price": 75,
    "description": "Mista de frango, calabresa e contra filé noix acebolado acompanhado com pão com queijo derretido.",
    "isAvailable": true,
    "defaultIngredients": [
      "Contra Filé",
      "Calabresa",
      "Queijo",
      "Cebola"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "por-o-de-frango-hornet",
    "name": "Porção de Frango (Hornet)",
    "kitchenName": "Porção de Frango",
    "carModel": "Hornet",
    "category": "porcoes",
    "price": 50,
    "description": "Deliciosa porção de Frango acebolado acompanhado com pão c/ queijo recebido",
    "isAvailable": true,
    "defaultIngredients": [
      "Queijo",
      "Cebola"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "contra-file-moto-ducati",
    "name": "CONTRA FILE (MOTO DUCATI)",
    "kitchenName": "CONTRA FILE",
    "carModel": "MOTO DUCATI",
    "category": "porcoes",
    "price": 49,
    "description": "Delicioso contra filé noix com rodelas de cebola acompanhado de pão com queijo derretido no maçarico",
    "isAvailable": true,
    "defaultIngredients": [
      "Contra Filé",
      "Queijo",
      "Cebola"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "batata-frita-kawasaki-ninja-400",
    "name": "BATATA FRITA - KAWASAKI NINJA 400",
    "kitchenName": "BATATA FRITA",
    "carModel": "KAWASAKI NINJA 400",
    "category": "porcoes",
    "price": 10,
    "description": "BATATA FRITA TRADICIONAL",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "batata-frita-especial-k-ninja-250",
    "name": "BATATA FRITA ESPECIAL - K NINJA 250",
    "kitchenName": "BATATA FRITA ESPECIAL",
    "carModel": "K NINJA 250",
    "category": "porcoes",
    "price": 22,
    "description": "BATATA FRITA ESPECIAL",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "batata-frita-c-adicional",
    "name": "BATATA FRITA c/ ADICIONAL",
    "kitchenName": "BATATA FRITA c/ ADICIONAL",
    "category": "porcoes",
    "price": 15,
    "description": "BATATA FRITA COM O ADICIONAL QUE VC QUISER",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "bolinha-de-provolone-turbina",
    "name": "BOLINHA DE PROVOLONE (Turbina)",
    "kitchenName": "BOLINHA DE PROVOLONE",
    "carModel": "Turbina",
    "category": "porcoes",
    "price": 30,
    "description": "8 un de bolinho de pó ovo Line crocante \nAcompanha molho de alho especial",
    "isAvailable": true,
    "defaultIngredients": [
      "Ovo"
    ],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "til-pia-bombom-nitro-ox",
    "name": "TILÁPIA BOMBOM - (nitro ox)",
    "kitchenName": "TILÁPIA BOMBOM",
    "carModel": "nitro ox",
    "category": "porcoes",
    "price": 32,
    "description": "8 tilápias bombom empanadas e sequinhas \nAcompanha molho verde especial com limão e pão",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "bolinho-de-cupim-virabrequim",
    "name": "BOLINHO DE CUPIM - (Virabrequim)",
    "kitchenName": "BOLINHO DE CUPIM",
    "carModel": "Virabrequim",
    "category": "porcoes",
    "price": 55,
    "description": "6 bolinhos de cupim deliciosamente incomparáveis \n\nAcompanha molho barbecue defumado",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [
      {
        "id": "bacon",
        "name": "Bacon Crocante Extra",
        "price": 5
      },
      {
        "id": "queijo",
        "name": "Queijo Prato Duplo",
        "price": 4
      },
      {
        "id": "catupiry",
        "name": "Catupiry Original Extra",
        "price": 5
      },
      {
        "id": "cheddar",
        "name": "Cheddar Cremoso Extra",
        "price": 4.5
      },
      {
        "id": "cream_cheese",
        "name": "Cream Cheese Extra",
        "price": 5
      },
      {
        "id": "ovo",
        "name": "Ovo Frito na Chapa",
        "price": 2.5
      },
      {
        "id": "hamburguer",
        "name": "Hambúrguer Extra na Chapa",
        "price": 8
      },
      {
        "id": "hamburguer_costela",
        "name": "Hambúrguer de Costela Extra",
        "price": 12
      },
      {
        "id": "salsicha",
        "name": "Salsicha Extra",
        "price": 3
      },
      {
        "id": "maionese_verde",
        "name": "Pote Maionese da Casa",
        "price": 3
      },
      {
        "id": "batata_palha",
        "name": "Batata Palha Extra",
        "price": 2.5
      },
      {
        "id": "vinagrete",
        "name": "Vinagrete na Chapa",
        "price": 3
      }
    ],
    "allowedBreads": []
  },
  {
    "id": "sucos-de-caju",
    "name": "Sucos de CAJU",
    "kitchenName": "Sucos de CAJU",
    "category": "sucos",
    "price": 8.5,
    "description": "Com água ou leite",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "sucos-de-abacaxi-c-hortel",
    "name": "Sucos de Abacaxi c/ Hortelã",
    "kitchenName": "Sucos de Abacaxi c/ Hortelã",
    "category": "sucos",
    "price": 8.5,
    "description": "Com água ou leite",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "sucos-de-abacaxi",
    "name": "Sucos de Abacaxi",
    "kitchenName": "Sucos de Abacaxi",
    "category": "sucos",
    "price": 8.5,
    "description": "Com água ou leite",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "sucos-de-morango",
    "name": "Sucos de Morango",
    "kitchenName": "Sucos de Morango",
    "category": "sucos",
    "price": 10,
    "description": "Com água ou leite",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "sucos-de-maracuj",
    "name": "Sucos de Maracujá",
    "kitchenName": "Sucos de Maracujá",
    "category": "sucos",
    "price": 13,
    "description": "Com água ou leite",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "coca-cola-vidro-1lt",
    "name": "Coca Cola (VIDRO) 1Lt",
    "kitchenName": "Coca Cola (VIDRO) 1Lt",
    "category": "bebidas",
    "price": 12,
    "description": "",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "coca-cola-lata-350ml",
    "name": "Coca Cola Lata 350ml",
    "kitchenName": "Coca Cola Lata 350ml",
    "category": "bebidas",
    "price": 7,
    "description": "",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "fanta-laranja-lata-350ml",
    "name": "Fanta Laranja Lata 350ml",
    "kitchenName": "Fanta Laranja Lata 350ml",
    "category": "bebidas",
    "price": 7,
    "description": "",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "sprite-lata-350ml",
    "name": "Sprite Lata 350ml",
    "kitchenName": "Sprite Lata 350ml",
    "category": "bebidas",
    "price": 7,
    "description": "",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "guaran-ant-rtica-lata-350ml",
    "name": "Guaraná Antártica Lata 350ml",
    "kitchenName": "Guaraná Antártica Lata 350ml",
    "category": "bebidas",
    "price": 7,
    "description": "",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "coca-cola-2lts",
    "name": "Coca Cola 2lts",
    "kitchenName": "Coca Cola 2lts",
    "category": "bebidas",
    "price": 15,
    "description": "",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "coca-cola-zero-lata-350ml",
    "name": "Coca Cola Zero Lata 350ml",
    "kitchenName": "Coca Cola Zero Lata 350ml",
    "category": "bebidas",
    "price": 7,
    "description": "Para vc que não dispensa algo menos calórico",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "budwaiser-long-neck",
    "name": "Budwaiser long neck",
    "kitchenName": "Budwaiser long neck",
    "category": "cervejas",
    "price": 11,
    "description": "Cerveja estupidamente gelada",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "heineken-long-neck",
    "name": "Heineken long neck",
    "kitchenName": "Heineken long neck",
    "category": "cervejas",
    "price": 12,
    "description": "Uma das cervejas mais top do mercado brasileiro, geladíssima para vocês.",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  },
  {
    "id": "cerveja-ant-rctica-boa-600ml",
    "name": "Cerveja Antárctica boa 600ml",
    "kitchenName": "Cerveja Antárctica boa 600ml",
    "category": "cervejas",
    "price": 13,
    "description": "PENSA NUMA CERVEJA GELADA",
    "isAvailable": true,
    "defaultIngredients": [],
    "allowedExtras": [],
    "allowedBreads": []
  }
];
