import { Category, Product, Coupon, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'notebooks',
    name: { en: 'Notebooks & Registers', hi: 'नोटबुक और रजिस्टर', gu: 'નોટબુક અને રજિસ્ટર' },
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    itemCount: 42,
  },
  {
    id: 'pens',
    name: { en: 'Pens & Markers', hi: 'पेन और मार्कर', gu: 'પેન અને માર્કર' },
    iconName: 'PenTool',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600',
    itemCount: 38,
  },
  {
    id: 'pencils',
    name: { en: 'Pencils & Sharpeners', hi: 'पेंसिल और शार्पनर', gu: 'પેન્સિલ અને સંચો' },
    iconName: 'Pencil',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    itemCount: 25,
  },
  {
    id: 'erasers',
    name: { en: 'Erasers & Correction', hi: 'इरेज़र और सुधार', gu: 'રબર અને કરેક્શન' },
    iconName: 'Eraser',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600',
    itemCount: 18,
  },
  {
    id: 'geometry-box',
    name: { en: 'Geometry Box & Tools', hi: 'ज्यामिति बॉक्स और उपकरण', gu: 'જીઓમેટ્રી બોક્સ' },
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    itemCount: 15,
  },
  {
    id: 'school-bags',
    name: { en: 'School Bags & Backpacks', hi: 'स्कूल बैग और बैकपैक', gu: 'સ્કૂલ બેગ્સ' },
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    itemCount: 28,
  },
  {
    id: 'water-bottles',
    name: { en: 'Water Bottles', hi: 'पानी की बोतलें', gu: 'પાણીની બોટલ' },
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    itemCount: 20,
  },
  {
    id: 'lunch-boxes',
    name: { en: 'Lunch Boxes', hi: 'लंच बॉक्स', gu: 'લંચ બોક્સ' },
    iconName: 'Box',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    itemCount: 16,
  },
  {
    id: 'art-craft',
    name: { en: 'Art & Craft Supplies', hi: 'कला और शिल्प', gu: 'આર્ટ અને ક્રાફ્ટ' },
    iconName: 'Palette',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    itemCount: 50,
  },
  {
    id: 'drawing-books',
    name: { en: 'Drawing Books & Pads', hi: 'ड्राइंग बुक्स', gu: 'ડ્રોઇંગ બુક્સ' },
    iconName: 'Image',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600',
    itemCount: 22,
  },
  {
    id: 'files-folders',
    name: { en: 'Files & Folders', hi: 'फाइलें और फोल्डर', gu: 'ફાઇલો અને ફોલ્ડર્સ' },
    iconName: 'Folder',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
    itemCount: 30,
  },
  {
    id: 'office-supplies',
    name: { en: 'Office Stationery', hi: 'कार्यालय सामग्री', gu: 'ઓફિસ સ્ટેશનરી' },
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=600',
    itemCount: 45,
  },
  {
    id: 'books',
    name: { en: 'Books & Novels', hi: 'किताबें और उपन्यास', gu: 'પુસ્તકો અને નોવેલ' },
    iconName: 'Book',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    itemCount: 65,
  },
  {
    id: 'calculators',
    name: { en: 'Scientific Calculators', hi: 'कैलकुलेटर', gu: 'કેલ્ક્યુલેટર' },
    iconName: 'Calculator',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=600',
    itemCount: 12,
  },
  {
    id: 'printer-paper',
    name: { en: 'A4 & Printer Paper', hi: 'प्रिंटर पेपर और A4 रिम', gu: 'પ્રિન્ટર પેપર (A4)' },
    iconName: 'FileText',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
    itemCount: 14,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Classmate Pulse A4 Spiral Notebook - 300 Pages Single Line',
    sku: 'CLM-PLS-A4-300',
    barcode: '8901030582012',
    productCode: 'BDB-NOTE-001',
    brand: 'Classmate',
    category: 'notebooks',
    description: 'High-quality bright white smooth paper engineered for effortless writing with zero ink bleed. Durable poly cover with metal twin wire binding. Ideal for high school and college students.',
    specifications: {
      'Paper Size': 'A4 (21 x 29.7 cm)',
      'Page Count': '300 Pages',
      'Rulings': 'Single Line',
      'Paper GSM': '70 GSM',
      'Binding': 'Spiral Wiro'
    },
    price: 240,
    discountPrice: 195,
    discountPercent: 19,
    gstRate: 12,
    stock: 85,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['notebook', 'classmate', 'spiral', 'a4', 'bestseller'],
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aarav Sharma',
        rating: 5,
        date: '2026-07-28',
        comment: 'Excellent notebook quality! Ink does not leak to the other side even with fountain pens. Fast delivery by BaladDev Stall.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        userName: 'Priya Patel',
        rating: 5,
        date: '2026-07-20',
        comment: 'Smooth paper texture and strong spiral binding. Will definitely order again.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Camel Acrylic Color Box Set - 12 Shades (20ml Tubes)',
    sku: 'CML-ACR-12S',
    barcode: '8901415012304',
    productCode: 'BDB-ART-002',
    brand: 'Camlin',
    category: 'art-craft',
    description: 'Rich vivid shades formulated for canvas, paper, wood, and earthenware. Fast-drying, waterproof finish with high pigment density.',
    specifications: {
      'Number of Shades': '12 Tubes',
      'Tube Volume': '20ml each',
      'Finish': 'Glossy Waterproof',
      'Non-Toxic': 'Yes'
    },
    price: 450,
    discountPrice: 380,
    discountPercent: 16,
    gstRate: 18,
    stock: 40,
    rating: 4.7,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['paint', 'camlin', 'art', 'acrylic', 'colors'],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-3',
    name: 'Faber-Castell Mathematical Geometry Box Set',
    sku: 'FBC-GEO-STEEL',
    barcode: '8901180210041',
    productCode: 'BDB-GEO-003',
    brand: 'Faber-Castell',
    category: 'geometry-box',
    description: 'Rust-free high-precision compass with safety pin feature. Includes transparent ruler, set squares, protractor, mechanical pencil, and eraser in a sturdy tin case.',
    specifications: {
      'Material': 'Stainless Steel & Tough Polycarbonate',
      'Case Type': 'Metallic Tin',
      'Includes': 'Compass, Divider, 15cm Ruler, 45° Set Square, 60° Set Square, Protractor, Pencil, Eraser',
      'Safety Mechanism': 'Concealed Pin Safety'
    },
    price: 180,
    discountPrice: 145,
    discountPercent: 19,
    gstRate: 18,
    stock: 120,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['geometry', 'faber castell', 'school', 'math'],
    isBestSeller: true
  },
  {
    id: 'prod-4',
    name: 'Casio FX-991EX ClassWiz Non-Programmable Scientific Calculator',
    sku: 'CAS-FX991EX',
    barcode: '4971850093695',
    productCode: 'BDB-CALC-004',
    brand: 'Casio',
    category: 'calculators',
    description: 'High-resolution Natural Textbook Display scientific calculator with 552 functions. Solar powered with battery backup. Perfect for engineering, science, and higher mathematics students.',
    specifications: {
      'Functions': '552 Scientific Functions',
      'Display': 'High Resolution LC Display',
      'Power Source': 'Solar + LR44 Battery',
      'Warranty': '3 Years Casio India Warranty'
    },
    price: 1595,
    discountPrice: 1399,
    discountPercent: 12,
    gstRate: 18,
    stock: 25,
    rating: 4.9,
    reviewCount: 340,
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['calculator', 'casio', 'scientific', 'engineering'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-5',
    name: 'Cello Butterflow Blue Ball Pen Pack of 10',
    sku: 'CEL-BTF-10BL',
    barcode: '8901725049921',
    productCode: 'BDB-PEN-005',
    brand: 'Cello',
    category: 'pens',
    description: 'Lubriflow ink system for feather-light ultra-smooth writing experience. Rubberized soft grip prevents hand fatigue during long exam hours.',
    specifications: {
      'Tip Size': '0.7mm Fine Point',
      'Ink Color': 'Classic Blue',
      'Pack Quantity': '10 Pens',
      'Refillable': 'Yes'
    },
    price: 100,
    discountPrice: 85,
    discountPercent: 15,
    gstRate: 12,
    stock: 200,
    rating: 4.6,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['pen', 'cello', 'butterflow', 'stationery', 'exam'],
    isBestSeller: true
  },
  {
    id: 'prod-6',
    name: 'Wildcraft Ergonomic School Backpack 35L - Navy Blue',
    sku: 'WLD-BAG-35L-NAV',
    barcode: '8903332014492',
    productCode: 'BDB-BAG-006',
    brand: 'Wildcraft',
    category: 'school-bags',
    description: 'Triple-compartment heavy duty water-resistant backpack with padded back panel, bottle holders, and laptop sleeve up to 15.6 inch. Ergonomic shoulder straps.',
    specifications: {
      'Capacity': '35 Liters',
      'Compartments': '3 Main + 1 Front Quick Pocket',
      'Material': '100% Water Resistant Polyester',
      'Warranty': '5 Years International Warranty'
    },
    price: 2199,
    discountPrice: 1699,
    discountPercent: 23,
    gstRate: 18,
    stock: 18,
    rating: 4.8,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['bag', 'wildcraft', 'backpack', 'school'],
    isFeatured: true
  },
  {
    id: 'prod-7',
    name: 'JK Copier A4 Paper Rim 75 GSM - 500 Sheets',
    sku: 'JKC-A4-75-500',
    barcode: '8902561001011',
    productCode: 'BDB-PPR-007',
    brand: 'JK Paper',
    category: 'printer-paper',
    description: 'Premium jam-free multipurpose laser and inkjet copier paper. ColorLok technology for faster drying and brighter colors.',
    specifications: {
      'Sheet Size': 'A4 (210mm x 297mm)',
      'GSM': '75 GSM',
      'Sheet Count': '500 Sheets per Rim',
      'Brightness': '98% ISO Brightness'
    },
    price: 360,
    discountPrice: 320,
    discountPercent: 11,
    gstRate: 12,
    stock: 150,
    rating: 4.7,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['paper', 'a4', 'jk copier', 'printer', 'office'],
    isBestSeller: true
  },
  {
    id: 'prod-8',
    name: 'Doms X1 Extra Super Dark Pencils - Pack of 10 with Eraser & Sharpener',
    sku: 'DMS-X1-PCL10',
    barcode: '8906023340021',
    productCode: 'BDB-PCL-008',
    brand: 'Doms',
    category: 'pencils',
    description: 'Soft lead extra dark writing pencils crafted from soft treated wood for easy sharpening and break-resistant performance.',
    specifications: {
      'Grade': '2B Extra Dark',
      'Pack Contents': '10 Pencils + 1 Dust Free Eraser + 1 Sharpener',
      'Wood Type': 'Soft Plantation Cedar Wood'
    },
    price: 70,
    discountPrice: 60,
    discountPercent: 14,
    gstRate: 12,
    stock: 300,
    rating: 4.9,
    reviewCount: 280,
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['pencil', 'doms', 'dark', 'writing'],
    isBestSeller: true
  },
  {
    id: 'prod-9',
    name: 'Milton Thermosteel Insulated Water Bottle 750ml',
    sku: 'MLT-BTL-750-SS',
    barcode: '8902061012349',
    productCode: 'BDB-BTL-009',
    brand: 'Milton',
    category: 'water-bottles',
    description: '100% Stainless steel double-wall vacuum insulated flask that keeps beverages hot or cold for up to 24 hours. Leak-proof and BPA free.',
    specifications: {
      'Capacity': '750 ml',
      'Material': '18/8 Food Grade Stainless Steel',
      'Insulation': '24 Hours Hot & Cold Vacuum Insulation',
      'Guarantee': '1 Year Manufacturer Guarantee'
    },
    price: 899,
    discountPrice: 749,
    discountPercent: 17,
    gstRate: 18,
    stock: 45,
    rating: 4.8,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['bottle', 'milton', 'thermosteel', 'water'],
    isNewArrival: true
  },
  {
    id: 'prod-10',
    name: 'Cello Stainless Steel Executive Lunch Box Set with Insulated Bag',
    sku: 'CEL-LNC-4ST',
    barcode: '8901725990211',
    productCode: 'BDB-LNC-010',
    brand: 'Cello',
    category: 'lunch-boxes',
    description: 'Set of 4 airtight leak-proof stainless steel containers with soft thermal carrying jacket. Keeps food warm and fresh for hours.',
    specifications: {
      'Containers': '4 Stainless Steel Bowls (300ml x 4)',
      'Jacket Material': 'Washable Thermal Fabric Bag',
      'Microwave Safe': 'Steel containers non-microwaveable'
    },
    price: 999,
    discountPrice: 849,
    discountPercent: 15,
    gstRate: 18,
    stock: 32,
    rating: 4.6,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['lunchbox', 'cello', 'school', 'office'],
    isFeatured: true
  },
  {
    id: 'prod-11',
    name: 'Solo Expanding Display File Folder 20 Pockets (A4)',
    sku: 'SLO-FOL-20P',
    barcode: '8906012019912',
    productCode: 'BDB-FLD-011',
    brand: 'Solo',
    category: 'files-folders',
    description: 'Heavy duty polypropylene display file folder with 20 anti-static transparent sheet protectors. Fits certificates, legal, and A4 documents.',
    specifications: {
      'Pocket Capacity': '20 Clear Pockets',
      'Cover Material': 'Polypropylene Textured Cover',
      'Color': 'Royal Blue'
    },
    price: 190,
    discountPrice: 160,
    discountPercent: 16,
    gstRate: 18,
    stock: 90,
    rating: 4.7,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['folder', 'file', 'solo', 'office']
  },
  {
    id: 'prod-12',
    name: 'Atomic Habits by James Clear (Paperback)',
    sku: 'BK-ATMIC-HBT',
    barcode: '9781847941831',
    productCode: 'BDB-BOK-012',
    brand: 'Penguin Random House',
    category: 'books',
    description: 'An easy and proven way to build good habits and break bad ones. The definitive bestseller on personal development and behavioral change.',
    specifications: {
      'Author': 'James Clear',
      'Language': 'English',
      'Publisher': 'Random House Business',
      'Pages': '320 Pages'
    },
    price: 699,
    discountPrice: 489,
    discountPercent: 30,
    gstRate: 5,
    stock: 60,
    rating: 5.0,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['book', 'atomic habits', 'bestseller', 'reading'],
    isFeatured: true,
    isBestSeller: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minSpend: 299,
    description: 'Get 10% instant discount on orders above ₹299 for new users!'
  },
  {
    code: 'BALAD20',
    type: 'percentage',
    value: 20,
    minSpend: 999,
    description: 'Special 20% savings on purchases over ₹999!'
  },
  {
    code: 'STATIONERY100',
    type: 'flat',
    value: 100,
    minSpend: 699,
    description: 'Flat ₹100 off on school & college supply bundles!'
  },
  {
    code: 'FESTIVAL25',
    type: 'percentage',
    value: 25,
    minSpend: 1499,
    isFestivalOffer: true,
    description: 'Grand Festival Season Offer: 25% OFF on orders above ₹1499!'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'BDB-2026-9041',
    date: '2026-08-01',
    customerName: 'Sanjay Kumar',
    customerEmail: 'sanjay@example.com',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Sanjay Kumar',
      phone: '+91 98765 43210',
      street: '42, Vidhyanagar Society, Near GCET College',
      city: 'Anand',
      state: 'Gujarat',
      pincode: '388120',
      type: 'Home',
      isDefault: true
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2
      },
      {
        product: INITIAL_PRODUCTS[4],
        quantity: 1
      }
    ],
    subtotal: 475,
    gstAmount: 51,
    shippingFee: 0,
    discountAmount: 47,
    couponCode: 'WELCOME10',
    totalAmount: 479,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Out for Delivery',
    trackingNumber: 'DEL-BD-8849201',
    estimatedDelivery: '2026-08-04'
  },
  {
    id: 'ord-1002',
    orderNumber: 'BDB-2026-9042',
    date: '2026-07-29',
    customerName: 'Meera Trivedi',
    customerEmail: 'meera@example.com',
    customerPhone: '+91 98123 77654',
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Meera Trivedi',
      phone: '+91 98123 77654',
      street: '102, Shivalik Heights, CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
      type: 'Work'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    subtotal: 1399,
    gstAmount: 251,
    shippingFee: 0,
    discountAmount: 140,
    couponCode: 'WELCOME10',
    totalAmount: 1510,
    paymentMethod: 'GPay',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    trackingNumber: 'DEL-BD-7710294',
    estimatedDelivery: '2026-08-01'
  }
];
