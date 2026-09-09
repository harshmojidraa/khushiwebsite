import { Product } from '../types';

export const FALLBACK_PRODUCT_IMAGE = 
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' width='100%25' height='100%25'%3E%3Crect width='600' height='600' fill='%23F8FAFC'/%3E%3Ccircle cx='300' cy='260' r='110' fill='%23EEF2F6'/%3E%3Cpath d='M260 250h80v60h-80z' fill='%23CBD5E1' rx='8'/%3E%3Ccircle cx='285' cy='230' r='14' fill='%234285F4'/%3E%3Ccircle cx='315' cy='230' r='14' fill='%2334A853'/%3E%3Ctext x='300' y='410' font-family='system-ui, -apple-system, sans-serif' font-size='22' font-weight='600' fill='%23475569' text-anchor='middle'%3EGoogle Merchandise%3C/text%3E%3Ctext x='300' y='440' font-family='system-ui, -apple-system, sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'%3EOfficial Merchandise Edition%3C/text%3E%3C/svg%3E";

export const MASTER_PRODUCTS: Product[] = [
  // 1. APPAREL (Products 1-6)
  {
    id: 'apparel-pixel-eco-hoodie',
    name: 'Google Pixel Eco Fleece Hoodie',
    category: 'Apparel',
    brand: 'Pixel',
    price: 68.00,
    originalPrice: 82.00,
    onSale: true,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from 100% organic combed cotton and recycled polyester fleece. Features a minimal embroidered Pixel G icon on the chest and an ultra-soft brushed interior for everyday comfort.',
    features: [
      '100% Organic & Recycled materials',
      'Embroidered chest detail with tonal finish',
      'Ribbed cuffs and hem with double-stitched durability',
      'Pre-shrunk fabric to preserve optimal fit'
    ],
    colors: ['Heather Gray', 'Obsidian Black', 'Bay Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    tags: ['hoodie', 'pixel', 'eco', 'winter', 'fleece']
  },
  {
    id: 'apparel-android-classic-tee',
    name: 'Android Bot Heavyweight T-Shirt',
    category: 'Apparel',
    brand: 'Android',
    price: 32.00,
    onSale: false,
    isNew: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: false,
    rating: 4.8,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'A relaxed heavyweight tee made from 240 GSM organic cotton. Highlights the updated 3D Android bugdroid emblem in signature Android Green on the left chest.',
    features: [
      '240 GSM heavyweight premium cotton',
      'Signature Android bugdroid high-density graphic',
      'Seamless collar band with reinforced neck tape',
      'Relaxed modern silhouette'
    ],
    colors: ['Android Green', 'Clean White', 'Deep Slate'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    tags: ['tee', 'android', 'green', 'casual']
  },
  {
    id: 'apparel-google-heritage-jacket',
    name: 'Google Heritage Tech Windbreaker',
    category: 'Apparel',
    brand: 'Google',
    price: 94.00,
    originalPrice: 115.00,
    onSale: true,
    isNew: true,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.7,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Weather-resistant lightweight packable shell designed for breezy campus commutes. Features breathable underarm eyelets and discrete Google colored zipper pulls.',
    features: [
      'Durable Water Repellent (DWR) coating',
      'Packable into its own internal pocket',
      'Four-color signature Google accent zippers',
      'Adjustable toggle hood and shockcord waist'
    ],
    colors: ['Matte Black', 'Glacier White'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    tags: ['jacket', 'windbreaker', 'outerwear', 'google']
  },
  {
    id: 'apparel-cloud-puffer-vest',
    name: 'Google Cloud Insulated Micro-Vest',
    category: 'Apparel',
    brand: 'Google Cloud',
    price: 88.00,
    onSale: false,
    isNew: true,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    description: 'Thermally efficient micro-ripstop vest insulated with PrimaLoft recycled fill. Ideal for layering between climate-controlled workspaces and outdoor commutes.',
    features: [
      'PrimaLoft Black Eco insulation',
      'Windproof micro-ripstop shell',
      'Interior zippered device security pocket',
      'Discrete Google Cloud tonal logo'
    ],
    colors: ['Cloud Navy', 'Charcoal'],
    sizes: ['M', 'L', 'XL', '2XL'],
    inStock: true,
    tags: ['vest', 'cloud', 'layering', 'warm']
  },
  {
    id: 'apparel-chrome-knit-sweater',
    name: 'Chrome Minimalist Merino Crewneck',
    category: 'Apparel',
    brand: 'Chrome',
    price: 110.00,
    originalPrice: 130.00,
    onSale: true,
    isNew: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: false,
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-fine 100% Australian Merino wool knit sweater. Naturally temperature regulating, odor resistant, and exceptionally soft against skin with a subtle Chrome logo tag.',
    features: [
      '100% Extra-fine Merino wool (19.5 micron)',
      'Natural moisture-wicking and breathability',
      'Ribbed knit hem, collar, and cuffs',
      'Hand-wash or dry clean only'
    ],
    colors: ['Navy Blue', 'Oatmeal Heather', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    tags: ['merino', 'sweater', 'chrome', 'knitwear']
  },
  {
    id: 'apparel-youtube-creator-sweatpants',
    name: 'YouTube Studio Jogger Sweatpants',
    category: 'Apparel',
    brand: 'YouTube',
    price: 54.00,
    onSale: false,
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    rating: 4.6,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxed fleece joggers built for long editing and creative studio sessions. Deep zippered pockets keep phones secure while seated.',
    features: [
      'French terry cotton blend',
      'Concealed zippered hip pockets',
      'Custom YouTube Red flatlock drawstrings',
      'Tapered elastic ankle cuffs'
    ],
    colors: ['Heather Gray', 'Jet Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    tags: ['joggers', 'sweatpants', 'youtube', 'loungewear']
  },

  // 2. DRINKWARE (Products 7-11)
  {
    id: 'drinkware-google-thermal-flask',
    name: 'Google Matte Thermal Water Bottle (24oz)',
    category: 'Drinkware',
    brand: 'Google',
    price: 36.00,
    originalPrice: 42.00,
    onSale: true,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Double-wall vacuum insulated 18/8 food-grade stainless steel bottle. Keeps cold drinks ice-cold for 24 hours and hot coffee steaming for 12 hours.',
    features: [
      'Double-wall vacuum insulation technology',
      'Leak-proof flex cap with durable carry handle',
      'Powder-coated non-slip matte finish',
      'BPA-free and dishwasher safe lid'
    ],
    colors: ['Chalk White', 'Matte Sage', 'Obsidian', 'Coral Red'],
    inStock: true,
    tags: ['flask', 'bottle', 'water', 'drinkware', 'insulated']
  },
  {
    id: 'drinkware-android-ceramic-mug',
    name: 'Android Stoneware Coffee Mug (14oz)',
    category: 'Drinkware',
    brand: 'Android',
    price: 22.00,
    onSale: false,
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 235,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-dipped artisanal ceramic mug with an unglazed raw stoneware base and glossy interior. Embossed with the Android robot silhouette.',
    features: [
      'Handcrafted ceramic stoneware',
      'Generous 14oz capacity for morning brew',
      'Microwave and dishwasher safe',
      'Comfort-grip ergonomic handle'
    ],
    colors: ['Stoneware Oatmeal', 'Olive Moss'],
    inStock: true,
    tags: ['mug', 'coffee', 'ceramic', 'android']
  },
  {
    id: 'drinkware-pixel-commuter-tumbler',
    name: 'Pixel Insulated Commuter Tumbler (16oz)',
    category: 'Drinkware',
    brand: 'Pixel',
    price: 34.00,
    onSale: false,
    isNew: true,
    isTrending: true,
    isBestSeller: false,
    isRecommended: false,
    rating: 4.7,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
    description: 'Cup-holder friendly commuter tumbler with splash-resistant slide lid and silicone coaster base. Fits neatly beneath modern espresso machines.',
    features: [
      'Slim profile fits standard automotive cup holders',
      'Splash-proof magnetic slider lid',
      'Integrated non-marking silicone base',
      'Food-grade 304 stainless steel interior'
    ],
    colors: ['Hazel Gray', 'Porcelain', 'Rose'],
    inStock: true,
    tags: ['tumbler', 'pixel', 'commute', 'coffee']
  },
  {
    id: 'drinkware-cloud-glass-infuser',
    name: 'Google Cloud Borosilicate Tea Infuser',
    category: 'Drinkware',
    brand: 'Google Cloud',
    price: 28.00,
    originalPrice: 35.00,
    onSale: true,
    isNew: false,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.6,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Heat-resistant dual-layer borosilicate glass tumbler equipped with a removable stainless steel loose leaf tea infuser basket.',
    features: [
      'Shock-resistant borosilicate glass',
      'Ultra-fine stainless steel mesh infuser',
      'Natural sustainable bamboo lid with silicone seal',
      'Maintains temperature without exterior heat transfer'
    ],
    colors: ['Clear Glass'],
    inStock: true,
    tags: ['tea', 'infuser', 'glass', 'cloud', 'wellness']
  },
  {
    id: 'drinkware-chrome-camp-cup',
    name: 'Chrome Stainless Camp Mug with Carabiner',
    category: 'Drinkware',
    brand: 'Chrome',
    price: 20.00,
    onSale: false,
    isNew: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: false,
    rating: 4.7,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1534940562234-8c823057e937?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged lightweight camp mug with an integrated anodized aluminum carabiner handle for quick clipping onto your backpack.',
    features: [
      'Locking carabiner clip handle',
      'Double-wall insulated stainless steel',
      'Featherweight 170g design',
      'Laser-etched Chrome icon'
    ],
    colors: ['Brushed Steel', 'Tactical Black'],
    inStock: true,
    tags: ['camp', 'mug', 'outdoor', 'chrome']
  },

  // 3. ACCESSORIES (Products 12-16)
  {
    id: 'accessories-pixel-canvas-backpack',
    name: 'Pixel Urban Commuter Tech Backpack (22L)',
    category: 'Accessories',
    brand: 'Pixel',
    price: 118.00,
    originalPrice: 145.00,
    onSale: true,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 440,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for developers and commuters. Features a padded dedicated 16-inch laptop compartment, water-repellent recycled Cordura shell, and magnetic Fidlock quick-release clasps.',
    features: [
      'Suspended 16" laptop pocket with plush fleece lining',
      'Luggage handle pass-through strap for travel',
      'Waterproof YKK AquaGuard zippers',
      'Breathable contoured EVA foam back panel'
    ],
    colors: ['Slate Heather', 'Obsidian', 'Lichen Green'],
    inStock: true,
    tags: ['backpack', 'tech', 'commute', 'bag', 'pixel']
  },
  {
    id: 'accessories-google-colors-cap',
    name: 'Google Heritage Low-Profile Dad Cap',
    category: 'Accessories',
    brand: 'Google',
    price: 26.00,
    onSale: false,
    isNew: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: false,
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    description: 'Unstructured 6-panel washed cotton twill cap. Subtle miniature Google 4-color dot embroidery on the front panel and embossed brass closure strap.',
    features: [
      '100% garment-washed cotton twill',
      'Adjustable antique brass strap buckle',
      'Embroidered ventilation eyelets',
      'Curved brim with moisture-absorbing sweatband'
    ],
    colors: ['Vintage Navy', 'Washed Black', 'Sand Khaki'],
    inStock: true,
    tags: ['hat', 'cap', 'headwear', 'google']
  },
  {
    id: 'accessories-tensor-cable-organizer',
    name: 'Google Tensor Tech Organizer Pouch',
    category: 'Accessories',
    brand: 'Google',
    price: 38.00,
    onSale: false,
    isNew: true,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Clamshell origami-style opening organizer for chargers, USB-C cables, power banks, and Pixel Buds. Features elastic retention loops and zippered mesh dividers.',
    features: [
      'Origami accordion layout opens flat 180 degrees',
      'Elastic woven cable organizer channels',
      'Water-resistant recycled poly shell',
      'External grab loop and slim profile'
    ],
    colors: ['Charcoal Gray', 'Chalk'],
    inStock: true,
    tags: ['organizer', 'pouch', 'cables', 'travel']
  },
  {
    id: 'accessories-chrome-canvas-tote',
    name: 'Chrome Web Heavy Canvas Daily Tote',
    category: 'Accessories',
    brand: 'Chrome',
    price: 24.00,
    originalPrice: 30.00,
    onSale: true,
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    rating: 4.7,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight 16oz raw natural cotton canvas tote bag with reinforced cross-stitched handles and an internal zip security pocket for phone and keys.',
    features: [
      '16oz heavyweight 100% natural cotton canvas',
      'Interior zippered pocket and key lanyard clip',
      'Extended 11" strap drop for shoulder carry',
      'Gusseted bottom expansion for groceries and laptop'
    ],
    colors: ['Natural Canvas', 'Eclipse Black'],
    inStock: true,
    tags: ['tote', 'bag', 'eco', 'chrome', 'canvas']
  },
  {
    id: 'accessories-android-socks-pack',
    name: 'Android Crew Socks (3-Pair Pack)',
    category: 'Accessories',
    brand: 'Android',
    price: 24.00,
    onSale: false,
    isNew: false,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=800&q=80',
    description: 'Cushioned combed cotton crew socks engineered with arch support bands and jacquard-woven Android bot patterns.',
    features: [
      'Combed cotton, polyamide, and spandex blend',
      'Targeted arch compression band',
      'Seamless toe link eliminates chafing',
      '3 distinct patterns per pack'
    ],
    sizes: ['One Size (fits 7-12)'],
    inStock: true,
    tags: ['socks', 'android', 'apparel', 'accessories']
  },

  // 4. STATIONERY (Products 17-20)
  {
    id: 'stationery-google-hardcover-journal',
    name: 'Google Dot Grid Hardcover Journal (A5)',
    category: 'Stationery',
    brand: 'Google',
    price: 24.00,
    originalPrice: 28.00,
    onSale: true,
    isNew: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Bound in soft-touch vegan leather with 192 numbered pages of 120 GSM bleed-resistant cream paper. Features an elastic closure, twin ribbon bookmarks, and expandable rear pocket.',
    features: [
      '120 GSM fountain pen friendly acid-free paper',
      '5mm subtle dot grid layout',
      'Twin color-coded grosgrain ribbon markers',
      'Expandable accordion back pocket for notes'
    ],
    colors: ['Google Navy', 'Terracotta Red', 'Sage Green'],
    inStock: true,
    tags: ['notebook', 'journal', 'stationery', 'office']
  },
  {
    id: 'stationery-rollerball-metal-pen',
    name: 'Google Minimalist Brass Rollerball Pen',
    category: 'Stationery',
    brand: 'Google',
    price: 22.00,
    onSale: false,
    isNew: true,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    description: 'Precision-machined solid brass rollerball with balanced weight distribution and German ceramic rollerball refill for butter-smooth writing.',
    features: [
      'Precision CNC-machined solid metal barrel',
      'Includes Schmidt 0.5mm ceramic rollerball cartridge (Black)',
      'Threaded cap posts securely on rear',
      'Subtle laser-etched Google wordmark'
    ],
    colors: ['Matte Black', 'Raw Brass', 'Space Silver'],
    inStock: true,
    tags: ['pen', 'rollerball', 'writing', 'stationery']
  },
  {
    id: 'stationery-google-desk-mat',
    name: 'Google Felt & Vegan Leather Desk Mat',
    category: 'Stationery',
    brand: 'Google',
    price: 36.00,
    onSale: false,
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    description: 'Dual-sided extra large desk pad (90cm x 40cm). Smooth water-resistant vegan leather side for optical mouse tracking, and cozy felted wool side for typing comfort.',
    features: [
      'Generous 90cm x 40cm surface coverage',
      'Dual-texture reversible design (Vegan Leather / Merino Felt)',
      'Waterproof and easy to wipe clean',
      'Stitched edge perimeter prevents fraying'
    ],
    colors: ['Dual Gray / Camel', 'Obsidian / Midnight'],
    inStock: true,
    tags: ['desk', 'mat', 'mousepad', 'workspace', 'office']
  },
  {
    id: 'stationery-android-sticky-notes-set',
    name: 'Android Studio Sticky Notes & Tabs Set',
    category: 'Stationery',
    brand: 'Android',
    price: 14.00,
    originalPrice: 18.00,
    onSale: true,
    isNew: false,
    isTrending: false,
    isBestSeller: false,
    isRecommended: false,
    rating: 4.7,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    description: 'Folio of assorted repositionable sticky note pads and translucent indexing flags in Google color palette with cute Android bugdroid accents.',
    features: [
      'Includes 6 pad variations (total 450 sheets)',
      'Translucent PET index tabs writeable with pencil or pen',
      'Premium residue-free adhesive backing',
      'Protective magnetic hardcover portfolio'
    ],
    inStock: true,
    tags: ['sticky notes', 'stationery', 'android', 'desk']
  },

  // 5. LIFESTYLE (Products 21-24)
  {
    id: 'lifestyle-android-plush-figurine',
    name: 'Android Collectible 3D Plush Companion',
    category: 'Lifestyle',
    brand: 'Android',
    price: 28.00,
    onSale: false,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    rating: 5.0,
    reviewCount: 610,
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
    description: 'Officially licensed ultra-soft plush mascot of the newly redesigned Android 3D Bugdroid. Stands 10 inches tall with bendable poseable antennas.',
    features: [
      'Hypoallergenic velvety micro-plush exterior',
      'Posable internal wire antennas',
      'Weighted pellet base allows self-standing display',
      '10" height (25cm)'
    ],
    inStock: true,
    tags: ['plush', 'android', 'toy', 'mascot', 'lifestyle']
  },
  {
    id: 'lifestyle-google-bamboo-speaker',
    name: 'Google Natural Bamboo Wireless Speaker',
    category: 'Lifestyle',
    brand: 'Google',
    price: 48.00,
    originalPrice: 58.00,
    onSale: true,
    isNew: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 165,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    description: 'Compact Bluetooth 5.3 portable speaker crafted with a real FSC-certified bamboo acoustic faceplate and 12-hour rechargeable battery.',
    features: [
      'Acoustic bamboo faceplate with crisp stereo sound',
      '12-hour continuous battery playback',
      'Bluetooth 5.3 with 33ft wireless range',
      'USB-C rapid charging cable included'
    ],
    colors: ['Natural Bamboo / White'],
    inStock: true,
    tags: ['speaker', 'audio', 'lifestyle', 'bamboo', 'gadget']
  },
  {
    id: 'lifestyle-chrome-dino-planter',
    name: 'Chrome Dino Ceramic Mini Planter',
    category: 'Lifestyle',
    brand: 'Chrome',
    price: 22.00,
    onSale: false,
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    rating: 4.9,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic offline T-Rex runner dinosaur sculpted as a minimalist ceramic desktop succulent planter with drainage hole and saucer.',
    features: [
      'High-fired matte ceramic pottery',
      'Bottom drainage hole with removable silicone plug',
      'Includes matching ceramic drip saucer',
      'Perfect size for desk succulents and cacti'
    ],
    colors: ['Matte Off-White', 'Dino Slate'],
    inStock: true,
    tags: ['planter', 'dino', 'chrome', 'decor', 'plant']
  },
  {
    id: 'lifestyle-google-travel-umbrella',
    name: 'Google Auto-Open Windproof Travel Umbrella',
    category: 'Lifestyle',
    brand: 'Google',
    price: 32.00,
    onSale: false,
    isNew: true,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.7,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    description: 'Reinforced 9-rib fiberglass canopy designed to invert in gale gusts without snapping. Opens and closes automatically with single-push handle trigger.',
    features: [
      'One-touch automatic open & close button',
      'Vented double canopy resists 55mph winds',
      '210T Teflon water-repellent pongee fabric',
      'Subtle Google color accents along inner lining'
    ],
    colors: ['Classic Black', 'Navy'],
    inStock: true,
    tags: ['umbrella', 'rain', 'travel', 'lifestyle']
  },

  // 6. COLLECTIONS (Products 25-28)
  {
    id: 'collections-dino-enamel-pin-set',
    name: 'Chrome Dino Heritage Enamel Pin Set (4-Pack)',
    category: 'Collections',
    brand: 'Chrome',
    price: 24.00,
    originalPrice: 30.00,
    onSale: true,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    description: 'Deluxe hard enamel pin collection celebrating the famous Chrome offline game: T-Rex Runner, Cacti, Pterodactyl, and Golden High Score Crown.',
    features: [
      'Hard enamel with polished gold and black nickel plating',
      'Rubber clutch backings prevent spinning or slippage',
      'Packaged in collectible foil-stamped presentation box',
      'Exclusive limited edition numbered run'
    ],
    inStock: true,
    tags: ['pins', 'enamel', 'collector', 'dino', 'chrome']
  },
  {
    id: 'collections-google-colors-coasters',
    name: 'Google Heritage Ceramic Coaster Set (4-Pack)',
    category: 'Collections',
    brand: 'Google',
    price: 26.00,
    onSale: false,
    isNew: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 180,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    description: 'Set of 4 absorbent ceramic stone drink coasters featuring the iconic Google primary colors with natural non-scratch cork backing.',
    features: [
      'Absorbent earthenware soaks condensation instantly',
      'Non-slip, scratch-protecting natural cork base',
      'Includes matte black metal storage caddy',
      'Vibrant UV-cured fade-resistant inks'
    ],
    inStock: true,
    tags: ['coasters', 'home', 'collector', 'google', 'kitchen']
  },
  {
    id: 'collections-pixel-leather-keyring',
    name: 'Pixel Horween Leather AirTag & Key FOB',
    category: 'Collections',
    brand: 'Pixel',
    price: 35.00,
    onSale: false,
    isNew: true,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1614713568397-b31b779d0468?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted from vegetable-tanned Horween leather that develops a unique patina over time. Equipped with black PVD-coated titanium split ring.',
    features: [
      'Genuine full-grain Horween leather',
      'Custom debossed Google G symbol',
      'Titanium alloy spring-action key loop',
      'Hand-burnished beeswax edges'
    ],
    colors: ['Cognac Brown', 'Obsidian Black'],
    inStock: true,
    tags: ['leather', 'keychain', 'pixel', 'collector']
  },
  {
    id: 'collections-google-rainbow-lanyard',
    name: 'Google Recycled Campus Lanyard & Badge Reel',
    category: 'Collections',
    brand: 'Google',
    price: 16.00,
    originalPrice: 20.00,
    onSale: true,
    isNew: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: false,
    rating: 4.7,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    description: 'The authentic Google campus employee lanyard. Woven from 100% recycled PET water bottles with quick-release breakaway safety clasp and retractable steel cable badge reel.',
    features: [
      '100% rPET recycled woven strap',
      'Heavy duty retractable 24" steel cord badge reel',
      'Safety breakaway neck snap',
      'Matte gunmetal lobster claw hook'
    ],
    inStock: true,
    tags: ['lanyard', 'badge', 'campus', 'google', 'collector']
  }
];

// Helper functions that guarantee safe, immutable product retrieval

export function getAllProducts(): Product[] {
  return [...MASTER_PRODUCTS];
}

export function getProductById(id: string): Product | undefined {
  return MASTER_PRODUCTS.find(p => p.id === id);
}

export function getTrendingProducts(count: number = 4): Product[] {
  const trending = MASTER_PRODUCTS.filter(p => p.isTrending);
  return trending.slice(0, count);
}

export function getBestSellers(count: number = 4): Product[] {
  const best = MASTER_PRODUCTS.filter(p => p.isBestSeller);
  return best.slice(0, count);
}

export function getRecommendedProducts(count: number = 4, excludeId?: string): Product[] {
  const filtered = MASTER_PRODUCTS.filter(p => p.id !== excludeId && (p.isRecommended || p.rating >= 4.8));
  return filtered.slice(0, count);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === 'All') return [...MASTER_PRODUCTS];
  return MASTER_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByBrand(brand: string): Product[] {
  if (!brand || brand === 'All') return [...MASTER_PRODUCTS];
  return MASTER_PRODUCTS.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getNewProducts(): Product[] {
  return MASTER_PRODUCTS.filter(p => p.isNew);
}

export function getSaleProducts(): Product[] {
  return MASTER_PRODUCTS.filter(p => p.onSale);
}

export function getRelatedProducts(productId: string, count: number = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return MASTER_PRODUCTS.slice(0, count);
  
  // Prefer same category, then same brand, then others
  const sameCategory = MASTER_PRODUCTS.filter(p => p.id !== productId && p.category === current.category);
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  
  const additional = MASTER_PRODUCTS.filter(p => p.id !== productId && p.category !== current.category);
  return [...sameCategory, ...additional].slice(0, count);
}
