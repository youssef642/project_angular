import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description:
        "Experience crystal-clear audio with our premium wireless headphones. These headphones feature active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.",
      price: 299.99,
      imageUrl:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Electronics",
      rating: 4.8,
      stock: 15,
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0",
        "Built-in microphone",
        "Touch controls",
      ],
    },
    {
      id: 2,
      name: "Smartwatch Series 5",
      description:
        "Stay connected and track your fitness with our latest smartwatch. Features include heart rate monitoring, GPS, water resistance up to 50 meters, and a vibrant AMOLED display.",
      price: 249.99,
      imageUrl:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Electronics",
      rating: 4.6,
      stock: 20,
      features: [
        "Heart rate monitor",
        "GPS tracking",
        "Water resistant (50m)",
        "3-day battery life",
        "Customizable watch faces",
      ],
    },
    {
      id: 3,
      name: "Ultra-slim Laptop",
      description:
        "Powerful and portable, this ultra-slim laptop features a 14-inch 4K display, 16GB RAM, 512GB SSD, and the latest processor for smooth multitasking and productivity.",
      price: 1299.99,
      imageUrl:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Electronics",
      rating: 4.9,
      stock: 8,
      features: [
        "14-inch 4K display",
        "16GB RAM",
        "512GB SSD",
        "Latest gen processor",
        "All-day battery life",
      ],
    },
    {
      id: 4,
      name: "Designer Leather Backpack",
      description:
        "Combine style and functionality with this premium leather backpack. Multiple compartments provide ample storage for your laptop, tablet, and other essentials.",
      price: 129.99,
      imageUrl:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Fashion",
      rating: 4.5,
      stock: 25,
      features: [
        "Genuine leather",
        'Laptop compartment (fits up to 15")',
        "Water-resistant",
        "Multiple pockets",
        "Adjustable straps",
      ],
    },
    {
      id: 5,
      name: "Professional Camera Kit",
      description:
        "Capture stunning photos and videos with this professional camera kit. Includes the camera body, two lenses, a tripod, and a carrying case.",
      price: 1499.99,
      imageUrl:
        "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Electronics",
      rating: 4.7,
      stock: 5,
      features: [
        "24.2MP sensor",
        "4K video recording",
        "Includes 18-55mm and 70-300mm lenses",
        "Professional tripod",
        "Weather-sealed body",
      ],
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      description:
        "Stay hydrated with our vacuum-insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Durable, leak-proof, and eco-friendly.",
      price: 34.99,
      imageUrl:
        "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Home & Kitchen",
      rating: 4.4,
      stock: 50,
      features: [
        "Vacuum-insulated",
        "Keeps drinks cold for 24 hours",
        "Keeps drinks hot for 12 hours",
        "BPA-free",
        "Leak-proof lid",
      ],
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      description:
        "Charge your compatible devices wirelessly with this sleek charging pad. Supports fast charging and includes an LED indicator to show charging status.",
      price: 39.99,
      imageUrl:
        "https://images.pexels.com/photos/1294944/pexels-photo-1294944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Electronics",
      rating: 4.3,
      stock: 30,
      features: [
        "Qi wireless charging",
        "Supports fast charging",
        "LED charging indicator",
        "Slim design",
        "Non-slip surface",
      ],
    },
    {
      id: 8,
      name: "Smart Home Speaker",
      description:
        "Control your smart home and enjoy premium sound quality with this smart speaker. Features voice assistant compatibility and multi-room audio support.",
      price: 199.99,
      imageUrl:
        "https://images.pexels.com/photos/1072851/pexels-photo-1072851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Electronics",
      rating: 4.6,
      stock: 12,
      features: [
        "Voice assistant compatible",
        "Multi-room audio",
        "Premium sound quality",
        "Smart home controls",
        "Wi-Fi and Bluetooth connectivity",
      ],
    },
    {
      id: 9,
      name: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      price: 9.99,
      imageUrl:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      category: "Fashion",
      rating: 4.8,
      stock: 8,
      features: [
        "Conic Shape Fiber Brush",
        "Gentle on Eyes",
        "Long-Lasting",
        "False Lash Effect",
        "Waterproof Option",
      ],
    },
    {
      id: 10,
      name: "Dog Food",
      description:
        "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
      price: 10.99,
      imageUrl:
        "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp",
      category: "Groceries",
      rating: 4.1,
      stock: 30,
      features: [
        "Essential Nutrients",
        "AAFCO Statement",
        "Protein Sources",
        "Fat Sources",
        "Digestible Ingredients",
      ],
    },
    {
      id: 11,
      name: "Honey Jar",
      description:
        "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
      price: 6.99,
      imageUrl:
        "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
      category: "Groceries",
      rating: 3.6,
      stock: 10,
      features: [
        "Honey Dipper or Plunger",
        "Wide Mouth",
        "Heat Resistance",
        "Decorative Elements",
        "Environmental Impact",
      ],
    },
    {
      id: 19,
      name: "Gucci Bloom Eau de",
      description:
        "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper.",
      price: 79.99,
      imageUrl:
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
      category: "Makeup",
      rating: 4.9,
      stock: 7,
      features: [
        "top notes of Neroli",
        "Mandarin Orange, and Lemon",
        "Combined with middle notes of Tuberose",
        "Orange Blossom",
        "Base of Musk and Sandalwood",
      ],
    },
    {
      id: 9,
      name: 'Essence Mascara Lash Princess',
      description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      price: 9.99,
      imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      category: 'Fashion',
      rating: 4.8,
      stock: 8,
      features: [
        'Conic Shape Fiber Brush',
        'Gentle on Eyes',
        'Long-Lasting',
        'False Lash Effect',
        'Waterproof Option'
      ]
    },
    {
      id: 10,
      name: 'Dog Food',
      description: 'Specially formulated dog food designed to provide essential nutrients for your canine companion.',
      price: 10.99,
      imageUrl: 'https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp',
      category: 'Groceries',
      rating: 4.1,
      stock: 30,
      features: [
        'Essential Nutrients',
        'AAFCO Statement',
        'Protein Sources',
        'Fat Sources',
        'Digestible Ingredients'
      ]
    },
    {
      id: 11,
      name: 'Honey Jar',
      description: 'Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.',
      price: 6.99,
      imageUrl: 'https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp',
      category: 'Groceries',
      rating: 3.6,
      stock: 10,
      features: [
        'Honey Dipper or Plunger',
        'Wide Mouth',
        'Heat Resistance',
        'Decorative Elements',
        'Environmental Impact'
      ]
    },
    {
      id: 19,
      name: 'Gucci Bloom Eau de',
      description: 'Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper.',
      price: 79.99,
      imageUrl: 'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp',
      category: 'Makeup',
      rating: 4.9,
      stock: 7,
      features: [
        'top notes of Neroli',
        'Mandarin Orange, and Lemon',
        'Combined with middle notes of Tuberose',
        'Orange Blossom',
        'Base of Musk and Sandalwood'
      ]
    },
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    // Simulate API call
    return of(this.products).pipe(delay(800));
  }

  getProductById(id: number): Observable<Product | undefined> {
    // Simulate API call
    const product = this.products.find((p) => p.id === id);
    return of(product).pipe(delay(800));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    // Simulate API call
    const filteredProducts = this.products.filter(
      (p) => p.category === category
    );
    return of(filteredProducts).pipe(delay(800));
  }

  searchProducts(term: string): Observable<Product[]> {
    // Simulate API call
    const filteredProducts = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.description.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredProducts).pipe(delay(800));
  }
}