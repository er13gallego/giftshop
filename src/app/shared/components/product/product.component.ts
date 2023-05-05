import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: any[] = [
    {
      title: 'Striped Cotton Shirt',
      img: 'https://png.pngtree.com/element_our/20190604/ourmid/pngtree-black-and-white-strip-t-shirt-dress-illustration-image_1464945.jpg',
      sizes: [
        'S', 'M', 'L'
      ],
      colors: [
        'blue', 'purple', 'black', 'white'
      ],
      price: '19.99',
      stock: 13
    },
    {
      title: 'Plain Cotton Shirt',
      img: 'https://i.pinimg.com/originals/f8/9e/59/f89e59b20b7d85037283570c10bf98f0.png',
      sizes: [
        'S', 'M', 'L'
      ],
      colors: [
        'yellow', 'brown', 'black', 'white'
      ],
      price: '14.99',
      stock: 10
    },
    {
      title: 'Business Cotton Shirt',
      img: 'https://freepngimg.com/save/12846-dress-shirt-png-hd/480x480',
      sizes: [
        'S', 'M', 'L'
      ],
      colors: [
        'blue', 'white', 'black'
      ],
      price: '24.99',
      stock: 7
    },
    {
      title: 'Business Cotton Shirt',
      img: 'https://freepngimg.com/save/12846-dress-shirt-png-hd/480x480',
      sizes: [
        'S', 'M', 'L'
      ],
      colors: [
        'blue', 'white', 'black'
      ],
      price: '24.99',
      stock: 7
    },
    {
      title: 'Business Cotton Shirt',
      img: 'https://freepngimg.com/save/12846-dress-shirt-png-hd/480x480',
      sizes: [
        'S', 'M', 'L'
      ],
      colors: [
        'blue', 'white', 'black'
      ],
      price: '24.99',
      stock: 7
    },
    {
      title: 'Business Cotton Shirt',
      img: 'https://freepngimg.com/save/12846-dress-shirt-png-hd/480x480',
      sizes: [
        'S', 'M', 'L'
      ],
      colors: [
        'blue', 'white', 'black'
      ],
      price: '24.99',
      stock: 7
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
