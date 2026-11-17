import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Globe,
  Star,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  SlidersHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Gift,
  Menu,
  Copy,
  MapPin,
  Phone,
  Clock,
  Send,
  Award,
  Eye,
  CreditCard,
  CheckCircle2,
  RotateCcw,
  Filter
} from 'lucide-react';

/**
 * MAISON ÉCLAT — Haute Beauté & Parfumerie
 * Single-file Luxury Cosmetics & Fragrance E-Commerce Platform
 * Supports Uzbek (default), Russian, and English + Light & Dark Modes
 */

// ============================================================================
// 1. TRANSLATIONS & LOCALIZATION DICTIONARY (UZ / RU / EN)
// ============================================================================
const TRANSLATIONS = {
  uz: {
    announcement: "1 000 000 UZS dan yuqori buyurtmalar uchun O'zbekiston bo'ylab BEPUL yetkazib berish • Promo-kod: ECLAT20",
    nav: {
      catalog: "Katalog",
      newArrivals: "Yangi kelganlar",
      bestSellers: "Bestsellerlar",
      makeup: "Makiyaj",
      skincare: "Teri parvarishi",
      perfumes: "Atirlar",
      offers: "Aksiyalar",
      brands: "Brendlar"
    },
    searchPlaceholder: "Mahsulot, brend yoki atir notalarini qidiring...",
    hero: {
      eyebrow: "HAUTE BEAUTÉ & PARFUMERIE • PARIJ — TOSHKENT",
      titleLine1: "Nafislik va",
      titleLine2: "Tabiiy Nur San'ati",
      subtitle:
        "Dunyoning eng nufuzli kosmetika uylari va noyob parfyumeriya kolleksiyalarini kashf eting. Har bir flakon va teksturadagi mukammallik.",
      ctaPrimary: "Kolleksiyani ko'rish",
      ctaSecondary: "Maxsus takliflar (-25%)",
      spotlightLabel: "Tanlangan Shoh Asar",
      trust1Title: "100% Original",
      trust1Sub: "Rasmiy sertifikatlangan",
      trust2Title: "Tezkor Yetkazish",
      trust2Sub: "Toshkent bo'ylab 3 soatda",
      trust3Title: "Hashamatli Qadoq",
      trust3Sub: "Har bir buyurtmada sovg'a"
    },
    catalogSection: {
      eyebrow: "TO'LIQ KATALOG",
      title: "Go'zallik Galereyasi",
      subtitle: "Kerakli toifa, brend yoki narx bo'yicha saralang va o'zingizga mos mukammal vositani toping.",
      allCategories: "Barchasi",
      onlyDiscounts: "Faqat chegirmalar",
      onlyNew: "Faqat yangilar",
      allBrands: "Barcha brendlar",
      sortBy: "Saralash:",
      sortPopular: "Mashhurlik bo'yicha",
      sortPriceAsc: "Arzonroqdan qimmatga",
      sortPriceDesc: "Qimmatroqdan arzonga",
      sortRating: "Yuqori reyting",
      showingCount: "ta mahsulot ko'rsatilmoqda",
      resetFilters: "Filtrlarni tozalash",
      noResultsTitle: "Hech narsa topilmadi",
      noResultsSub: "Qidiruv so'rovini o'zgartirib ko'ring yoki barcha filtrlarni tozalang."
    },
    sections: {
      newArrivals: {
        eyebrow: "MAVSUM PREMYERASI",
        title: "Yangi Kelganlar",
        subtitle: "Parij va Milan laboratoriyalarining eng so'nggi innovatsion formulalari."
      },
      bestSellers: {
        eyebrow: "MIJOZLAR TANLOVI",
        title: "Eng Ko'p Sotilganlar",
        subtitle: "Har kuni minglab go'zallik ixlosmandlari ishonch bildiradigan afsonaviy mahsulotlar."
      },
      makeup: {
        eyebrow: "COUTURE MAKIYAJ",
        title: "Makiyaj Kolleksiyasi",
        subtitle: "Ipakdek mayin teksturalar, boy pigmentlar va kun bo'yi saqlanuvchi yorqinlik.",
        tabs: { all: "Barchasi", lips: "Lablar", face: "Yuz", eyes: "Ko'zlar" }
      },
      skincare: {
        eyebrow: "HUJAYRAVIY PARVARISH",
        title: "Teri Parvarishi",
        subtitle: "Terini chuqur namlantiruvchi, yoshartiruvchi va tabiiy nur baxsh etuvchi eliksirlar.",
        tabs: { all: "Barchasi", serums: "Zardoblar", moisturizers: "Kremlar", cleansers: "Tozalash" }
      },
      perfumes: {
        eyebrow: "HAUTE PARFUMERIE",
        title: "Noyob Atirlar Kolleksiyasi",
        subtitle: "Grasse gullari, sharqona ud va nafis mushk uyg'unligidagi unutilmas iforlar."
      },
      offers: {
        eyebrow: "CHEKLANGAN VAQT TAKLIFI",
        title: "Oltin Kuz Chegirmalari",
        subtitle: "Tanlangan hashamatli to'plamlarga 25% gacha chegirma va ECLAT20 promo-kodi bilan qo'shimcha imtiyoz.",
        promoLabel: "Qo'shimcha 20% chegirma kodi:",
        copyCode: "Nusxalash",
        copied: "Nusxalandi!",
        days: "Kun",
        hours: "Soat",
        mins: "Daqiqa",
        secs: "Soniya"
      },
      brands: {
        eyebrow: "HAMKOR UYLAR",
        title: "Mashhur Brendlar",
        subtitle: "Brendni tanlang va uning barcha eksklyuziv mahsulotlarini ko'ring.",
        itemsCount: "ta mahsulot"
      },
      reviews: {
        eyebrow: "HAQIQIY TAASSUROTLAR",
        title: "Mijozlar Fikrlari",
        subtitle: "Maison Éclat mijozlarining samimiy baholari va tajribalari.",
        verified: "Tasdiqlangan xarid",
        writeTitle: "O'z fikringizni qoldiring",
        nameLabel: "Ismingiz",
        namePlaceholder: "Masalan: Malika Karimova",
        productLabel: "Qaysi mahsulotni xarid qildingiz?",
        ratingLabel: "Baholash",
        commentLabel: "Taassurotingiz",
        commentPlaceholder: "Mahsulot sifati, hidi yoki teksturasi haqida yozing...",
        submitReview: "Sharhni yuborish",
        reviewAdded: "Rahmat! Sizning sharhingiz muvaffaqiyatli qo'shildi."
      },
      newsletter: {
        eyebrow: "LE CERCLE ÉCLAT VIP KLUBI",
        title: "Yopiq Taqdimotlar va Maxsus Sovg'alar",
        subtitle: "Obuna bo'ling va birinchi buyurtmangiz uchun 150 000 UZS vaucher hamda yangi kolleksiyalarga ertaroq kirish huquqini qo'lga kiriting.",
        placeholder: "Elektron pochtangizni kiriting...",
        button: "A'zo bo'lish",
        success: "Tabriklaymiz! Siz Le Cercle Éclat klubiga qo'shildingiz. Vaucher kodingiz: BIENVENUE150",
        invalidEmail: "Iltimos, to'g'ri elektron pochta manzilini kiriting."
      }
    },
    product: {
      addToCart: "Savatga qo'shish",
      quickView: "Batafsil",
      newBadge: "YANGI",
      bestBadge: "TOP",
      shadeOrSize: "Rang yoki hajmni tanlang:",
      quantity: "Miqdor:",
      descriptionTab: "Tavsif",
      notesTab: "Tarkib / Notalar",
      inStock: "Sotuvda mavjud • Bugun yetkaziladi",
      addedToast: "savatga qo'shildi",
      wishAddedToast: "sevimlilarga qo'shildi",
      wishRemovedToast: "sevimlilardan olib tashlandi"
    },
    cart: {
      title: "Xarid Savati",
      emptyTitle: "Savatingiz hozircha bo'sh",
      emptySub: "O'zingizga yoqqan parfyumeriya yoki kosmetika vositalarini katalogdan tanlang.",
      browseBtn: "Katalogga o'tish",
      freeShipRemaining: "Bepul yetkazib berishgacha yana",
      freeShipUnlocked: "Tabriklaymiz! Siz uchun yetkazib berish BEPUL",
      promoPlaceholder: "Promo-kod (masalan: ECLAT20)",
      applyPromo: "Qo'llash",
      promoApplied: "ECLAT20 kodi qo'llanildi (-20%)",
      promoInvalid: "Noto'g'ri promo-kod. ECLAT20 kodini sinab ko'ring.",
      subtotal: "Mahsulotlar summasi",
      discount: "Chegirma",
      delivery: "Yetkazib berish",
      free: "Bepul",
      total: "Jami to'lov",
      checkoutBtn: "Buyurtmani rasmiylashtirish"
    },
    wishlist: {
      title: "Sevimlilar Ro'yxati",
      emptyTitle: "Sevimlilar ro'yxati bo'sh",
      emptySub: "Yoqtirgan mahsulotlaringizni yurakcha tugmasi orqali saqlab qo'ying.",
      moveToCart: "Savatga o'tkazish"
    },
    checkout: {
      title: "Buyurtmani Rasmiylashtirish",
      backToCart: "Savatga qaytish",
      fullName: "F.I.Sh. (To'liq ismingiz)",
      fullNamePh: "Aziza Rustamova",
      phone: "Telefon raqamingiz",
      phonePh: "+998 90 123 45 67",
      city: "Shahar / Hudud",
      address: "Yetkazib berish manzili",
      addressPh: "Tuman, ko'cha, uy va xonadon raqami",
      paymentMethod: "To'lov usuli",
      cashOnDelivery: "Qabul qilinganda naqd / karta orqali",
      placeOrder: "Buyurtmani tasdiqlash",
      errors: {
        name: "Iltimos, to'liq ismingizni kiriting (kamida 3 ta harf).",
        phone: "Telefon raqamini +998 XX XXX XX XX formatida kiriting.",
        address: "Iltimos, aniq yetkazib berish manzilini kiriting."
      },
      successTitle: "Buyurtmangiz Qabul Qilindi!",
      successSub: "Maison Éclat konsyerj xizmati tez orada siz bilan bog'lanadi va buyurtmani hashamatli qadoqda jo'natadi.",
      orderNumber: "Buyurtma raqami",
      continueShopping: "Xaridni davom ettirish"
    },
    footer: {
      about:
        "Maison Éclat — Toshkent markazidagi hashamatli kosmetika va noyob parfyumeriya butigi. Biz dunyoning eng sara go'zallik uylarining original kolleksiyalarini taqdim etamiz.",
      colShop: "Kolleksiyalar",
      colService: "Mijozlar Xizmati",
      colBoutique: "Toshkent Butiki",
      serviceLinks: [
        "Yetkazib berish va to'lov",
        "Asllik kafolati",
        "Qaytarish va almashtirish",
        "Shaxsiy konsultatsiya",
        "Sovg'a sertifikatlari"
      ],
      address: "Amir Temur shoh ko'chasi, 108-uy, Toshkent, O'zbekiston",
      hours: "Har kuni: 10:00 — 22:00",
      paymentTitle: "Qabul qilinadigan to'lov tizimlari",
      copyright: "© 2026 MAISON ÉCLAT. Barcha huquqlar himoyalangan."
    }
  },

  ru: {
    announcement: "БЕСПЛАТНАЯ доставка по Узбекистану при заказе от 1 000 000 UZS • Промокод: ECLAT20",
    nav: {
      catalog: "Каталог",
      newArrivals: "Новинки",
      bestSellers: "Бестселлеры",
      makeup: "Макияж",
      skincare: "Уход за кожей",
      perfumes: "Парфюмерия",
      offers: "Акции",
      brands: "Бренды"
    },
    searchPlaceholder: "Поиск средств, брендов или нот аромата...",
    hero: {
      eyebrow: "HAUTE BEAUTÉ & PARFUMERIE • ПАРИЖ — ТАШКЕНТ",
      titleLine1: "Искусство Сияния",
      titleLine2: "и Высокой Красоты",
      subtitle:
        "Откройте для себя коллекцию культовой косметики и нишевой парфюмерии от ведущих мировых домов. Совершенство в каждой капле и текстуре.",
      ctaPrimary: "Смотреть коллекцию",
      ctaSecondary: "Спецпредложения (-25%)",
      spotlightLabel: "Выбор Экспертов",
      trust1Title: "100% Оригинал",
      trust1Sub: "Официальные сертификаты",
      trust2Title: "Быстрая доставка",
      trust2Sub: "По Ташкенту за 3 часа",
      trust3Title: "Люкс упаковка",
      trust3Sub: "Комплимент в каждом заказе"
    },
    catalogSection: {
      eyebrow: "ПОЛНЫЙ КАТАЛОГ",
      title: "Галерея Красоты",
      subtitle: "Фильтруйте по категориям, брендам или цене, чтобы найти свой идеальный ритуал красоты.",
      allCategories: "Все товары",
      onlyDiscounts: "Только со скидкой",
      onlyNew: "Только новинки",
      allBrands: "Все бренды",
      sortBy: "Сортировка:",
      sortPopular: "По популярности",
      sortPriceAsc: "По возрастанию цены",
      sortPriceDesc: "По убыванию цены",
      sortRating: "По высокому рейтингу",
      showingCount: "товаров найдено",
      resetFilters: "Сбросить фильтры",
      noResultsTitle: "Ничего не найдено",
      noResultsSub: "Попробуйте изменить параметры поиска или сбросить активные фильтры."
    },
    sections: {
      newArrivals: {
        eyebrow: "ПРЕМЬЕРА СЕЗОНА",
        title: "Новые Поступления",
        subtitle: "Новейшие формулы и лимитированные запуски из лабораторий Парижа и Милана."
      },
      bestSellers: {
        eyebrow: "ВЫБОР КЛИЕНТОВ",
        title: "Бестселлеры Дома",
        subtitle: "Легендарные средства, которым ежедневно доверяют ценители безупречного ухода."
      },
      makeup: {
        eyebrow: "COUTURE МАКИЯЖ",
        title: "Коллекция Макияжа",
        subtitle: "Шелковистые текстуры, насыщенные пигменты и стойкое атласное сияние.",
        tabs: { all: "Все", lips: "Губы", face: "Лицо", eyes: "Глаза" }
      },
      skincare: {
        eyebrow: "КЛЕТОЧНЫЙ УХОД",
        title: "Уход за Кожей",
        subtitle: "Эликсиры глубокого увлажнения, обновления и естественного фарфорового сияния.",
        tabs: { all: "Все", serums: "Сыворотки", moisturizers: "Кремы", cleansers: "Очищение" }
      },
      perfumes: {
        eyebrow: "HAUTE PARFUMERIE",
        title: "Высокая Парфюмерия",
        subtitle: "Утонченные композиции с нотами дамасской розы, шафрана, амбры и белого уда."
      },
      offers: {
        eyebrow: "ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ",
        title: "Привилегии Золотого Сезона",
        subtitle: "Скидки до 25% на избранные бестселлеры и дополнительная выгода по промокоду ECLAT20.",
        promoLabel: "Промокод на доп. скидку 20%:",
        copyCode: "Копировать",
        copied: "Скопировано!",
        days: "Дней",
        hours: "Часов",
        mins: "Минут",
        secs: "Секунд"
      },
      brands: {
        eyebrow: "ДОМА КРАСОТЫ",
        title: "Популярные Бренды",
        subtitle: "Нажмите на любой парфюмерно-косметический дом, чтобы открыть его коллекцию.",
        itemsCount: "средств"
      },
      reviews: {
        eyebrow: "ОТЗЫВЫ КЛИЕНТОВ",
        title: "Впечатления Покупателей",
        subtitle: "Искренние истории и оценки постоянных гостей бутика Maison Éclat.",
        verified: "Подтвержденная покупка",
        writeTitle: "Оставить отзыв",
        nameLabel: "Ваше имя",
        namePlaceholder: "Например: Малика Каримова",
        productLabel: "Приобретенный товар",
        ratingLabel: "Оценка",
        commentLabel: "Ваш отзыв",
        commentPlaceholder: "Поделитесь впечатлениями о текстуре, аромате и стойкости...",
        submitReview: "Опубликовать отзыв",
        reviewAdded: "Спасибо! Ваш отзыв успешно опубликован."
      },
      newsletter: {
        eyebrow: "ЗАКРЫТЫЙ КЛУБ LE CERCLE ÉCLAT",
        title: "Приглашение в Мир Высокой Красоты",
        subtitle: "Подпишитесь и получите ваучер на 150 000 UZS на первый заказ, а также ранний доступ к лимитированным коллекциям.",
        placeholder: "Введите ваш e-mail...",
        button: "Вступить",
        success: "Добро пожаловать в Le Cercle Éclat! Ваш промокод: BIENVENUE150",
        invalidEmail: "Пожалуйста, введите корректный адрес электронной почты."
      }
    },
    product: {
      addToCart: "В корзину",
      quickView: "Подробнее",
      newBadge: "NEW",
      bestBadge: "ХИТ",
      shadeOrSize: "Выберите оттенок или объем:",
      quantity: "Количество:",
      descriptionTab: "Описание",
      notesTab: "Состав / Ноты",
      inStock: "В наличии • Доставка сегодня",
      addedToast: "добавлен в корзину",
      wishAddedToast: "добавлен в избранное",
      wishRemovedToast: "удален из избранного"
    },
    cart: {
      title: "Корзина Покупок",
      emptyTitle: "Ваша корзина пока пуста",
      emptySub: "Добавьте понравившиеся ароматы и средства ухода из нашего каталога.",
      browseBtn: "Перейти в каталог",
      freeShipRemaining: "До бесплатной доставки осталось",
      freeShipUnlocked: "Поздравляем! Для вас доставка БЕСПЛАТНА",
      promoPlaceholder: "Промокод (например: ECLAT20)",
      applyPromo: "Применить",
      promoApplied: "Промокод ECLAT20 применен (-20%)",
      promoInvalid: "Неверный промокод. Попробуйте ECLAT20.",
      subtotal: "Сумма товаров",
      discount: "Скидка",
      delivery: "Доставка",
      free: "Бесплатно",
      total: "Итого к оплате",
      checkoutBtn: "Оформить заказ"
    },
    wishlist: {
      title: "Избранное",
      emptyTitle: "Список избранного пуст",
      emptySub: "Сохраняйте понравившиеся шедевры красоты нажатием на сердечко.",
      moveToCart: "Перенести в корзину"
    },
    checkout: {
      title: "Оформление Заказа",
      backToCart: "Вернуться в корзину",
      fullName: "Ф.И.О. получателя",
      fullNamePh: "Азиза Рустамова",
      phone: "Контактный телефон",
      phonePh: "+998 90 123 45 67",
      city: "Город доставки",
      address: "Адрес доставки",
      addressPh: "Район, улица, дом и квартира",
      paymentMethod: "Способ оплаты",
      cashOnDelivery: "Наличными или картой при получении",
      placeOrder: "Подтвердить заказ",
      errors: {
        name: "Пожалуйста, введите ваше полное имя (минимум 3 символа).",
        phone: "Введите номер в формате +998 XX XXX XX XX.",
        address: "Пожалуйста, укажите точный адрес доставки."
      },
      successTitle: "Ваш Заказ Успешно Оформлен!",
      successSub: "Консьерж-служба Maison Éclat свяжется с вами в ближайшее время и бережно упакует ваш заказ.",
      orderNumber: "Номер заказа",
      continueShopping: "Продолжить покупки"
    },
    footer: {
      about:
        "Maison Éclat — флагманский бутик люксовой косметики и высокой парфюмерии в сердце Ташкента. Только оригинальные коллекции мировых домов красоты.",
      colShop: "Коллекции",
      colService: "Клиентский Сервис",
      colBoutique: "Бутик в Ташкенте",
      serviceLinks: [
        "Доставка и оплата",
        "Гарантия подлинности",
        "Возврат и обмен",
        "Персональная консультация",
        "Подарочные сертификаты"
      ],
      address: "Проспект Амира Темура, 108, Ташкент, Узбекистан",
      hours: "Ежедневно: 10:00 — 22:00",
      paymentTitle: "Принимаем к оплате",
      copyright: "© 2026 MAISON ÉCLAT. Все права защищены."
    }
  },

  en: {
    announcement: "COMPLIMENTARY delivery across Uzbekistan on orders over 1,000,000 UZS • Promo Code: ECLAT20",
    nav: {
      catalog: "Catalog",
      newArrivals: "New Arrivals",
      bestSellers: "Best Sellers",
      makeup: "Makeup",
      skincare: "Skincare",
      perfumes: "Perfumes",
      offers: "Offers",
      brands: "Brands"
    },
    searchPlaceholder: "Search products, beauty houses, or fragrance notes...",
    hero: {
      eyebrow: "HAUTE BEAUTÉ & PARFUMERIE • PARIS — TASHKENT",
      titleLine1: "The Art of",
      titleLine2: "Luminous Couture",
      subtitle:
        "Curated haute cosmetics, cellular skincare elixirs, and rare perfumery from the world's finest ateliers. Crafted for timeless radiance.",
      ctaPrimary: "Explore Collection",
      ctaSecondary: "Private Offers (-25%)",
      spotlightLabel: "Curator's Spotlight",
      trust1Title: "100% Authentic",
      trust1Sub: "Certified luxury houses",
      trust2Title: "Express Courier",
      trust2Sub: "3-hour Tashkent delivery",
      trust3Title: "Couture Gift Wrap",
      trust3Sub: "Samples with every order"
    },
    catalogSection: {
      eyebrow: "COMPLETE ARCHIVE",
      title: "The Beauty Gallery",
      subtitle: "Filter by category, maison, or price to curate your personalized beauty ritual.",
      allCategories: "All Creations",
      onlyDiscounts: "On Sale Only",
      onlyNew: "New Arrivals Only",
      allBrands: "All Maisons",
      sortBy: "Sort by:",
      sortPopular: "Most Popular",
      sortPriceAsc: "Price: Low to High",
      sortPriceDesc: "Price: High to Low",
      sortRating: "Highest Rated",
      showingCount: "creations displayed",
      resetFilters: "Reset Filters",
      noResultsTitle: "No Creations Found",
      noResultsSub: "Try adjusting your search query or clearing active filters."
    },
    sections: {
      newArrivals: {
        eyebrow: "SEASONAL PREMIERE",
        title: "New Arrivals",
        subtitle: "Freshly unveiled formulations and limited editions from Paris and Milan."
      },
      bestSellers: {
        eyebrow: "CLIENT ICONS",
        title: "Best Sellers",
        subtitle: "Our most coveted luxury icons adored by beauty connoisseurs every day."
      },
      makeup: {
        eyebrow: "COUTURE COLOR",
        title: "Makeup Collection",
        subtitle: "Silk-infused pigments, velvet lipsticks, and weightless luminous complexions.",
        tabs: { all: "All", lips: "Lips", face: "Face", eyes: "Eyes" }
      },
      skincare: {
        eyebrow: "CELLULAR SCIENCE",
        title: "Skincare Rituals",
        subtitle: "Botanical serums and sculpting creams engineered for glass-skin luminosity.",
        tabs: { all: "All", serums: "Serums", moisturizers: "Creams", cleansers: "Cleansers" }
      },
      perfumes: {
        eyebrow: "HAUTE PARFUMERIE",
        title: "Signature Perfumes",
        subtitle: "Olfactory masterpieces blending Grasse rose, saffron, ambergris, and white oud."
      },
      offers: {
        eyebrow: "LIMITED PRIVÉ EVENT",
        title: "Golden Season Privileges",
        subtitle: "Enjoy up to 25% off selected icons plus an extra 20% privilege with code ECLAT20.",
        promoLabel: "Extra 20% privilege code:",
        copyCode: "Copy Code",
        copied: "Copied!",
        days: "Days",
        hours: "Hours",
        mins: "Mins",
        secs: "Secs"
      },
      brands: {
        eyebrow: "CURATED MAISONS",
        title: "Popular Brands",
        subtitle: "Select a luxury beauty house to explore its dedicated creations.",
        itemsCount: "creations"
      },
      reviews: {
        eyebrow: "CLIENT STORIES",
        title: "Customer Reviews",
        subtitle: "Verified reflections from Maison Éclat patrons across Uzbekistan.",
        verified: "Verified Purchase",
        writeTitle: "Share Your Experience",
        nameLabel: "Your Name",
        namePlaceholder: "e.g. Malika Karimova",
        productLabel: "Purchased Creation",
        ratingLabel: "Rating",
        commentLabel: "Your Review",
        commentPlaceholder: "Tell us about the texture, scent, and finish...",
        submitReview: "Publish Review",
        reviewAdded: "Thank you! Your review has been published."
      },
      newsletter: {
        eyebrow: "LE CERCLE ÉCLAT VIP",
        title: "Private Previews & Privileges",
        subtitle: "Join our inner circle to receive a 150,000 UZS welcome voucher and early access to limited launches.",
        placeholder: "Enter your email address...",
        button: "Join Circle",
        success: "Welcome to Le Cercle Éclat! Your voucher code: BIENVENUE150",
        invalidEmail: "Please enter a valid email address."
      }
    },
    product: {
      addToCart: "Add to Bag",
      quickView: "Details",
      newBadge: "NEW",
      bestBadge: "ICON",
      shadeOrSize: "Select Shade or Volume:",
      quantity: "Quantity:",
      descriptionTab: "Description",
      notesTab: "Ingredients / Notes",
      inStock: "In Stock • Same-Day Dispatch",
      addedToast: "added to your bag",
      wishAddedToast: "saved to wishlist",
      wishRemovedToast: "removed from wishlist"
    },
    cart: {
      title: "Shopping Bag",
      emptyTitle: "Your shopping bag is empty",
      emptySub: "Discover luxury fragrances, skincare elixirs, and couture makeup in our gallery.",
      browseBtn: "Explore Gallery",
      freeShipRemaining: "Add more for complimentary delivery:",
      freeShipUnlocked: "Complimentary Express Delivery Unlocked",
      promoPlaceholder: "Promo code (try: ECLAT20)",
      applyPromo: "Apply",
      promoApplied: "Promo code ECLAT20 applied (-20%)",
      promoInvalid: "Invalid promo code. Try ECLAT20.",
      subtotal: "Subtotal",
      discount: "Privilege Discount",
      delivery: "Delivery",
      free: "Complimentary",
      total: "Estimated Total",
      checkoutBtn: "Proceed to Checkout"
    },
    wishlist: {
      title: "Saved Wishlist",
      emptyTitle: "Your wishlist is empty",
      emptySub: "Tap the heart icon on any creation to save it for later.",
      moveToCart: "Move to Bag"
    },
    checkout: {
      title: "Secure Checkout",
      backToCart: "Back to Bag",
      fullName: "Recipient Full Name",
      fullNamePh: "Aziza Rustamova",
      phone: "Mobile Number",
      phonePh: "+998 90 123 45 67",
      city: "City / Region",
      address: "Delivery Address",
      addressPh: "District, street, building, and apartment",
      paymentMethod: "Payment Method",
      cashOnDelivery: "Cash or Terminal on Delivery",
      placeOrder: "Confirm Order",
      errors: {
        name: "Please enter your full name (at least 3 characters).",
        phone: "Please enter a valid number (+998 XX XXX XX XX).",
        address: "Please enter a complete delivery address."
      },
      successTitle: "Order Confirmed!",
      successSub: "Our Maison Éclat concierge will contact you shortly to arrange white-glove delivery.",
      orderNumber: "Order Reference",
      continueShopping: "Continue Exploring"
    },
    footer: {
      about:
        "Maison Éclat is Tashkent's premier destination for haute cosmetics, cellular skincare, and rare perfumery. Every creation is 100% authentic and sourced directly from flagship maisons.",
      colShop: "Collections",
      colService: "Client Concierge",
      colBoutique: "Tashkent Flagship",
      serviceLinks: [
        "Delivery & Payment",
        "Authenticity Guarantee",
        "Returns & Exchanges",
        "Private Beauty Consultation",
        "Bespoke Gift Cards"
      ],
      address: "108 Amir Temur Avenue, Tashkent, Uzbekistan",
      hours: "Daily: 10:00 AM — 10:00 PM",
      paymentTitle: "Accepted Payment Methods",
      copyright: "© 2026 MAISON ÉCLAT. All Rights Reserved."
    }
  }
};

// ============================================================================
// 2. LUXURY BRANDS DATA
// ============================================================================
const BRANDS = [
  {
    id: 'MAISON ÉCLAT',
    name: 'MAISON ÉCLAT',
    origin: 'Paris, France',
    monogram: 'MÉ',
    specialty: { uz: 'Haute Beauté & Eliksirlar', ru: 'Высокая красота и эликсиры', en: 'Haute Beauté & Elixirs' }
  },
  {
    id: 'ATELIER VELOURS',
    name: 'ATELIER VELOURS',
    origin: 'Paris, France',
    monogram: 'AV',
    specialty: { uz: 'Baxmal Lab va Ko‘z Makiyaji', ru: 'Бархатный макияж губ и глаз', en: 'Velvet Lip & Eye Couture' }
  },
  {
    id: 'LUMIÈRE DE SOIE',
    name: 'LUMIÈRE DE SOIE',
    origin: 'Geneva, Switzerland',
    monogram: 'LS',
    specialty: { uz: 'Shveytsariya Hujayraviy Parvarishi', ru: 'Швейцарский клеточный уход', en: 'Swiss Cellular Skincare' }
  },
  {
    id: 'PARFUMS DE GRASSE',
    name: 'PARFUMS DE GRASSE',
    origin: 'Grasse, France',
    monogram: 'PG',
    specialty: { uz: 'Noyob Niша Parfyumeriya', ru: 'Нишевая высокая парфюмерия', en: 'Rare Niche Perfumery' }
  },
  {
    id: 'OR & ROSE',
    name: 'OR & ROSE',
    origin: 'Milan, Italy',
    monogram: 'OR',
    specialty: { uz: 'Yorqin Yuz Tusi va Xaylayterlar', ru: 'Сияющий тон и хайлайтеры', en: 'Luminous Complexion' }
  },
  {
    id: 'AURA BOTANICA',
    name: 'AURA BOTANICA',
    origin: 'Seoul — Paris',
    monogram: 'AB',
    specialty: { uz: 'Organik Gul Essensiyalari', ru: 'Цветочные био-эссенции', en: 'Botanical Bio-Essences' }
  }
];

// ============================================================================
// 3. 24 LUXURY COSMETIC, SKINCARE & PERFUME PRODUCTS (UZS PRICING)
// ============================================================================
const PRODUCTS = [
  {
    id: 'eclat-01',
    name: 'Rouge Velours Couture Lipstick',
    brand: 'ATELIER VELOURS',
    category: 'makeup',
    subCategory: 'lips',
    price: 540000,
    originalPrice: 650000,
    rating: 4.9,
    reviewCount: 148,
    popularity: 99,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Rose Cachemire', color: '#C97B84' },
      { label: '04 Rouge Opera', color: '#9E2A38' },
      { label: '09 Bois de Rose', color: '#B36A6E' }
    ],
    descriptions: {
      uz: "Atirgul moyi va gialuron mikrosferalari bilan boyitilgan baxmal lab bo'yog'i. 12 soatgacha quritmasdan to'yingan mat-atlas qoplama beradi.",
      ru: "Бархатная помада-кутюр с маслом дамасской розы и микросферами гиалуроновой кислоты. Дарит насыщенный атласно-матовый финиш до 12 часов.",
      en: "Couture velvet lipstick infused with damask rose oil and hyaluronic microspheres. Delivers 12-hour weightless satin-matte color."
    },
    notesOrIngredients: {
      uz: "Damask atirgul moyi, Gialuron kislotasi, Shi yog'i, E vitamini.",
      ru: "Масло дамасской розы, гиалуроновая кислота, масло ши, витамин Е.",
      en: "Damask Rose Oil, Hyaluronic Spheres, Shea Butter, Vitamin E."
    }
  },
  {
    id: 'eclat-02',
    name: 'Élixir Rose & Safran Extrait de Parfum',
    brand: 'PARFUMS DE GRASSE',
    category: 'perfume',
    subCategory: 'floral',
    price: 2450000,
    originalPrice: 2950000,
    rating: 5.0,
    reviewCount: 214,
    popularity: 100,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    fragranceNotes: ['Damask Rose', 'Saffron', 'White Oud'],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Extrait' },
      { label: '100 ml Extrait' }
    ],
    descriptions: {
      uz: "Grasse may atirguli, oltin za'faron va mayin oq ud uyg'unligidagi shohona parfyum ekstrakti. Terida 24 soatdan ortiq unutilmas shleyf qoldiradi.",
      ru: "Королевский экстракт духов с нотами майской розы из Грасса, шафрана и белого уда. Оставляет драгоценный шлейф более 24 часов.",
      en: "Royal extrait de parfum blending Grasse May rose, golden saffron, and creamy white oud for an unforgettable 24-hour sillage."
    },
    notesOrIngredients: {
      uz: "Yuqori: Za'faron, Bergamot • Yurak: Grasse Atirguli, Pion • Baza: Oq Ud, Oq Mushk, Ambra.",
      ru: "Верхние: Шафран, Бергамот • Сердце: Роза Грасса, Пион • База: Белый Уд, Белый Мускус, Амбра.",
      en: "Top: Saffron, Bergamot • Heart: Grasse Rose, Peony • Base: White Oud, White Musk, Amber."
    }
  },
  {
    id: 'eclat-03',
    name: 'Sérum Cellular Or 24K Concentré',
    brand: 'LUMIÈRE DE SOIE',
    category: 'skincare',
    subCategory: 'serums',
    price: 1680000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 96,
    popularity: 95,
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '30 ml Dropper' },
      { label: '50 ml Salon Size' }
    ],
    descriptions: {
      uz: "24 karatli bio-oltin zarralari va Shveytsariya peptidlariga ega tiklovchi zardob. Terining elastikligini oshiradi va birinchi qo'llashdayoq tabiiy nur beradi.",
      ru: "Восстанавливающая сыворотка с частицами 24-каратного био-золота и швейцарскими пептидами. Повышает упругость и мгновенно придает сияние.",
      en: "Cellular revitalizing serum infused with 24K bio-gold flakes and Swiss peptides to visibly firm and illuminate dull skin."
    },
    notesOrIngredients: {
      uz: "Kolloid Oltin 24K, Niatsinamid 5%, Tri-Peptid Kompleks, Alp Atirgul Ekstrakti.",
      ru: "Коллоидное золото 24K, Ниацинамид 5%, Три-пептидный комплекс, Экстракт альпийской розы.",
      en: "24K Colloidal Gold, 5% Niacinamide, Tri-Peptide Complex, Alpine Rose Stem Cells."
    }
  },
  {
    id: 'eclat-04',
    name: 'Teint Lumière Silk Serum Foundation SPF 25',
    brand: 'OR & ROSE',
    category: 'makeup',
    subCategory: 'face',
    price: 890000,
    originalPrice: 1050000,
    rating: 4.8,
    reviewCount: 132,
    popularity: 92,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '1N Porcelain Silk', color: '#F3D7C4' },
      { label: '2W Champagne Ivory', color: '#E8C2A6' },
      { label: '3N Warm Sand', color: '#D6A684' },
      { label: '4W Golden Honey', color: '#BD8964' }
    ],
    descriptions: {
      uz: "70% parvarishlovchi zardob asosidagi yengil tonal krem. Teri kamchiliklarini sezdirmasdan yashiradi va tabiiy ipakdek yorqinlik yaratadi.",
      ru: "Тональная сыворотка на 70% состоящая из ухаживающей эссенции. Безупречно выравнивает тон и создает эффект шелковой кожи.",
      en: "Weightless serum foundation formulated with 70% skincare essence for buildable coverage and a second-skin luminous glow."
    },
    notesOrIngredients: {
      uz: "Oq pion ekstrakti, Skvalan, Mineral SPF 25 filtrlari, Gialuron kislotasi.",
      ru: "Экстракт белого пиона, Сквалан, Минеральные фильтры SPF 25, Гиалуроновая кислота.",
      en: "White Peony Extract, Olive Squalane, Mineral SPF 25, Multi-Molecular Hyaluronic Acid."
    }
  },
  {
    id: 'eclat-05',
    name: 'Palette Yeux Harmonie Rose & Or',
    brand: 'MAISON ÉCLAT',
    category: 'makeup',
    subCategory: 'eyes',
    price: 960000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 84,
    popularity: 91,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Rose Champagne', color: '#DFB1B6' },
      { label: '02 Bronze Cachemire', color: '#B4836E' }
    ],
    descriptions: {
      uz: "9 ta hashamatli mat, atlas va marvarid jiloli soyalardan iborat kutyur paletra. Kunduzgi nafis va kechki jozibali makiyaj uchun mukammal.",
      ru: "Кутюрная палетка из 9 высокопигментированных матовых, сатиновых и жемчужных оттенков для дневного и вечернего образа.",
      en: "Nine ultra-finely milled matte, satin, and pearl eyeshadows curated for effortless day-to-evening Parisian glamour."
    },
    notesOrIngredients: {
      uz: "Mikronizatsiyalangan marvarid kukuni, Marula yog'i, Talksiz formulasi.",
      ru: "Микронизированная жемчужная пудра, масло марулы, формула без талька.",
      en: "Micronized Pearl Powder, Cold-Pressed Marula Oil, Talc-Free Silk Binders."
    }
  },
  {
    id: 'eclat-06',
    name: 'Crème Royale Hydratation Intense',
    brand: 'LUMIÈRE DE SOIE',
    category: 'skincare',
    subCategory: 'moisturizers',
    price: 1490000,
    originalPrice: 1790000,
    rating: 4.9,
    reviewCount: 117,
    popularity: 94,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Glass Jar' },
      { label: '50 ml Eco-Refill' }
    ],
    descriptions: {
      uz: "Seramidlar va oq orkide ekstrakti bilan boyitilgan chuqur oziqlantiruvchi krem. Teri to'sig'ini tiklaydi va mayin baxmaldek tuyg'u qoldiradi.",
      ru: "Насыщенный восстанавливающий крем с церамидами и экстрактом белой орхидеи. Укрепляет защитный барьер и разглаживает микрорельеф.",
      en: "Sumptuous barrier-restoring cream enriched with bio-ceramides and white orchid extract for 48-hour cashmere softness."
    },
    notesOrIngredients: {
      uz: "Bio-Seramidlar NP/AP, Oq Orkide, Skvalan, Shea yog'i.",
      ru: "Био-церамиды NP/AP, Белая орхидея, Сквалан, Масло карите.",
      en: "Bio-Ceramides NP/AP, White Orchid Extract, Plant Squalane, Shea Butter."
    }
  },
  {
    id: 'eclat-07',
    name: 'Nuit d’Ambre & Vanille Noire Eau de Parfum',
    brand: 'PARFUMS DE GRASSE',
    category: 'perfume',
    subCategory: 'oriental',
    price: 2180000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 163,
    popularity: 96,
    isNew: true,
    isBestSeller: true,
    isSpecialOffer: false,
    fragranceNotes: ['Madagascar Vanilla', 'Warm Amber', 'Sandalwood'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Eau de Parfum' },
      { label: '100 ml Eau de Parfum' }
    ],
    descriptions: {
      uz: "Madagaskar burbon vanili, iliq ambra va sandal daraxti bilan yaratilgan jozibali kechki atir. Hashamatli oqshomlar uchun ideal hamroh.",
      ru: "Чувственный вечерний аромат с нотами мадагаскарской бурбонской ванили, теплой амбры и сандалового дерева.",
      en: "Sensual evening eau de parfum weaving Madagascar bourbon vanilla, golden ambergris, and Mysore sandalwood."
    },
    notesOrIngredients: {
      uz: "Yuqori: Pushti Qalampir, Mandarin • Yurak: Yasmin, Tonka Loviyasi • Baza: Burbon Vanil, Ambra, Sandal.",
      ru: "Верхние: Розовый перец, Мандарин • Сердце: Жасмин, Бобы тонка • База: Бурбонская ваниль, Амбра, Сандал.",
      en: "Top: Pink Pepper, Mandarin • Heart: Sambac Jasmine, Tonka Bean • Base: Bourbon Vanilla, Amber, Sandalwood."
    }
  },
  {
    id: 'eclat-08',
    name: 'Blush Soie Pétale Illuminateur',
    brand: 'OR & ROSE',
    category: 'makeup',
    subCategory: 'face',
    price: 620000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 79,
    popularity: 88,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Pétale de Rose', color: '#E39AA4' },
      { label: '02 Pêche Dorée', color: '#E6A188' },
      { label: '03 Mauve Velours', color: '#C47D8E' }
    ],
    descriptions: {
      uz: "Yonoqlarga tabiiy pushti jilo va mayin marvarid nurini baxsh etuvchi ipakdek rumyana. Teriga bir tekis yotadi va qatlamlash oson.",
      ru: "Шелковистые румяна-вуаль, придающие щекам свежий румянец и деликатное жемчужное подсвечивание.",
      en: "Silky micro-milled blush veil imparting a fresh petal flush and soft-focus pearl luminosity."
    },
    notesOrIngredients: {
      uz: "Atirgul mumi, Oq choy ekstrakti, Mineral pigmentlar.",
      ru: "Воск розы, экстракт белого чая, минеральные пигменты.",
      en: "Rose Flower Wax, White Tea Extract, Light-Diffusing Mineral Pigments."
    }
  },
  {
    id: 'eclat-09',
    name: 'Huile Lèvres Miroir Cristal',
    brand: 'ATELIER VELOURS',
    category: 'makeup',
    subCategory: 'lips',
    price: 460000,
    originalPrice: 540000,
    rating: 4.9,
    reviewCount: 192,
    popularity: 97,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Rose Cristal', color: '#F2BAC3' },
      { label: '02 Miel Doré', color: '#E5B98A' },
      { label: '03 Cerise Glacée', color: '#C95A6B' }
    ],
    descriptions: {
      uz: "Yopishmaydigan oynadek yaltiroq lab moyi. Kameliya va jojoba yog'lari lablarni chuqur oziqlantirib, hajmli ko'rinish beradi.",
      ru: "Нелипкое зеркальное масло для губ с маслами камелии и жожоба. Интенсивно питает и придает визуальный объем.",
      en: "Non-sticky mirror-shine lip oil enriched with camellia and jojoba oils to visibly plump and cushion lips."
    },
    notesOrIngredients: {
      uz: "Kameliya yog'i, Jojoba yog'i, Peptid kompleks, Shirin bodom moyi.",
      ru: "Масло камелии, масло жожоба, пептидный комплекс, масло сладкого миндаля.",
      en: "Camellia Seed Oil, Organic Jojoba Oil, Plumping Peptides, Sweet Almond Oil."
    }
  },
  {
    id: 'eclat-10',
    name: 'Essence Botanique Éclat Pur',
    brand: 'AURA BOTANICA',
    category: 'skincare',
    subCategory: 'cleansers',
    price: 780000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 68,
    popularity: 85,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '150 ml Flacon' },
      { label: '250 ml Flacon' }
    ],
    descriptions: {
      uz: "Atirgul gidrolati va fermentlangan guruch suvi asosidagi mayin tonik-essensiya. Terining pH muvozanatini tiklaydi va keyingi parvarishga tayyorlaydi.",
      ru: "Увлажняющая тоник-эссенция на основе гидролата розы и ферментированной рисовой воды. Восстанавливает pH-баланс и освежает.",
      en: "Soothing botanical essence crafted with damask rose hydrosol and fermented rice water to balance pH and prep skin."
    },
    notesOrIngredients: {
      uz: "Damask atirgul gidrolati 82%, Fermentlangan guruch ekstrakti, Pantenol.",
      ru: "Гидролат дамасской розы 82%, ферментированный экстракт риса, пантенол.",
      en: "82% Damask Rose Hydrosol, Fermented Rice Filtrate, Pro-Vitamin B5."
    }
  },
  {
    id: 'eclat-11',
    name: 'Jardin de Jasmin & Néroli Eau de Parfum',
    brand: 'PARFUMS DE GRASSE',
    category: 'perfume',
    subCategory: 'floral',
    price: 1920000,
    originalPrice: 2250000,
    rating: 4.8,
    reviewCount: 109,
    popularity: 90,
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: true,
    fragranceNotes: ['Neroli Blossom', 'White Jasmine', 'Cedarwood'],
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Eau de Parfum' },
      { label: '100 ml Eau de Parfum' }
    ],
    descriptions: {
      uz: "O'rta yer dengizi neroli gullari, tonggi yasmin va oq kedr yog'ochining musaffo va nafis uyg'unligi.",
      ru: "Свежая и утонченная симфония средиземноморского нероли, утреннего жасмина и белого кедра.",
      en: "Luminous floral eau de parfum capturing sunlit Mediterranean neroli, dew-kissed jasmine, and white cedar."
    },
    notesOrIngredients: {
      uz: "Yuqori: Tunis Neroli, Petitgreyn • Yurak: Yasmin Sambak, Apelsin guli • Baza: Oq Kedr, Musk.",
      ru: "Верхние: Тунисский нероли, петитгрейн • Сердце: Жасмин самбак, флердоранж • База: Белый кедр, мускус.",
      en: "Top: Tunisian Neroli, Petitgrain • Heart: Jasmine Sambac, Orange Blossom • Base: White Cedar, Skin Musk."
    }
  },
  {
    id: 'eclat-12',
    name: 'Baume Démaquillant Soie Pure',
    brand: 'AURA BOTANICA',
    category: 'skincare',
    subCategory: 'cleansers',
    price: 690000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 93,
    popularity: 87,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '100 ml Jar' }
    ],
    descriptions: {
      uz: "Suvga tekkanda mayin sutga aylanuvchi tozalovchi balzam. Eng chidamli makiyaj va SPF ni ham terini tortmasdan bir zumda eritadi.",
      ru: "Тающий очищающий бальзам, превращающийся в нежное молочко. Мгновенно растворяет даже стойкий макияж и SPF без сухости.",
      en: "Sorbet-to-milk cleansing balm that effortlessly melts waterproof makeup and SPF while leaving skin supple."
    },
    notesOrIngredients: {
      uz: "Kameliya moyi, Moychechak ekstrakti, E vitamini, O'simlik esterlari.",
      ru: "Масло камелии, экстракт ромашки, витамин Е, растительные эфиры.",
      en: "Japanese Camellia Oil, Blue Chamomile, Vitamin E, Botanical Esters."
    }
  },
  {
    id: 'eclat-13',
    name: 'Mascara Volume Couture Noir Intense',
    brand: 'ATELIER VELOURS',
    category: 'makeup',
    subCategory: 'eyes',
    price: 520000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 141,
    popularity: 93,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Noir Velours', color: '#1A1617' },
      { label: '02 Brun Cachemire', color: '#4B332D' }
    ],
    descriptions: {
      uz: "Kipriklarga panoramali hajm va qayrilma shakl beruvchi kutyur tush. Kastor moyi va pantenol kipriklarni mustahkamlaydi.",
      ru: "Кутюрная тушь для панорамного объема и изгиба ресниц. Обогащена касторовым маслом и пантенолом для ухода.",
      en: "Panoramic couture mascara delivering sculpted curl and feathery volume without clumping or smudging."
    },
    notesOrIngredients: {
      uz: "Organik kastor moyi, Pantenol B5, Karnauba mumi, Mineral qora pigment.",
      ru: "Органическое касторовое масло, пантенол B5, карнаубский воск, минеральный черный пигмент.",
      en: "Organic Castor Oil, Panthenol B5, Carnauba Wax, Deep Mineral Carbon."
    }
  },
  {
    id: 'eclat-14',
    name: 'Bois Impérial & Oud Blanc Extrait',
    brand: 'MAISON ÉCLAT',
    category: 'perfume',
    subCategory: 'woody',
    price: 2690000,
    originalPrice: 3150000,
    rating: 5.0,
    reviewCount: 88,
    popularity: 95,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: true,
    fragranceNotes: ['White Oud', 'Vetiver', 'Cardamom'],
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Extrait' },
      { label: '100 ml Extrait' }
    ],
    descriptions: {
      uz: "Oq ud, Gaiti vetiveri va kardamon ziravorining zamonaviy uniseks kompozitsiyasi. O'ziga ishongan va o'ziga xos uslub egalari uchun.",
      ru: "Современная унисекс-композиция с нотами белого уда, гаитянского ветивера и кардамона. Для ценителей редкой парфюмерии.",
      en: "Architectural unisex extrait uniting creamy white oud, Haitian vetiver, and crushed green cardamom."
    },
    notesOrIngredients: {
      uz: "Yuqori: Yashil Kardamon, Qora Murch • Yurak: Iris ildizi, Kiparis • Baza: Oq Ud, Vetiver, Kaşmeran.",
      ru: "Верхние: Зеленый кардамон, черный перец • Сердце: Корень ириса, кипарис • База: Белый уд, ветивер, кашмеран.",
      en: "Top: Green Cardamom, Black Pepper • Heart: Orris Butter, Cypress • Base: White Oud, Vetiver, Cashmeran."
    }
  },
  {
    id: 'eclat-15',
    name: 'Concentré Yeux Lift & Éclat',
    brand: 'LUMIÈRE DE SOIE',
    category: 'skincare',
    subCategory: 'serums',
    price: 1150000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 74,
    popularity: 86,
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '15 ml Cooling Tip' }
    ],
    descriptions: {
      uz: "Ko'z atrofidagi shishlar va charchoq izlarini bir zumda kamaytiruvchi kofein va peptidli sovutuvchi zardob.",
      ru: "Охлаждающая сыворотка для контура глаз с кофеином и пептидами против отечности и следов усталости.",
      en: "Cooling eye contour concentrate powered by pure caffeine and peptides to depuff and brighten tired eyes."
    },
    notesOrIngredients: {
      uz: "Sof Kofein 3%, Argirelin peptidi, Gialuron kislotasi, Ko'k choy ekstrakti.",
      ru: "Чистый кофеин 3%, пептид аргирелин, гиалуроновая кислота, экстракт зеленого чая.",
      en: "3% Pure Caffeine, Argireline Peptide, Hyaluronic Acid, Green Tea Polyphenols."
    }
  },
  {
    id: 'eclat-16',
    name: 'Poudre Libre Voile de Soie',
    brand: 'OR & ROSE',
    category: 'makeup',
    subCategory: 'face',
    price: 740000,
    originalPrice: 860000,
    rating: 4.9,
    reviewCount: 112,
    popularity: 91,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Translucent Pearl', color: '#F6ECE4' },
      { label: '02 Rose Ivory', color: '#EED6CF' }
    ],
    descriptions: {
      uz: "Terini silliqlovchi va makiyajni 16 soatgacha mustahkamlovchi o'ta mayin shaffof upa. Soft-focus effekti bilan poralarni sezdirmaydi.",
      ru: "Ультратонкая рассыпчатая пудра с эффектом мягкого фокуса. Фиксирует макияж до 16 часов и придает коже бархатистость.",
      en: "Weightless micro-refined loose powder with soft-focus spheres that blurs pores and sets makeup for 16 hours."
    },
    notesOrIngredients: {
      uz: "Ipak aminokislotalari, Guruch kraxmali, Gialuron kukuni.",
      ru: "Аминокислоты шелка, рисовый крахмал, гиалуроновая пудра.",
      en: "Silk Amino Acids, Ultra-Fine Rice Starch, Encapsulated Hyaluronic Powder."
    }
  },
  {
    id: 'eclat-17',
    name: 'Crème Nuit Régénérante Nectar',
    brand: 'AURA BOTANICA',
    category: 'skincare',
    subCategory: 'moisturizers',
    price: 1290000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 64,
    popularity: 84,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Jar' }
    ],
    descriptions: {
      uz: "Tungi uyqu davomida hujayralar yangilanishini tezlashtiruvchi bakuchiol va qirollik asali nektari bilan boyitilgan tungi krem.",
      ru: "Ночной восстанавливающий крем с бакучиолом и нектаром маточного молочка для обновления кожи во время сна.",
      en: "Overnight cellular renewal cream infused with plant-based bakuchiol and royal honey nectar for plump morning skin."
    },
    notesOrIngredients: {
      uz: "Bakuchiol 1%, Qirollik asali nektari, Skvalan, Bisabolol.",
      ru: "Бакучиол 1%, нектар маточного молочка, сквалан, бисаболол.",
      en: "1% Pure Bakuchiol, Royal Honey Nectar, Olive Squalane, Bisabolol."
    }
  },
  {
    id: 'eclat-18',
    name: 'Pétales de Pivoine & Musc Blanc EDP',
    brand: 'MAISON ÉCLAT',
    category: 'perfume',
    subCategory: 'floral',
    price: 1850000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 155,
    popularity: 94,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: false,
    fragranceNotes: ['Pink Peony', 'Lychee', 'White Musk'],
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Eau de Parfum' },
      { label: '100 ml Eau de Parfum' }
    ],
    descriptions: {
      uz: "Pushti pion gulbarglari, shirali lichi va toza oq mushkning romantik va nazokatli ifori. Kundalik hashamat ramzi.",
      ru: "Романтичный и нежный аромат лепестков розового пиона, сочного личи и чистого белого мускуса.",
      en: "Romantic, airy eau de parfum celebrating dewy pink peony petals, crisp lychee, and clean white musk."
    },
    notesOrIngredients: {
      uz: "Yuqori: Lichi, Pushti Greypfrut • Yurak: Pushti Pion, May Atirguli • Baza: Oq Mushk, Kaşmir yog'ochi.",
      ru: "Верхние: Личи, розовый грейпфрут • Сердце: Розовый пион, майская роза • База: Белый мускус, кашемировое дерево.",
      en: "Top: Crisp Lychee, Pink Grapefruit • Heart: Pink Peony, May Rose • Base: White Musk, Cashmere Wood."
    }
  },
  {
    id: 'eclat-19',
    name: 'Enlumineur Liquide Gouttes d’Or',
    brand: 'OR & ROSE',
    category: 'makeup',
    subCategory: 'face',
    price: 590000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 91,
    popularity: 89,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Champagne Glow', color: '#EED1B8' },
      { label: '02 Rose Gold', color: '#E3B2AE' }
    ],
    descriptions: {
      uz: "Yonoq suyaklari va dekoltega suyuq marvarid jilosini beruvchi xaylayter tomchilari. Tonal kremga aralashtirish ham mumkin.",
      ru: "Жидкий хайлайтер-капли с эффектом жидкого жемчуга. Можно наносить точечно или смешивать с тональным кремом.",
      en: "Liquid pearl illuminating drops for a lit-from-within champagne sheen on cheekbones and collarbones."
    },
    notesOrIngredients: {
      uz: "Suyuq marvarid mikro-zarralari, Atirgul suvi, Gialuron kislotasi.",
      ru: "Жидкие жемчужные микрочастицы, розовая вода, гиалуроновая кислота.",
      en: "Liquid Pearl Micro-Pigments, Damask Rose Water, Hyaluronic Acid."
    }
  },
  {
    id: 'eclat-20',
    name: 'Mousse Nettoyante Velours Rose',
    brand: 'LUMIÈRE DE SOIE',
    category: 'skincare',
    subCategory: 'cleansers',
    price: 560000,
    originalPrice: 660000,
    rating: 4.7,
    reviewCount: 77,
    popularity: 83,
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '150 ml Pump' }
    ],
    descriptions: {
      uz: "Aminokislotalar va atirgul ekstrakti asosidagi bulutdek mayin yuvish ko'pigi. Terini quritmasdan chuqur tozalaydi.",
      ru: "Воздушная очищающая пенка-мусс на основе аминокислот и экстракта розы. Деликатно очищает без ощущения стянутости.",
      en: "Cloud-like amino acid cleansing foam enriched with French rose extract to purify without stripping moisture."
    },
    notesOrIngredients: {
      uz: "Ipak aminokislotalari, Fransuz atirgul ekstrakti, Allantoin.",
      ru: "Аминокислоты шелка, экстракт французской розы, аллантоин.",
      en: "Silk Amino Acids, French Rose Extract, Soothing Allantoin."
    }
  },
  {
    id: 'eclat-21',
    name: 'Crayon Lèvres Sculptant Velours',
    brand: 'ATELIER VELOURS',
    category: 'makeup',
    subCategory: 'lips',
    price: 380000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 105,
    popularity: 88,
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Nude Pétale', color: '#C6888A' },
      { label: '02 Cannelle', color: '#A5635D' },
      { label: '03 Carmin', color: '#9D2B3A' }
    ],
    descriptions: {
      uz: "Lab konturini aniq chizuvchi va lab bo'yog'ining oqib ketishini oldini oluvchi suvga chidamli kremli qalam.",
      ru: "Водостойкий кремовый карандаш для идеального скульптурирования контура губ и продления стойкости помады.",
      en: "Waterproof velvet lip liner that effortlessly sculpts lip contours and prevents feathering all day."
    },
    notesOrIngredients: {
      uz: "Jojoba mumi, Shi yog'i, E vitamini.",
      ru: "Воск жожоба, масло ши, витамин Е.",
      en: "Jojoba Wax, Shea Butter, Antioxidant Vitamin E."
    }
  },
  {
    id: 'eclat-22',
    name: 'Cuir & Santal Royal Eau de Parfum',
    brand: 'PARFUMS DE GRASSE',
    category: 'perfume',
    subCategory: 'woody',
    price: 2350000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 73,
    popularity: 89,
    isNew: true,
    isBestSeller: false,
    isSpecialOffer: false,
    fragranceNotes: ['Suede Leather', 'Sandalwood', 'Iris'],
    images: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '50 ml Eau de Parfum' },
      { label: '100 ml Eau de Parfum' }
    ],
    descriptions: {
      uz: "Mayin zamsha, avstraliyalik sandal daraxti va Florentsiya irisining aristokratik uyg'unligi.",
      ru: "Аристократическое сочетание бархатной замши, австралийского сандала и флорентийского ириса.",
      en: "Aristocratic blend of supple suede leather, creamy Australian sandalwood, and Florentine iris."
    },
    notesOrIngredients: {
      uz: "Yuqori: Bergamot, Binafsha bargi • Yurak: Florentsiya Irisi, Zamsha • Baza: Sandal, Benzoin.",
      ru: "Верхние: Бергамот, лист фиалки • Сердце: Флорентийский ирис, замша • База: Сандал, бензоин.",
      en: "Top: Bergamot, Violet Leaf • Heart: Florentine Iris, Suede • Base: Sandalwood, Benzoin."
    }
  },
  {
    id: 'eclat-23',
    name: 'Eyeliner Calligraphie Noir Couture',
    brand: 'MAISON ÉCLAT',
    category: 'makeup',
    subCategory: 'eyes',
    price: 440000,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 62,
    popularity: 82,
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: false,
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: '01 Intense Black', color: '#141213' }
    ],
    descriptions: {
      uz: "O'ta ingichka kalligrafik uchli suvga chidamli layner. Bir harakatda aniq va jozibali chiziq tortish imkonini beradi.",
      ru: "Водостойкая подводка-каллиграф с ультратонким фетровым наконечником для безупречных стрелок одним движением.",
      en: "Ultra-precise calligraphy liquid liner delivering waterproof satin-black wings in a single stroke."
    },
    notesOrIngredients: {
      uz: "Bo'tako'z ekstrakti, Suvga chidamli polimerlar, Oftalmologik sinovdan o'tgan.",
      ru: "Экстракт василька, водостойкие полимеры, протестировано офтальмологами.",
      en: "Cornflower Soothing Extract, Waterproof Film-Formers, Ophthalmologist Tested."
    }
  },
  {
    id: 'eclat-24',
    name: 'Coffret Rituel Éclat Absolu (3-Piece Set)',
    brand: 'MAISON ÉCLAT',
    category: 'skincare',
    subCategory: 'moisturizers',
    price: 2590000,
    originalPrice: 3250000,
    rating: 5.0,
    reviewCount: 119,
    popularity: 98,
    isNew: false,
    isBestSeller: true,
    isSpecialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85'
    ],
    variants: [
      { label: 'Couture Gift Box' }
    ],
    descriptions: {
      uz: "Maison Éclat ning uchta afsonaviy parvarish vositasidan iborat hashamatli sovg'a to'plami: Zardob 30ml, Krem 50ml va Tonik-Essensiya 150ml.",
      ru: "Роскошный подарочный сет из трех бестселлеров Maison Éclat: Сыворотка 30мл, Крем 50мл и Тоник-эссенция 150мл.",
      en: "Signature couture gift coffret uniting three Maison Éclat icons: Gold Serum 30ml, Royal Cream 50ml, and Rose Essence 150ml."
    },
    notesOrIngredients: {
      uz: "To'liq 3 bosqichli yoshartiruvchi va namlantiruvchi kompleks.",
      ru: "Полный 3-ступенчатый омолаживающий и увлажняющий ритуал.",
      en: "Complete 3-Step Cellular Hydration & Luminosity Ritual."
    }
  }
];

// ============================================================================
// 4. INITIAL CUSTOMER REVIEWS
// ============================================================================
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Nilufar Abdullayeva',
    city: 'Toshkent',
    productName: 'Élixir Rose & Safran Extrait de Parfum',
    rating: 5,
    date: '2026-11-10',
    comment: {
      uz: "Aql bovar qilmaydigan darajada nafis va uzoq saqlanuvchi ifor! Qadoqlanishi ham xuddi Parij butiklaridek hashamatli. Toshkent bo'ylab 2 soatda yetkazib berishdi.",
      ru: "Невероятно благородный и стойкий аромат! Упаковка как в парижских бутиках, доставили по Ташкенту за 2 часа.",
      en: "Unbelievably refined and long-lasting fragrance! The couture packaging feels straight out of Paris, and Tashkent delivery took just 2 hours."
    }
  },
  {
    id: 'rev-2',
    name: 'Madina Tursunova',
    city: 'Samarqand',
    productName: 'Sérum Cellular Or 24K Concentré',
    rating: 5,
    date: '2026-11-04',
    comment: {
      uz: "Ikki haftadan beri ishlatyapman — terim yanada tiniq, silliq va yorqin bo'lib qoldi. Makiyaj ostidan ham juda yengil va tekis yotadi.",
      ru: "Использую две недели — кожа стала заметно более сияющей, гладкой и увлажненной. Идеально ложится под макияж.",
      en: "Been using this serum for two weeks—my skin looks visibly brighter, smoother, and deeply hydrated even under makeup."
    }
  },
  {
    id: 'rev-3',
    name: 'Kamola Rakhimova',
    city: 'Toshkent',
    productName: 'Rouge Velours Couture Lipstick',
    rating: 5,
    date: '2026-10-28',
    comment: {
      uz: "01 Rose Cachemire rangi har qanday obrazga mos tushadi. Lablarni umuman quritmaydi, baxmaldek mayin tuyg'u beradi.",
      ru: "Оттенок 01 Rose Cachemire подходит абсолютно ко всему. Совершенно не сушит губы, ощущение настоящего бархата.",
      en: "Shade 01 Rose Cachemire flatters every look. Zero dryness—just pure weightless velvet comfort all day."
    }
  }
];

const UZBEK_CITIES = [
  'Toshkent',
  'Samarqand',
  'Buxoro',
  'Farg‘ona',
  'Namangan',
  'Andijon',
  'Navoiy',
  'Qarshi',
  'Urganch',
  'Nukus'
];

// Helper to format Uzbek Soums cleanly: e.g. 1 450 000 UZS
function formatUZS(amount) {
  return `${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} UZS`;
}

// ============================================================================
// 5. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Persistent States (Language default: 'uz', Theme default: 'light')
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('maison_eclat_lang') || 'uz';
    } catch {
      return 'uz';
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('maison_eclat_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_eclat_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_eclat_wishlist');
      return saved ? JSON.parse(saved) : ['eclat-02', 'eclat-03'];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_eclat_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // UI & Interactive States
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // all | makeup | skincare | perfume
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // popular | price-asc | price-desc | rating

  // Section-specific sub-category tabs
  const [makeupTab, setMakeupTab] = useState('all');
  const [skincareTab, setSkincareTab] = useState('all');

  // Drawers, Modals & Overlays
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [modalVariantIdx, setModalVariantIdx] = useState(0);
  const [modalQty, setModalQty] = useState(1);
  const [modalTab, setModalTab] = useState('desc');

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart Promo & Checkout Flow
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [promoFeedback, setPromoFeedback] = useState('');
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'form' | 'success'
  const [orderNumber, setOrderNumber] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '+998 ',
    city: 'Toshkent',
    address: '',
    payment: 'Payme'
  });
  const [checkoutErrors, setCheckoutErrors] = useState({});

  // Countdown Timer State (Special Offers)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    mins: 38,
    secs: 45
  });
  const [copiedCode, setCopiedCode] = useState(false);

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    name: '',
    productName: PRODUCTS[0].name,
    rating: 5,
    comment: ''
  });

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // 'success' | 'error'

  // Toast Notification Queue
  const [toasts, setToasts] = useState([]);

  const catalogRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maison_eclat_lang', lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_eclat_theme', darkMode ? 'dark' : 'light');
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_eclat_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_eclat_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_eclat_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  // Live Countdown Timer for Special Offers
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return { days: 2, hours: 12, mins: 0, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance Hero Spotlight softly every 6 seconds
  const heroProducts = useMemo(() => [PRODUCTS[1], PRODUCTS[2], PRODUCTS[0]], []);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [heroProducts.length]);

  // Toast helper
  const showToast = (message, type = 'default') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  };

  // Cart Actions
  const addToCart = (product, qty = 1, variantLabel = null) => {
    const chosenVariant = variantLabel || (product.variants?.[0]?.label ?? 'Standard');
    const cartKey = `${product.id}::${chosenVariant}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.images[0],
          variant: chosenVariant,
          quantity: qty
        }
      ];
    });

    showToast(`${product.name} — ${t.product.addedToast}`);
  };

  const updateCartQty = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  // Wishlist Toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`${product.name} — ${t.product.wishRemovedToast}`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`${product.name} — ${t.product.wishAddedToast}`);
        return [...prev, product.id];
      }
    });
  };

  // Open Product Detail Modal
  const openProductModal = (product) => {
    setActiveProductModal(product);
    setModalImageIdx(0);
    setModalVariantIdx(0);
    setModalQty(1);
    setModalTab('desc');
  };

  // Filtered & Sorted Catalog Products
  const filteredCatalogProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (onlyDiscounted && !p.originalPrice) return false;
      if (onlyNew && !p.isNew) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inBrand = p.brand.toLowerCase().includes(q);
        const inDesc = (p.descriptions[lang] || p.descriptions.en).toLowerCase().includes(q);
        const inNotes = p.fragranceNotes
          ? p.fragranceNotes.some((n) => n.toLowerCase().includes(q))
          : false;
        if (!inName && !inBrand && !inDesc && !inNotes) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.popularity - a.popularity;
    });
  }, [selectedCategory, selectedBrand, onlyDiscounted, onlyNew, searchQuery, sortBy, lang]);

  // Curated Section Lists
  const newArrivalsList = useMemo(() => PRODUCTS.filter((p) => p.isNew).slice(0, 4), []);
  const bestSellersList = useMemo(() => PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4), []);
  const makeupList = useMemo(() => {
    const items = PRODUCTS.filter((p) => p.category === 'makeup');
    if (makeupTab === 'all') return items.slice(0, 4);
    return items.filter((p) => p.subCategory === makeupTab);
  }, [makeupTab]);
  const skincareList = useMemo(() => {
    const items = PRODUCTS.filter((p) => p.category === 'skincare');
    if (skincareTab === 'all') return items.slice(0, 4);
    return items.filter((p) => p.subCategory === skincareTab);
  }, [skincareTab]);
  const perfumesList = useMemo(() => PRODUCTS.filter((p) => p.category === 'perfume'), []);
  const specialOffersList = useMemo(
    () => PRODUCTS.filter((p) => p.isSpecialOffer && p.originalPrice).slice(0, 4),
    []
  );

  // Cart Totals Calculations
  const totalCartItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const FREE_SHIPPING_THRESHOLD = 1000000;
  const promoDiscountAmount = appliedPromo ? Math.round(cartSubtotal * 0.2) : 0;
  const afterDiscount = cartSubtotal - promoDiscountAmount;
  const deliveryFee = afterDiscount >= FREE_SHIPPING_THRESHOLD || cart.length === 0 ? 0 : 45000;
  const cartGrandTotal = afterDiscount + deliveryFee;

  // Apply Promo Code Handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'ECLAT20') {
      setAppliedPromo(true);
      setPromoFeedback(t.cart.promoApplied);
    } else {
      setAppliedPromo(false);
      setPromoFeedback(t.cart.promoInvalid);
    }
  };

  // Copy Promo Code in Offers Section
  const handleCopyPromoCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('ECLAT20').catch(() => {});
    }
    setCopiedCode(true);
    setPromoInput('ECLAT20');
    setAppliedPromo(true);
    showToast('ECLAT20 — ' + t.sections.offers.copied);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Filter by Brand and Scroll to Catalog
  const handleSelectBrand = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedCategory('all');
    setOnlyDiscounted(false);
    setOnlyNew(false);
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Checkout Validation & Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errors = {};
    if (checkoutForm.fullName.trim().length < 3) {
      errors.fullName = t.checkout.errors.name;
    }
    const cleanDigits = checkoutForm.phone.replace(/\D/g, '');
    if (cleanDigits.length < 12) {
      errors.phone = t.checkout.errors.phone;
    }
    if (checkoutForm.address.trim().length < 6) {
      errors.address = t.checkout.errors.address;
    }

    setCheckoutErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const generatedOrder = `ME-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep('success');
    setCart([]);
    setAppliedPromo(false);
    setPromoInput('');
    setPromoFeedback('');
  };

  // Submit New Customer Review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: reviewForm.name.trim(),
      city: 'Toshkent',
      productName: reviewForm.productName,
      rating: reviewForm.rating,
      date: new Date().toISOString().split('T')[0],
      comment: {
        uz: reviewForm.comment.trim(),
        ru: reviewForm.comment.trim(),
        en: reviewForm.comment.trim()
      }
    };

    setReviews((prev) => [newRev, ...prev]);
    setReviewForm({ name: '', productName: PRODUCTS[0].name, rating: 5, comment: '' });
    showToast(t.sections.reviews.reviewAdded);
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  // Smooth Scroll to Section Helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ============================================================================
  // REUSABLE LUXURY PRODUCT CARD COMPONENT
  // ============================================================================
  const ProductCard = ({ product, showNotes = false }) => {
    const isWished = wishlist.includes(product.id);
    const discountPercent = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return (
      <div
        className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 border ${
          darkMode
            ? 'bg-[#1B1619] border-[#2E262B] hover:border-[#C98A91]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]'
            : 'bg-white border-[#EAE1D8] hover:border-[#C98A91]/70 hover:shadow-[0_20px_50px_rgba(140,98,104,0.12)]'
        }`}
      >
        {/* Image Frame */}
        <div
          onClick={() => openProductModal(product)}
          className={`relative aspect-[4/5] overflow-hidden cursor-pointer ${
            darkMode ? 'bg-[#241D21]' : 'bg-[#F5EFE8]'
          }`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discountPercent > 0 && (
              <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-[#B85D68] text-white shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.isNew && (
              <span
                className={`px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-full backdrop-blur-md ${
                  darkMode
                    ? 'bg-[#120F11]/80 text-[#E8C5C8] border border-[#E8C5C8]/30'
                    : 'bg-white/90 text-[#221D1E] border border-[#E4D8CE]'
                }`}
              >
                {t.product.newBadge}
              </span>
            )}
            {product.isBestSeller && !product.isNew && (
              <span
                className={`px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-full backdrop-blur-md ${
                  darkMode
                    ? 'bg-[#2B2226]/85 text-[#E5C185] border border-[#E5C185]/30'
                    : 'bg-[#FAF7F2]/90 text-[#8A6240] border border-[#E2D3C1]'
                }`}
              >
                {t.product.bestBadge}
              </span>
            )}
          </div>

          {/* Top Right Wishlist Button */}
          <button
            type="button"
            aria-label="Toggle Wishlist"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              isWished
                ? 'bg-[#C98A91] text-white scale-105 shadow-md'
                : darkMode
                ? 'bg-[#120F11]/70 text-[#F7F2EE] hover:bg-[#C98A91] hover:text-white'
                : 'bg-white/85 text-[#221D1E] hover:bg-[#C98A91] hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
          </button>

          {/* Subtle Hover Quick View Pill */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openProductModal(product);
              }}
              className={`w-full py-2 px-3 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 backdrop-blur-md shadow-lg transition-colors ${
                darkMode
                  ? 'bg-[#120F11]/85 text-[#F7F2EE] border border-white/10 hover:bg-[#261F23]'
                  : 'bg-white/92 text-[#221D1E] border border-[#EAE1D8] hover:bg-[#FAF7F2]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#C98A91]" />
              {t.product.quickView}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C98A91]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-[#D9A760] text-[#D9A760]" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className={darkMode ? 'text-[#8F8084]' : 'text-[#8C7E81]'}>
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <h3
            onClick={() => openProductModal(product)}
            className="font-serif text-lg sm:text-xl font-semibold leading-snug cursor-pointer hover:text-[#C98A91] transition-colors line-clamp-2 mb-2"
          >
            {product.name}
          </h3>

          {/* Shade Swatches or Olfactory Notes */}
          {showNotes && product.fragranceNotes ? (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.fragranceNotes.map((note) => (
                <span
                  key={note}
                  className={`text-[11px] px-2 py-0.5 rounded-full border ${
                    darkMode
                      ? 'bg-[#251E22] border-[#382E34] text-[#D4C3C7]'
                      : 'bg-[#FAF7F2] border-[#E7DDD3] text-[#6D5F62]'
                  }`}
                >
                  {note}
                </span>
              ))}
            </div>
          ) : (
            product.variants &&
            product.variants[0]?.color && (
              <div className="flex items-center gap-1.5 mb-3">
                {product.variants.map((v) => (
                  <span
                    key={v.label}
                    title={v.label}
                    className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                    style={{ backgroundColor: v.color }}
                  />
                ))}
                <span className={`text-[11px] ml-1 ${darkMode ? 'text-[#9B8B8F]' : 'text-[#8A7B7E]'}`}>
                  {product.variants.length} shades
                </span>
              </div>
            )
          )}

          {/* Price & Add to Bag CTA pushed to bottom */}
          <div className="mt-auto pt-3 border-t border-dashed border-[#C98A91]/25 flex items-center justify-between gap-2">
            <div>
              {product.originalPrice && (
                <div
                  className={`text-xs line-through ${
                    darkMode ? 'text-[#8A7A7E]' : 'text-[#9E8F92]'
                  }`}
                >
                  {formatUZS(product.originalPrice)}
                </div>
              )}
              <div className="text-sm sm:text-base font-bold tracking-tight">
                {formatUZS(product.price)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="px-3.5 py-2.5 rounded-xl bg-[#C98A91] hover:bg-[#B6737B] active:scale-95 text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.product.addToCart}</span>
              <Plus className="w-3.5 h-3.5 sm:hidden" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER MAIN LUXURY STOREFRONT
  // ============================================================================
  const currentHeroProduct = heroProducts[heroIndex];
  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlist.includes(p.id)),
    [wishlist]
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#C98A91] selection:text-white ${
        darkMode ? 'bg-[#120F11] text-[#F7F2EE]' : 'bg-[#FAF7F2] text-[#221D1E]'
      }`}
    >
      {/* Embedded Google Fonts, Custom Animations & Glassmorphism Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .animate-fade-up {
          animation: fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Custom Luxury Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#120F11' : '#FAF7F2'};
        }
        ::-webkit-scrollbar-thumb {
          background: #C98A91;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #B37078;
        }
      `}</style>

      {/* ====================================================================
          TOP ANNOUNCEMENT RIBBON
      ==================================================================== */}
      <div
        className={`text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide border-b transition-colors ${
          darkMode
            ? 'bg-[#1C161A] text-[#E8C5C8] border-[#2E262B]'
            : 'bg-[#EFE6DC] text-[#4B3F42] border-[#E4D8CC]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C98A91] shrink-0" />
          <span>{t.announcement}</span>
        </div>
      </div>

      {/* ====================================================================
          STICKY GLASSMORPHISM NAVIGATION HEADER
      ==================================================================== */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
          darkMode
            ? 'bg-[#120F11]/85 border-[#2E262B]'
            : 'bg-[#FAF7F2]/88 border-[#EAE0D5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Button & Brand Crest */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2.5 rounded-xl border ${
                  darkMode
                    ? 'border-[#2E262B] hover:bg-[#1E181C]'
                    : 'border-[#E5DBD1] hover:bg-[#EFE6DC]'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>

              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col group"
              >
                <span className="font-serif text-2xl sm:text-[28px] font-bold tracking-[0.14em] leading-none">
                  MAISON ÉCLAT
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#C98A91] mt-1">
                  Haute Beauté & Parfumerie
                </span>
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.12em]">
              <button
                type="button"
                onClick={() => scrollToSection('catalog-section')}
                className="hover:text-[#C98A91] transition-colors"
              >
                {t.nav.catalog}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('new-arrivals')}
                className="hover:text-[#C98A91] transition-colors"
              >
                {t.nav.newArrivals}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('makeup-section')}
                className="hover:text-[#C98A91] transition-colors"
              >
                {t.nav.makeup}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('skincare-section')}
                className="hover:text-[#C98A91] transition-colors"
              >
                {t.nav.skincare}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('perfumes-section')}
                className="hover:text-[#C98A91] transition-colors"
              >
                {t.nav.perfumes}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('offers-section')}
                className="text-[#C98A91] hover:opacity-80 transition-opacity"
              >
                {t.nav.offers}
              </button>
            </nav>

            {/* Right: Language Switcher, Theme Toggle, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Selector Pills (UZ / RU / EN) */}
              <div
                className={`hidden sm:flex items-center p-1 rounded-full border text-[11px] font-semibold ${
                  darkMode
                    ? 'bg-[#1B1619] border-[#2E262B]'
                    : 'bg-[#EFE6DC]/80 border-[#E2D6CA]'
                }`}
              >
                {['uz', 'ru', 'en'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                      lang === code
                        ? 'bg-[#C98A91] text-white shadow-sm'
                        : darkMode
                        ? 'text-[#B7A9AC] hover:text-white'
                        : 'text-[#6D5F62] hover:text-[#221D1E]'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              {/* Dark / Light Mode Toggle */}
              <button
                type="button"
                aria-label="Toggle Theme"
                onClick={() => setDarkMode((prev) => !prev)}
                className={`p-2.5 rounded-full border transition-all ${
                  darkMode
                    ? 'bg-[#1B1619] border-[#2E262B] text-[#E5C185] hover:border-[#C98A91]'
                    : 'bg-white border-[#E5DBD1] text-[#5C4E51] hover:border-[#C98A91]'
                }`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label="Wishlist"
                onClick={() => setWishlistOpen(true)}
                className={`relative p-2.5 rounded-full border transition-all ${
                  darkMode
                    ? 'bg-[#1B1619] border-[#2E262B] hover:border-[#C98A91]'
                    : 'bg-white border-[#E5DBD1] hover:border-[#C98A91]'
                }`}
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C98A91] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                aria-label="Shopping Bag"
                onClick={() => {
                  setCheckoutStep('cart');
                  setCartOpen(true);
                }}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">
                  {totalCartItems > 0 ? formatUZS(cartSubtotal) : '0 UZS'}
                </span>
                <span className="w-5 h-5 rounded-full bg-white text-[#221D1E] text-[11px] font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              </button>
            </div>
          </div>

          {/* Integrated Quick Search Bar Row */}
          <div className="pb-3.5">
            <div className="relative max-w-2xl mx-auto">
              <Search className="w-4 h-4 text-[#C98A91] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && catalogRef.current) {
                    catalogRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder={t.searchPlaceholder}
                className={`w-full pl-11 pr-10 py-2.5 rounded-full text-sm border outline-none transition-all ${
                  darkMode
                    ? 'bg-[#1B1619] border-[#2E262B] text-[#F7F2EE] placeholder-[#8E7F83] focus:border-[#C98A91]'
                    : 'bg-white border-[#E4D9CE] text-[#221D1E] placeholder-[#948588] focus:border-[#C98A91] shadow-xs'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#948588] hover:text-[#C98A91]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          SECTION 1: PREMIUM EDITORIAL HERO SHOWCASE
      ==================================================================== */}
      <section
        id="top"
        className={`relative overflow-hidden border-b ${
          darkMode
            ? 'bg-gradient-to-br from-[#120F11] via-[#1A1418] to-[#23191E] border-[#2E262B]'
            : 'bg-gradient-to-br from-[#FAF7F2] via-[#F4ECE3] to-[#EFE1DC] border-[#E7DCD1]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C98A91]/40 bg-[#C98A91]/10 text-[#C98A91] text-[11px] font-semibold tracking-[0.2em] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hero.eyebrow}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.06] tracking-tight">
                {t.hero.titleLine1}{' '}
                <span className="italic font-normal text-[#C98A91] block sm:inline">
                  {t.hero.titleLine2}
                </span>
              </h1>

              <p
                className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                  darkMode ? 'text-[#C6B8BB]' : 'text-[#5E5154]'
                }`}
              >
                {t.hero.subtitle}
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('catalog-section')}
                  className="px-7 py-4 rounded-full bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] flex items-center gap-2.5 shadow-lg shadow-[#C98A91]/25 transition-all active:scale-95"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('offers-section')}
                  className={`px-7 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] border transition-all ${
                    darkMode
                      ? 'border-[#3A2F35] bg-[#1B1619]/80 text-[#F7F2EE] hover:border-[#C98A91]'
                      : 'border-[#D9CBC0] bg-white/80 text-[#221D1E] hover:border-[#C98A91]'
                  }`}
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>

              {/* Luxury Trust Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#C98A91]/20">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#C98A91] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">{t.hero.trust1Title}</div>
                    <div className={`text-[11px] ${darkMode ? 'text-[#9B8B8F]' : 'text-[#7C6D70]'}`}>
                      {t.hero.trust1Sub}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Truck className="w-5 h-5 text-[#C98A91] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">{t.hero.trust2Title}</div>
                    <div className={`text-[11px] ${darkMode ? 'text-[#9B8B8F]' : 'text-[#7C6D70]'}`}>
                      {t.hero.trust2Sub}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-[#C98A91] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">{t.hero.trust3Title}</div>
                    <div className={`text-[11px] ${darkMode ? 'text-[#9B8B8F]' : 'text-[#7C6D70]'}`}>
                      {t.hero.trust3Sub}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Large Luxury Product Imagery + Interactive Spotlight Switcher */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg">
                {/* Main Arch / Editorial Frame */}
                <div
                  onClick={() => openProductModal(currentHeroProduct)}
                  className={`relative aspect-[4/5] rounded-t-[180px] rounded-b-3xl overflow-hidden cursor-pointer border-2 shadow-2xl transition-all duration-700 ${
                    darkMode ? 'border-[#382D33]' : 'border-white'
                  }`}
                >
                  <img
                    src={currentHeroProduct.images[0]}
                    alt={currentHeroProduct.name}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* Bottom Editorial Caption inside Hero Image */}
                  <div className="absolute bottom-5 inset-x-5 text-white">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#F2CFD3] mb-1">
                      {t.hero.spotlightLabel} • {currentHeroProduct.brand}
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                          {currentHeroProduct.name}
                        </h2>
                        <div className="text-sm font-semibold text-[#F6DCE0] mt-1">
                          {formatUZS(currentHeroProduct.price)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(currentHeroProduct, 1);
                        }}
                        className="px-4 py-2.5 rounded-full bg-white text-[#221D1E] hover:bg-[#FAF7F2] text-xs font-semibold flex items-center gap-1.5 shadow-lg shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C98A91]" />
                        <span>{t.product.addToCart}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphism Rating Card */}
                <div
                  className={`hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-xl absolute -left-8 top-14 animate-float-slow ${
                    darkMode
                      ? 'bg-[#1B1619]/85 border-white/10 text-[#F7F2EE]'
                      : 'bg-white/88 border-white text-[#221D1E]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#C98A91]/20 flex items-center justify-center text-[#C98A91]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <span>4.9 / 5.0</span>
                      <Star className="w-3.5 h-3.5 fill-[#D9A760] text-[#D9A760]" />
                    </div>
                    <div className={`text-[11px] ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
                      12,400+ Luxury Clients
                    </div>
                  </div>
                </div>

                {/* Spotlight Thumbnail Switcher Pills */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  {heroProducts.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHeroIndex(idx)}
                      className={`flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full border transition-all ${
                        heroIndex === idx
                          ? 'border-[#C98A91] bg-[#C98A91]/15 scale-105'
                          : darkMode
                          ? 'border-[#2E262B] bg-[#1B1619]/70 opacity-70 hover:opacity-100'
                          : 'border-[#E3D7CC] bg-white/80 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-xs font-medium truncate max-w-[110px]">
                        {item.brand}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: NEW ARRIVALS
      ==================================================================== */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
              {t.sections.newArrivals.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
              {t.sections.newArrivals.title}
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
              {t.sections.newArrivals.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOnlyNew(true);
              setSelectedCategory('all');
              setSelectedBrand('all');
              scrollToSection('catalog-section');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#C98A91] hover:underline self-start md:self-auto"
          >
            <span>{t.nav.catalog}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: BEST SELLERS
      ==================================================================== */}
      <section
        className={`py-16 lg:py-20 border-y ${
          darkMode ? 'bg-[#171215] border-[#2E262B]' : 'bg-[#F4EDE4] border-[#E7DCD1]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
              {t.sections.bestSellers.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
              {t.sections.bestSellers.title}
            </h2>
            <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
              {t.sections.bestSellers.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellersList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: MAKEUP COLLECTION (WITH INTERACTIVE SUB-TABS)
      ==================================================================== */}
      <section id="makeup-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
              {t.sections.makeup.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
              {t.sections.makeup.title}
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
              {t.sections.makeup.subtitle}
            </p>
          </div>

          {/* Makeup Subcategory Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['all', 'lips', 'face', 'eyes'].map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setMakeupTab(tabKey)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                  makeupTab === tabKey
                    ? 'bg-[#C98A91] text-white border-[#C98A91] shadow-sm'
                    : darkMode
                    ? 'bg-[#1B1619] border-[#2E262B] text-[#C8B9BC] hover:border-[#C98A91]'
                    : 'bg-white border-[#E4D9CE] text-[#5E5154] hover:border-[#C98A91]'
                }`}
              >
                {t.sections.makeup.tabs[tabKey]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {makeupList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: SKINCARE COLLECTION (WITH INTERACTIVE SUB-TABS)
      ==================================================================== */}
      <section
        id="skincare-section"
        className={`py-16 lg:py-20 border-y ${
          darkMode ? 'bg-[#171215] border-[#2E262B]' : 'bg-[#F4EDE4] border-[#E7DCD1]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
                {t.sections.skincare.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
                {t.sections.skincare.title}
              </h2>
              <p className={`text-sm sm:text-base mt-2 max-w-xl ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
                {t.sections.skincare.subtitle}
              </p>
            </div>

            {/* Skincare Subcategory Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', 'serums', 'moisturizers', 'cleansers'].map((tabKey) => (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setSkincareTab(tabKey)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                    skincareTab === tabKey
                      ? 'bg-[#C98A91] text-white border-[#C98A91] shadow-sm'
                      : darkMode
                      ? 'bg-[#1B1619] border-[#2E262B] text-[#C8B9BC] hover:border-[#C98A91]'
                      : 'bg-white border-[#E4D9CE] text-[#5E5154] hover:border-[#C98A91]'
                  }`}
                >
                  {t.sections.skincare.tabs[tabKey]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skincareList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6: PERFUMES — HAUTE PARFUMERIE
      ==================================================================== */}
      <section id="perfumes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
            {t.sections.perfumes.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
            {t.sections.perfumes.title}
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
            {t.sections.perfumes.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perfumesList.map((product) => (
            <ProductCard key={product.id} product={product} showNotes={true} />
          ))}
        </div>
      </section>

      {/* ====================================================================
          SECTION 7: SPECIAL OFFERS & DISCOUNTS (COUNTDOWN + PROMO + ITEMS)
      ==================================================================== */}
      <section
        id="offers-section"
        className={`py-16 lg:py-20 border-y ${
          darkMode
            ? 'bg-gradient-to-r from-[#1D1519] via-[#261B20] to-[#1D1519] border-[#33272D]'
            : 'bg-gradient-to-r from-[#F3E5E1] via-[#EFE0DC] to-[#F5E9E2] border-[#E4D3CD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Promo Banner Header */}
          <div
            className={`rounded-3xl p-6 sm:p-10 mb-12 border backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8 ${
              darkMode
                ? 'bg-[#120F11]/70 border-[#3A2B32]'
                : 'bg-white/80 border-white shadow-lg shadow-[#C98A91]/10'
            }`}
          >
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C98A91] text-white text-[11px] font-semibold tracking-[0.2em] uppercase">
                {t.sections.offers.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold">
                {t.sections.offers.title}
              </h2>
              <p className={`text-sm sm:text-base ${darkMode ? 'text-[#C6B8BB]' : 'text-[#5E5154]'}`}>
                {t.sections.offers.subtitle}
              </p>

              {/* Copyable Promo Code Pill */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className={`text-xs font-medium ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
                  {t.sections.offers.promoLabel}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPromoCode}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border-2 border-dashed border-[#C98A91] font-mono text-sm font-bold tracking-wider transition-all ${
                    darkMode
                      ? 'bg-[#1E171B] text-[#F2CFD3] hover:bg-[#291F24]'
                      : 'bg-[#FAF7F2] text-[#8E4851] hover:bg-[#F3E5E7]'
                  }`}
                >
                  <span>ECLAT20</span>
                  {copiedCode ? (
                    <span className="inline-flex items-center gap-1 text-xs font-sans text-emerald-500">
                      <Check className="w-3.5 h-3.5" /> {t.sections.offers.copied}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-sans text-[#C98A91]">
                      <Copy className="w-3.5 h-3.5" /> {t.sections.offers.copyCode}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Live Countdown Boxes */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 shrink-0">
              {[
                { val: timeLeft.days, label: t.sections.offers.days },
                { val: timeLeft.hours, label: t.sections.offers.hours },
                { val: timeLeft.mins, label: t.sections.offers.mins },
                { val: timeLeft.secs, label: t.sections.offers.secs }
              ].map((unit) => (
                <div
                  key={unit.label}
                  className={`w-16 sm:w-20 py-3.5 rounded-2xl text-center border ${
                    darkMode
                      ? 'bg-[#1B1619] border-[#33272D]'
                      : 'bg-[#FAF7F2] border-[#E4D6CD]'
                  }`}
                >
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C98A91]">
                    {String(unit.val).padStart(2, '0')}
                  </div>
                  <div
                    className={`text-[10px] uppercase tracking-widest mt-1 ${
                      darkMode ? 'text-[#9B8B8F]' : 'text-[#7C6D70]'
                    }`}
                  >
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discounted Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOffersList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 8: POPULAR BRANDS (INTERACTIVE MAISON SELECTOR)
      ==================================================================== */}
      <section id="brands-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
            {t.sections.brands.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
            {t.sections.brands.title}
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
            {t.sections.brands.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRANDS.map((brand) => {
            const count = PRODUCTS.filter((p) => p.brand === brand.id).length;
            const isSelected = selectedBrand === brand.id;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => handleSelectBrand(brand.id)}
                className={`group text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-[#C98A91] bg-[#C98A91]/12 shadow-md'
                    : darkMode
                    ? 'bg-[#1B1619] border-[#2E262B] hover:border-[#C98A91]'
                    : 'bg-white border-[#E6DCD2] hover:border-[#C98A91] hover:shadow-lg hover:shadow-[#C98A91]/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-xl font-bold tracking-wider border transition-colors ${
                      darkMode
                        ? 'bg-[#251E22] border-[#382E34] text-[#E8C5C8] group-hover:bg-[#C98A91] group-hover:text-white'
                        : 'bg-[#FAF7F2] border-[#E4D8CC] text-[#8E535A] group-hover:bg-[#C98A91] group-hover:text-white'
                    }`}
                  >
                    {brand.monogram}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold tracking-wide group-hover:text-[#C98A91] transition-colors">
                      {brand.name}
                    </h3>
                    <div className={`text-xs mt-0.5 ${darkMode ? 'text-[#A39397]' : 'text-[#7C6D70]'}`}>
                      {brand.specialty[lang] || brand.specialty.en}
                    </div>
                    <div className="text-[11px] text-[#C98A91] font-medium mt-1">
                      {brand.origin} • {count} {t.sections.brands.itemsCount}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#C98A91] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          FULL INTERACTIVE CATALOG EXPLORER (SEARCH, FILTERS & SORTING)
      ==================================================================== */}
      <section
        id="catalog-section"
        ref={catalogRef}
        className={`py-16 lg:py-20 border-y scroll-mt-28 ${
          darkMode ? 'bg-[#161114] border-[#2E262B]' : 'bg-[#F5EFE8] border-[#E6DBD0]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
                {t.catalogSection.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
                {t.catalogSection.title}
              </h2>
              <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
                {t.catalogSection.subtitle}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#C98A91]">
              {filteredCatalogProducts.length} {t.catalogSection.showingCount}
            </div>
          </div>

          {/* Filter & Sort Toolbar */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border mb-8 space-y-4 ${
              darkMode
                ? 'bg-[#1B1619] border-[#2E262B]'
                : 'bg-white border-[#E5DBD1] shadow-xs'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: t.catalogSection.allCategories },
                  { id: 'makeup', label: t.nav.makeup },
                  { id: 'skincare', label: t.nav.skincare },
                  { id: 'perfume', label: t.nav.perfumes }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#C98A91] text-white shadow-sm'
                        : darkMode
                        ? 'bg-[#251E22] text-[#C8B9BC] hover:text-white'
                        : 'bg-[#FAF7F2] text-[#5E5154] hover:bg-[#EFE6DC]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Brand Dropdown & Sort Dropdown */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  aria-label="Filter by Brand"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border outline-none ${
                    darkMode
                      ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                      : 'bg-[#FAF7F2] border-[#E4D9CE] text-[#221D1E]'
                  }`}
                >
                  <option value="all">{t.catalogSection.allBrands}</option>
                  {BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C98A91]" />
                  <select
                    aria-label="Sort products"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium border outline-none ${
                      darkMode
                        ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                        : 'bg-[#FAF7F2] border-[#E4D9CE] text-[#221D1E]'
                    }`}
                  >
                    <option value="popular">{t.catalogSection.sortPopular}</option>
                    <option value="price-asc">{t.catalogSection.sortPriceAsc}</option>
                    <option value="price-desc">{t.catalogSection.sortPriceDesc}</option>
                    <option value="rating">{t.catalogSection.sortRating}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Secondary Quick Toggles & Active Filter Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#C98A91]/15">
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={(e) => setOnlyDiscounted(e.target.checked)}
                    className="accent-[#C98A91] w-4 h-4 rounded"
                  />
                  <span>{t.catalogSection.onlyDiscounts}</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="accent-[#C98A91] w-4 h-4 rounded"
                  />
                  <span>{t.catalogSection.onlyNew}</span>
                </label>
              </div>

              {(selectedCategory !== 'all' ||
                selectedBrand !== 'all' ||
                onlyDiscounted ||
                onlyNew ||
                searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setOnlyDiscounted(false);
                    setOnlyNew(false);
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C98A91] hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.catalogSection.resetFilters}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filtered Products Grid */}
          {filteredCatalogProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCatalogProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showNotes={product.category === 'perfume'}
                />
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-16 px-6 rounded-3xl border ${
                darkMode ? 'bg-[#1B1619] border-[#2E262B]' : 'bg-white border-[#E5DBD1]'
              }`}
            >
              <Filter className="w-10 h-10 text-[#C98A91] mx-auto mb-3 opacity-80" />
              <h3 className="font-serif text-2xl font-semibold">
                {t.catalogSection.noResultsTitle}
              </h3>
              <p className={`text-sm mt-1 mb-5 ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
                {t.catalogSection.noResultsSub}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setOnlyDiscounted(false);
                  setOnlyNew(false);
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-[#C98A91] text-white text-xs font-semibold uppercase tracking-wider"
              >
                {t.catalogSection.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          SECTION 9: CUSTOMER REVIEWS & INTERACTIVE SUBMISSION FORM
      ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
            {t.sections.reviews.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-1">
            {t.sections.reviews.title}
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
            {t.sections.reviews.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className={`p-6 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-[#1B1619] border-[#2E262B]'
                    : 'bg-white border-[#E6DCD2] shadow-xs'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="font-semibold text-base">{rev.name}</div>
                    <div className="flex items-center gap-2 text-xs text-[#C98A91] mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.sections.reviews.verified}</span>
                      <span>• {rev.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-[#D9A760] text-[#D9A760]'
                            : 'text-gray-400/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-[#D3C4C7]' : 'text-[#4E4245]'}`}>
                  “{rev.comment[lang] || rev.comment.en}”
                </p>

                <div
                  className={`text-[11px] font-medium pt-2.5 border-t border-dashed ${
                    darkMode ? 'border-[#2E262B] text-[#9B8B8F]' : 'border-[#EAE0D5] text-[#8C7D80]'
                  }`}
                >
                  {rev.productName} • {rev.date}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Write-a-Review Form */}
          <div
            className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border ${
              darkMode
                ? 'bg-[#1B1619] border-[#2E262B]'
                : 'bg-white border-[#E6DCD2] shadow-lg shadow-[#C98A91]/5'
            }`}
          >
            <h3 className="font-serif text-2xl font-semibold mb-5">
              {t.sections.reviews.writeTitle}
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  {t.sections.reviews.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder={t.sections.reviews.namePlaceholder}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                    darkMode
                      ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE] focus:border-[#C98A91]'
                      : 'bg-[#FAF7F2] border-[#E4D9CE] text-[#221D1E] focus:border-[#C98A91]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  {t.sections.reviews.productLabel}
                </label>
                <select
                  value={reviewForm.productName}
                  onChange={(e) => setReviewForm({ ...reviewForm, productName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                    darkMode
                      ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE] focus:border-[#C98A91]'
                      : 'bg-[#FAF7F2] border-[#E4D9CE] text-[#221D1E] focus:border-[#C98A91]'
                  }`}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.brand} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  {t.sections.reviews.ratingLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: starVal })}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= reviewForm.rating
                            ? 'fill-[#D9A760] text-[#D9A760]'
                            : 'text-gray-400/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  {t.sections.reviews.commentLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder={t.sections.reviews.commentPlaceholder}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none resize-none ${
                    darkMode
                      ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE] focus:border-[#C98A91]'
                      : 'bg-[#FAF7F2] border-[#E4D9CE] text-[#221D1E] focus:border-[#C98A91]'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-md"
              >
                {t.sections.reviews.submitReview}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 10: NEWSLETTER SUBSCRIPTION (LE CERCLE ÉCLAT)
      ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className={`relative overflow-hidden rounded-[32px] p-8 sm:p-14 text-center border ${
            darkMode
              ? 'bg-gradient-to-br from-[#23191E] via-[#1B1518] to-[#281C22] border-[#3A2B32]'
              : 'bg-gradient-to-br from-[#F3E5E1] via-[#FAF3EE] to-[#EEDBD7] border-[#E3D2CC]'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.22em] uppercase text-[#C98A91]">
              <Sparkles className="w-4 h-4" />
              {t.sections.newsletter.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold">
              {t.sections.newsletter.title}
            </h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-[#C6B8BB]' : 'text-[#5E5154]'}`}>
              {t.sections.newsletter.subtitle}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus) setNewsletterStatus(null);
                }}
                placeholder={t.sections.newsletter.placeholder}
                className={`w-full flex-1 px-5 py-3.5 rounded-full text-sm border outline-none ${
                  darkMode
                    ? 'bg-[#120F11]/90 border-[#3A2B32] text-[#F7F2EE] focus:border-[#C98A91]'
                    : 'bg-white border-[#DFD2C8] text-[#221D1E] focus:border-[#C98A91]'
                }`}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
              >
                <span>{t.sections.newsletter.button}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {newsletterStatus === 'success' && (
              <p className="text-xs sm:text-sm font-medium text-emerald-500 pt-2">
                {t.sections.newsletter.success}
              </p>
            )}
            {newsletterStatus === 'error' && (
              <p className="text-xs sm:text-sm font-medium text-rose-500 pt-2">
                {t.sections.newsletter.invalidEmail}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 11: PROFESSIONAL LUXURY FOOTER
      ==================================================================== */}
      <footer
        className={`border-t pt-16 pb-10 ${
          darkMode
            ? 'bg-[#0E0B0D] border-[#261F23] text-[#C8B9BC]'
            : 'bg-[#EFE6DC] border-[#E0D4C8] text-[#4E4245]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C98A91]/20">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <div
                  className={`font-serif text-3xl font-bold tracking-[0.14em] ${
                    darkMode ? 'text-[#F7F2EE]' : 'text-[#221D1E]'
                  }`}
                >
                  MAISON ÉCLAT
                </div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#C98A91] mt-1">
                  Haute Beauté & Parfumerie
                </div>
              </div>
              <p className="text-sm leading-relaxed">{t.footer.about}</p>
            </div>

            {/* Collections Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4
                className={`text-xs font-bold uppercase tracking-[0.18em] ${
                  darkMode ? 'text-[#F7F2EE]' : 'text-[#221D1E]'
                }`}
              >
                {t.footer.colShop}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('new-arrivals')}
                    className="hover:text-[#C98A91] transition-colors"
                  >
                    {t.nav.newArrivals}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('makeup-section')}
                    className="hover:text-[#C98A91] transition-colors"
                  >
                    {t.nav.makeup}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('skincare-section')}
                    className="hover:text-[#C98A91] transition-colors"
                  >
                    {t.nav.skincare}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('perfumes-section')}
                    className="hover:text-[#C98A91] transition-colors"
                  >
                    {t.nav.perfumes}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('offers-section')}
                    className="hover:text-[#C98A91] transition-colors"
                  >
                    {t.nav.offers}
                  </button>
                </li>
              </ul>
            </div>

            {/* Client Service */}
            <div className="lg:col-span-3 space-y-3">
              <h4
                className={`text-xs font-bold uppercase tracking-[0.18em] ${
                  darkMode ? 'text-[#F7F2EE]' : 'text-[#221D1E]'
                }`}
              >
                {t.footer.colService}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {t.footer.serviceLinks.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => scrollToSection('catalog-section')}
                      className="hover:text-[#C98A91] transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tashkent Flagship Boutique */}
            <div className="lg:col-span-3 space-y-3">
              <h4
                className={`text-xs font-bold uppercase tracking-[0.18em] ${
                  darkMode ? 'text-[#F7F2EE]' : 'text-[#221D1E]'
                }`}
              >
                {t.footer.colBoutique}
              </h4>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C98A91] shrink-0 mt-1" />
                  <span>{t.footer.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C98A91] shrink-0" />
                  <span>+998 (71) 205-88-99</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C98A91] shrink-0" />
                  <span>{t.footer.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Systems & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs">{t.footer.copyright}</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider mr-1 opacity-75">
                {t.footer.paymentTitle}:
              </span>
              {['Payme', 'Click', 'Uzcard', 'Humo', 'Visa', 'Mastercard'].map((method) => (
                <span
                  key={method}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                    darkMode
                      ? 'bg-[#181316] border-[#2E262B] text-[#E8C5C8]'
                      : 'bg-white border-[#DFD3C7] text-[#3A3032]'
                  }`}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          PRODUCT DETAIL QUICK-VIEW MODAL
      ==================================================================== */}
      {activeProductModal && (
        <div
          onClick={() => setActiveProductModal(null)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl rounded-3xl overflow-hidden border shadow-2xl my-8 animate-fade-up ${
              darkMode
                ? 'bg-[#1B1619] border-[#33272D] text-[#F7F2EE]'
                : 'bg-white border-[#E6DCD2] text-[#221D1E]'
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActiveProductModal(null)}
              className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                darkMode
                  ? 'bg-[#120F11]/80 border-[#33272D] hover:border-[#C98A91]'
                  : 'bg-white/90 border-[#E5DBD1] hover:border-[#C98A91]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Gallery */}
              <div className={`p-6 flex flex-col justify-between ${darkMode ? 'bg-[#151114]' : 'bg-[#FAF7F2]'}`}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={activeProductModal.images[modalImageIdx] || activeProductModal.images[0]}
                    alt={activeProductModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {activeProductModal.images.length > 1 && (
                  <div className="flex items-center gap-3">
                    {activeProductModal.images.map((imgUrl, idx) => (
                      <button
                        key={imgUrl}
                        type="button"
                        onClick={() => setModalImageIdx(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          modalImageIdx === idx
                            ? 'border-[#C98A91] scale-105'
                            : 'border-transparent opacity-65 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pr-8">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C98A91]">
                      {activeProductModal.brand}
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-4 h-4 fill-[#D9A760] text-[#D9A760]" />
                      <span className="font-bold">{activeProductModal.rating.toFixed(1)}</span>
                      <span className="opacity-70">({activeProductModal.reviewCount})</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                    {activeProductModal.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-[#C98A91]">
                      {formatUZS(activeProductModal.price)}
                    </span>
                    {activeProductModal.originalPrice && (
                      <span className="text-sm line-through opacity-60">
                        {formatUZS(activeProductModal.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-medium text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.product.inStock}</span>
                  </div>

                  {/* Shade / Volume Selector */}
                  {activeProductModal.variants && activeProductModal.variants.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-semibold uppercase tracking-wider mb-2">
                        {t.product.shadeOrSize}{' '}
                        <span className="text-[#C98A91] normal-case">
                          {activeProductModal.variants[modalVariantIdx]?.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProductModal.variants.map((variant, idx) => (
                          <button
                            key={variant.label}
                            type="button"
                            onClick={() => setModalVariantIdx(idx)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                              modalVariantIdx === idx
                                ? 'border-[#C98A91] bg-[#C98A91]/15 font-semibold'
                                : darkMode
                                ? 'border-[#33272D] bg-[#241D21]'
                                : 'border-[#E4D9CE] bg-[#FAF7F2]'
                            }`}
                          >
                            {variant.color && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20"
                                style={{ backgroundColor: variant.color }}
                              />
                            )}
                            <span>{variant.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description / Ingredients Tabs */}
                  <div className="pt-2">
                    <div className="flex gap-4 border-b border-[#C98A91]/20 mb-3">
                      <button
                        type="button"
                        onClick={() => setModalTab('desc')}
                        className={`pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                          modalTab === 'desc'
                            ? 'border-[#C98A91] text-[#C98A91]'
                            : 'border-transparent opacity-65'
                        }`}
                      >
                        {t.product.descriptionTab}
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab('notes')}
                        className={`pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                          modalTab === 'notes'
                            ? 'border-[#C98A91] text-[#C98A91]'
                            : 'border-transparent opacity-65'
                        }`}
                      >
                        {t.product.notesTab}
                      </button>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        darkMode ? 'text-[#C8B9BC]' : 'text-[#5A4D50]'
                      }`}
                    >
                      {modalTab === 'desc'
                        ? activeProductModal.descriptions[lang] || activeProductModal.descriptions.en
                        : activeProductModal.notesOrIngredients[lang] ||
                          activeProductModal.notesOrIngredients.en}
                    </p>
                  </div>
                </div>

                {/* Quantity & Action Buttons */}
                <div className="pt-4 border-t border-[#C98A91]/20 flex flex-wrap items-center gap-3">
                  <div
                    className={`flex items-center rounded-xl border ${
                      darkMode ? 'border-[#33272D] bg-[#241D21]' : 'border-[#E4D9CE] bg-[#FAF7F2]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                      className="p-3 hover:text-[#C98A91]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold">{modalQty}</span>
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => q + 1)}
                      className="p-3 hover:text-[#C98A91]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const chosenLabel =
                        activeProductModal.variants?.[modalVariantIdx]?.label || 'Standard';
                      addToCart(activeProductModal, modalQty, chosenLabel);
                      setActiveProductModal(null);
                    }}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.product.addToCart}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(activeProductModal)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      wishlist.includes(activeProductModal.id)
                        ? 'bg-[#C98A91] border-[#C98A91] text-white'
                        : darkMode
                        ? 'border-[#33272D] hover:border-[#C98A91]'
                        : 'border-[#E4D9CE] hover:border-[#C98A91]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes(activeProductModal.id) ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SHOPPING CART & CHECKOUT SLIDE-OVER DRAWER
      ==================================================================== */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l transition-colors ${
              darkMode
                ? 'bg-[#161214] border-[#2E262B] text-[#F7F2EE]'
                : 'bg-[#FAF7F2] border-[#E5DBD1] text-[#221D1E]'
            }`}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#C98A91]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#C98A91]" />
                <h2 className="font-serif text-2xl font-semibold">
                  {checkoutStep === 'cart' ? t.cart.title : t.checkout.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-[#C98A91]/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: SHOPPING CART ITEMS */}
            {checkoutStep === 'cart' && (
              <>
                {/* Free Shipping Progress Bar */}
                {cart.length > 0 && (
                  <div
                    className={`px-5 py-3 text-xs border-b ${
                      darkMode ? 'bg-[#1D171B] border-[#2E262B]' : 'bg-[#EFE6DC] border-[#E3D7CB]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-medium">
                      {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" /> {t.cart.freeShipUnlocked}
                        </span>
                      ) : (
                        <span>
                          {t.cart.freeShipRemaining}{' '}
                          <strong className="text-[#C98A91]">
                            {formatUZS(FREE_SHIPPING_THRESHOLD - cartSubtotal)}
                          </strong>
                        </span>
                      )}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
                      <div
                        className="h-full bg-[#C98A91] transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Cart Items Scroll Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                      <ShoppingBag className="w-12 h-12 text-[#C98A91] mx-auto opacity-60" />
                      <h3 className="font-serif text-2xl font-semibold">{t.cart.emptyTitle}</h3>
                      <p className={`text-sm ${darkMode ? 'text-[#A39397]' : 'text-[#6D5F62]'}`}>
                        {t.cart.emptySub}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCartOpen(false);
                          scrollToSection('catalog-section');
                        }}
                        className="px-6 py-3 rounded-full bg-[#C98A91] text-white text-xs font-semibold uppercase tracking-wider"
                      >
                        {t.cart.browseBtn}
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.cartKey}
                        className={`p-3.5 rounded-2xl border flex gap-3.5 ${
                          darkMode
                            ? 'bg-[#1D171B] border-[#2E262B]'
                            : 'bg-white border-[#E6DCD2]'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C98A91]">
                                {item.brand}
                              </span>
                              <button
                                type="button"
                                aria-label="Remove item"
                                onClick={() => removeFromCart(item.cartKey)}
                                className="text-[#9B8B8F] hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <h4 className="font-serif text-base font-semibold truncate">
                              {item.name}
                            </h4>
                            <div className="text-xs opacity-70">{item.variant}</div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div
                              className={`inline-flex items-center rounded-lg border ${
                                darkMode
                                  ? 'border-[#33272D] bg-[#251E22]'
                                  : 'border-[#E4D9CE] bg-[#FAF7F2]'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.cartKey, -1)}
                                className="p-1.5 hover:text-[#C98A91]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.cartKey, 1)}
                                className="p-1.5 hover:text-[#C98A91]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-sm font-bold">
                              {formatUZS(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Footer Summary & Checkout Trigger */}
                {cart.length > 0 && (
                  <div
                    className={`p-5 border-t space-y-4 ${
                      darkMode ? 'bg-[#1B1619] border-[#2E262B]' : 'bg-white border-[#E5DBD1]'
                    }`}
                  >
                    {/* Promo Code Form */}
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder={t.cart.promoPlaceholder}
                        className={`flex-1 px-3.5 py-2 rounded-xl text-xs border outline-none ${
                          darkMode
                            ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                            : 'bg-[#FAF7F2] border-[#E4D9CE] text-[#221D1E]'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl border border-[#C98A91] text-[#C98A91] hover:bg-[#C98A91] hover:text-white text-xs font-semibold transition-colors"
                      >
                        {t.cart.applyPromo}
                      </button>
                    </form>
                    {promoFeedback && (
                      <div
                        className={`text-xs font-medium ${
                          appliedPromo ? 'text-emerald-500' : 'text-rose-500'
                        }`}
                      >
                        {promoFeedback}
                      </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between opacity-80">
                        <span>{t.cart.subtotal}</span>
                        <span>{formatUZS(cartSubtotal)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-emerald-500 font-medium">
                          <span>{t.cart.discount} (20%)</span>
                          <span>-{formatUZS(promoDiscountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between opacity-80">
                        <span>{t.cart.delivery}</span>
                        <span>{deliveryFee === 0 ? t.cart.free : formatUZS(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold pt-2 border-t border-[#C98A91]/20">
                        <span>{t.cart.total}</span>
                        <span className="text-[#C98A91]">{formatUZS(cartGrandTotal)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCheckoutStep('form')}
                      className="w-full py-3.5 rounded-xl bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold uppercase tracking-[0.14em] shadow-lg transition-all"
                    >
                      {t.cart.checkoutBtn}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: VALIDATED CHECKOUT FORM */}
            {checkoutStep === 'form' && (
              <form
                onSubmit={handlePlaceOrder}
                className="flex-1 overflow-y-auto p-5 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C98A91] hover:underline"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.checkout.backToCart}</span>
                  </button>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                      {t.checkout.fullName} *
                    </label>
                    <input
                      type="text"
                      value={checkoutForm.fullName}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, fullName: e.target.value })
                      }
                      placeholder={t.checkout.fullNamePh}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                        darkMode
                          ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                          : 'bg-white border-[#E4D9CE] text-[#221D1E]'
                      }`}
                    />
                    {checkoutErrors.fullName && (
                      <p className="text-xs text-rose-500 mt-1">{checkoutErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                      {t.checkout.phone} *
                    </label>
                    <input
                      type="tel"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      placeholder={t.checkout.phonePh}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                        darkMode
                          ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                          : 'bg-white border-[#E4D9CE] text-[#221D1E]'
                      }`}
                    />
                    {checkoutErrors.phone && (
                      <p className="text-xs text-rose-500 mt-1">{checkoutErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                      {t.checkout.city}
                    </label>
                    <select
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                        darkMode
                          ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                          : 'bg-white border-[#E4D9CE] text-[#221D1E]'
                      }`}
                    >
                      {UZBEK_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                      {t.checkout.address} *
                    </label>
                    <textarea
                      rows={2}
                      value={checkoutForm.address}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, address: e.target.value })
                      }
                      placeholder={t.checkout.addressPh}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none resize-none ${
                        darkMode
                          ? 'bg-[#251E22] border-[#382E34] text-[#F7F2EE]'
                          : 'bg-white border-[#E4D9CE] text-[#221D1E]'
                      }`}
                    />
                    {checkoutErrors.address && (
                      <p className="text-xs text-rose-500 mt-1">{checkoutErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
                      {t.checkout.paymentMethod}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Payme', 'Click', 'Uzcard / Humo', t.checkout.cashOnDelivery].map(
                        (method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setCheckoutForm({ ...checkoutForm, payment: method })}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center gap-2 transition-all ${
                              checkoutForm.payment === method
                                ? 'border-[#C98A91] bg-[#C98A91]/15 font-semibold'
                                : darkMode
                                ? 'border-[#33272D] bg-[#1E181B]'
                                : 'border-[#E4D9CE] bg-white'
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5 text-[#C98A91] shrink-0" />
                            <span className="truncate">{method}</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C98A91]/20 space-y-3">
                  <div className="flex justify-between text-base font-bold">
                    <span>{t.cart.total}</span>
                    <span className="text-[#C98A91]">{formatUZS(cartGrandTotal)}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold uppercase tracking-[0.14em] shadow-lg transition-all"
                  >
                    {t.checkout.placeOrder}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER CONFIRMATION RECEIPT */}
            {checkoutStep === 'success' && (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-semibold">{t.checkout.successTitle}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-[#B7A9AC]' : 'text-[#6D5F62]'}`}>
                  {t.checkout.successSub}
                </p>
                <div
                  className={`w-full p-4 rounded-2xl border text-xs space-y-1.5 ${
                    darkMode ? 'bg-[#1D171B] border-[#2E262B]' : 'bg-white border-[#E5DBD1]'
                  }`}
                >
                  <div className="opacity-70">{t.checkout.orderNumber}</div>
                  <div className="font-mono text-lg font-bold text-[#C98A91]">{orderNumber}</div>
                  <div className="pt-1 opacity-80">
                    {checkoutForm.fullName} • {checkoutForm.city}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('cart');
                    setCartOpen(false);
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#C98A91] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  {t.checkout.continueShopping}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          WISHLIST SLIDE-OVER DRAWER
      ==================================================================== */}
      {wishlistOpen && (
        <div
          onClick={() => setWishlistOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l ${
              darkMode
                ? 'bg-[#161214] border-[#2E262B] text-[#F7F2EE]'
                : 'bg-[#FAF7F2] border-[#E5DBD1] text-[#221D1E]'
            }`}
          >
            <div className="p-5 border-b border-[#C98A91]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-[#C98A91] fill-[#C98A91]" />
                <h2 className="font-serif text-2xl font-semibold">{t.wishlist.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-[#C98A91]/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <Heart className="w-12 h-12 text-[#C98A91] mx-auto opacity-60" />
                  <h3 className="font-serif text-2xl font-semibold">{t.wishlist.emptyTitle}</h3>
                  <p className={`text-sm ${darkMode ? 'text-[#A39397]' : 'text-[#6D5F62]'}`}>
                    {t.wishlist.emptySub}
                  </p>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`p-3.5 rounded-2xl border flex gap-3.5 ${
                      darkMode ? 'bg-[#1D171B] border-[#2E262B]' : 'bg-white border-[#E6DCD2]'
                    }`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C98A91]">
                            {product.brand}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product)}
                            className="text-[#9B8B8F] hover:text-rose-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="font-serif text-base font-semibold truncate">
                          {product.name}
                        </h4>
                        <div className="text-sm font-bold mt-1">{formatUZS(product.price)}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product, 1);
                          setWishlistOpen(false);
                          setCartOpen(true);
                        }}
                        className="mt-2 py-2 px-3 rounded-xl bg-[#C98A91] hover:bg-[#B6737B] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t.wishlist.moveToCart}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          RESPONSIVE MOBILE NAVIGATION DRAWER
      ==================================================================== */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-80 max-w-[85vw] h-full p-6 flex flex-col justify-between border-r ${
              darkMode
                ? 'bg-[#161214] border-[#2E262B] text-[#F7F2EE]'
                : 'bg-[#FAF7F2] border-[#E5DBD1] text-[#221D1E]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C98A91]/20">
                <span className="font-serif text-2xl font-bold tracking-[0.12em]">
                  MAISON ÉCLAT
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-[#C98A91]/15"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Language Switcher */}
              <div className="py-4 border-b border-[#C98A91]/20 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#C98A91]" /> Language
                </span>
                <div className="flex gap-1.5">
                  {['uz', 'ru', 'en'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        lang === code
                          ? 'bg-[#C98A91] text-white'
                          : darkMode
                          ? 'bg-[#251E22] text-[#C8B9BC]'
                          : 'bg-[#EFE6DC] text-[#5E5154]'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Nav Links */}
              <nav className="py-6 flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.14em]">
                <button
                  type="button"
                  onClick={() => scrollToSection('catalog-section')}
                  className="text-left hover:text-[#C98A91]"
                >
                  {t.nav.catalog}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('new-arrivals')}
                  className="text-left hover:text-[#C98A91]"
                >
                  {t.nav.newArrivals}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('makeup-section')}
                  className="text-left hover:text-[#C98A91]"
                >
                  {t.nav.makeup}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('skincare-section')}
                  className="text-left hover:text-[#C98A91]"
                >
                  {t.nav.skincare}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('perfumes-section')}
                  className="text-left hover:text-[#C98A91]"
                >
                  {t.nav.perfumes}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('offers-section')}
                  className="text-left text-[#C98A91]"
                >
                  {t.nav.offers}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('brands-section')}
                  className="text-left hover:text-[#C98A91]"
                >
                  {t.nav.brands}
                </button>
              </nav>
            </div>

            <div className="text-xs opacity-70 pt-4 border-t border-[#C98A91]/20">
              {t.footer.address}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          FLOATING TOAST NOTIFICATIONS
      ==================================================================== */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl text-xs sm:text-sm font-medium animate-fade-up ${
              darkMode
                ? 'bg-[#1E181C]/95 border-[#C98A91]/40 text-[#F7F2EE]'
                : 'bg-white/95 border-[#C98A91]/40 text-[#221D1E]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-[#C98A91] text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}