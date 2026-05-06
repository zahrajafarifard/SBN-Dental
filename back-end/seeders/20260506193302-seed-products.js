"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // =====================================================
    // 1. GET CATEGORY IDS (Perfume, Cosmetics, etc.)
    // =====================================================
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM Categories;`,
    );

    const categoryRows = categories[0];

    const toothPaste = categoryRows.find((c) => c.name === "خمیر دندان");

    // =====================================================
    // 2. INSERT PRODUCTS (WITH CategoryId)
    // =====================================================
    await queryInterface.bulkInsert("Products", [
      {
        productTitle: "خمیر دندان حساس",
        price: 45000,
        CategoryId: toothPaste.id,
        mainDescriptionSectionOne:
          "خمیر دندان ویژه برای دندان های حساس و درد دار. این محصول با فرمولاسیون خاص و تکنولوژی مدرن، درد و حساسیت دندان را کاهش می دهد.",
        mainDescriptionItems: "منیزیم، فلوراید، تانین، ترک پپرمینت",
        keyWord1: "حساسیت",
        keyWord2: "درد دندان",
        keyWord3: "مراقبت ملایم",
        bgColor: "#e8f4f8",
        view: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        productTitle: "خمیر دندان سفیدکننده",
        price: 52000,
        CategoryId: toothPaste.id,
        mainDescriptionSectionOne:
          "خمیر دندان حرفه ای سفیدکننده که دندان های شما را تا 3 درجه سفیدتر می کند. حاوی آژنت های سفیدکننده طبیعی و ایمن برای مینای دندان.",
        mainDescriptionItems:
          "پراکسید هیدروژن، کربنات کلسیم، سیلیکا، عصاره زیتون",
        keyWord1: "سفیدی",
        keyWord2: "درخشندگی",
        keyWord3: "لبخند سفید",
        bgColor: "#fffacd",
        view: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        productTitle: "خمیر دندان ضد پوسیدگی",
        price: 38000,
        CategoryId: toothPaste.id,
        mainDescriptionSectionOne:
          "حفاظت جامع و مؤثر در برابر پوسیدگی و باکتری های خطرناک. این خمیر دندان برای تمام سنین مناسب است و باعث تقویت مینای دندان می شود.",
        mainDescriptionItems:
          "فلوراید 1000ppm، فسفات کلسیم، زینک کلوراید، روغن سماق",
        keyWord1: "ضد پوسیدگی",
        keyWord2: "حفاظت کامل",
        keyWord3: "مینا تقویت شده",
        bgColor: "#f0e68c",
        view: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        productTitle: "خمیر دندان فلوردار",
        price: 35000,
        CategoryId: toothPaste.id,
        mainDescriptionSectionOne:
          "خمیر دندان حاوی فلوراید بهینه شده برای کودکان و بزرگسالان. فلوراید موجود در این محصول از بهترین کیفیت است و سلامت دندان را تضمین می کند.",
        mainDescriptionItems:
          "فلوراید 1450ppm، نانو هیدروکسی اپاتیت، غلیظ کننده طبیعی، ادویه نعناع",
        keyWord1: "فلوراید",
        keyWord2: "محافظت",
        keyWord3: "سلامت دندان",
        bgColor: "#b0e0e6",
        view: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        productTitle: "خمیر دندان طبیعی",
        price: 48000,
        CategoryId: toothPaste.id,
        mainDescriptionSectionOne:
          "خمیر دندان ۱۰۰ درصد طبیعی و ارگانیک بدون هیچ ماده شیمیایی مضر. مناسب برای افرادی که دنبال محصولات طبیعی و ایمن هستند.",
        mainDescriptionItems:
          "نیم رنگ، نعناع وحشی، آلوئه ورا، روغن دارچین، نمک صخره",
        keyWord1: "طبیعی",
        keyWord2: "ارگانیک",
        keyWord3: "بدون شیمی",
        bgColor: "#90ee90",
        view: 0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // =====================================================
    // 3. GET PRODUCT IDS
    // =====================================================
    const products = await queryInterface.sequelize.query(
      `SELECT id, productTitle FROM Products;`,
    );

    const productRows = products[0];

    const toothPasteProduct = productRows.find(
      (p) => p.productTitle === "خمیر دندان حساس",
    );
    const whiteningPasteProduct = productRows.find(
      (p) => p.productTitle === "خمیر دندان سفیدکننده",
    );
    const cavityProtectionProduct = productRows.find(
      (p) => p.productTitle === "خمیر دندان ضد پوسیدگی",
    );
    const fluoridePasteProduct = productRows.find(
      (p) => p.productTitle === "خمیر دندان فلوردار",
    );
    const naturalPasteProduct = productRows.find(
      (p) => p.productTitle === "خمیر دندان طبیعی",
    );

    // =====================================================
    // 4. PRODUCT IMAGES
    // =====================================================
    await queryInterface.bulkInsert("ProductImages", [
      {
        ProductId: toothPasteProduct.id,
        mainImage: "1-2.svg",
        image1: "1-1.svg",
        image2: "1-3.svg",
        image3: "1-4.svg",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        mainImage: "2-1.svg",
        image1: "2-2.svg",
        image2: "2-3.svg",
        image3: "2-4.svg",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        mainImage: "3-1.svg",
        image1: "3-2.svg",
        image2: "3-3.svg",
        image3: "3-4.svg",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        mainImage: "4-1.svg",
        image1: "4-2.svg",
        image2: "4-3.svg",
        image3: "4-4.svg",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        mainImage: "1-2.svg",
        image1: "1-1.svg",
        image2: "1-3.svg",
        image3: "1-4.svg",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // =====================================================
    // 5. COMPOSITIONS
    // =====================================================
    await queryInterface.bulkInsert("Compositions", [
      {
        ProductId: toothPasteProduct.id,
        title: "اجزای موثر",
        description:
          "منیزیم برای کاهش حساسیت، فلوراید برای محافظت، تانین برای تقویت لثه، ترک پپرمینت برای طعم و تازگی دهان",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: toothPasteProduct.id,
        title: "ویژگی های ترکیبی",
        description:
          "مواد مرطوب کننده و محافظ به کاهش التهاب کمک می کنند و برای استفاده روزانه مناسب هستند.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        title: "اجزای موثر",
        description:
          "پراکسید هیدروژن برای سفیدی، کربنات کلسیم برای صیقل، سیلیکا برای تمیز کنندگی، عصاره زیتون برای مراقبت طبیعی",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        title: "ویژگی های سفیدکننده",
        description:
          "عناصر نرم کننده و محافظ مینای دندان، با کاهش لکه های سطحی و حفظ سلامت لثه ها.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        title: "اجزای موثر",
        description:
          "فلوراید 1000ppm برای حفاظت کامل، فسفات کلسیم برای تقویت مینا، زینک کلوراید برای ضد باکتری، روغن سماق برای خواص درمانی",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        title: "ویژگی های حفاظتی",
        description:
          "پوشش محافظ روی دندان ایجاد می کند که در برابر اسید و باکتری ها مقاومت بالاتری دارد.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        title: "اجزای موثر",
        description:
          "فلوراید 1450ppm برای حفاظت بهینه، نانو هیدروکسی اپاتیت برای تقویت مینای دندان، غلیظ کننده طبیعی، ادویه نعناع برای طعم مطبوع",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        title: "ویژگی های فلورایدی",
        description:
          "فرمول فلوراید به تقویت مینا و جلوگیری از تشکیل پلاک کمک می کند و برای استفاده روزانه مناسب است.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        title: "اجزای موثر",
        description:
          "نیم رنگ برای سفیدی طبیعی، نعناع وحشی برای تازگی، آلوئه ورا برای مراقبت لثه، روغن دارچین برای خواص ضد باکتری، نمک صخره برای صیقل",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        title: "ویژگی های طبیعی",
        description:
          "بدون مواد شیمیایی مضر و طعم دهنده های مصنوعی، مناسب برای کسانی که به دنبال مراقبت کم خطرند.",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // =====================================================
    // 6. DETAILS
    // =====================================================
    await queryInterface.bulkInsert("Details", [
      {
        ProductId: toothPasteProduct.id,
        title: "مزایا",
        description:
          "کاهش حساسیت در 2 هفته، رفع درد فوری، محافظت طولانی مدت، ایمن برای دندان های حساس",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: toothPasteProduct.id,
        title: "ملاحظات",
        description:
          "مناسب برای استفاده روزانه و کسانی که دندان های حساس دارند؛ به صورت دوره ای برای حفظ نتیجه استفاده کنید.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        title: "مزایا",
        description:
          "سفیدی تا 3 درجه در 4 هفته، نتایج قابل مشاهده، ایمن برای مینای دندان، طعم مطبوع",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        title: "توضیحات تکمیلی",
        description:
          "فرمول با لطافت برای مینای دندان طراحی شده و به کاهش لکه های سطحی کمک می کند بدون اینکه مینای دندان را ساییده کند.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        title: "مزایا",
        description:
          "حفاظت کامل در برابر پوسیدگی، تقویت مینا، پیشگیری از بیماری لثه، مناسب برای همه سنین",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        title: "عملکرد",
        description:
          "ایجاد یک لایه محافظ روی دندان که از حمله اسیدها و باکتری ها جلوگیری کرده و سلامت لثه را بهبود می بخشد.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        title: "مزایا",
        description:
          "محافظت طولانی مدت، تقویت مینای دندان، ایمن برای کودکان، فلوراید بهینه شده",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        title: "ویژگی ها",
        description:
          "فرمول غنی از فلوراید برای جلوگیری از حفره ها و استحکام بخشی به مینای دندان در استفاده روزانه.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        title: "مزایا",
        description:
          "۱۰۰ درصد طبیعی و ارگانیک، بدون مواد شیمیایی مضر، دوستدار محیط زیست، مناسب برای دندان های حساس",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        title: "ویژگی های طبیعی",
        description:
          "ترکیب گیاهان و مواد طبیعی، بدون گلوتن و بدون پارابن، مناسب برای پوست و لثه های حساس.",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // =====================================================
    // 7. USAGE
    // =====================================================
    await queryInterface.bulkInsert("Usages", [
      {
        ProductId: toothPasteProduct.id,
        title: "نحوه استفاده",
        description:
          "دو بار روزانه صبح و شب، 2 تا 3 دقیقه مسلسل شامل تمام سطح دندان ها، برای بهترین نتایج حداقل 2 هفته به طور منظم استفاده کنید",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: toothPasteProduct.id,
        title: "نکات مهم",
        description:
          "برای کاهش حساسیت بیشتر، از مسواک نرم استفاده کنید و از آب ولرم برای شستشو بهره ببرید.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        title: "نحوه استفاده",
        description:
          "دو بار روزانه صبح و شب، مسلسل 2 الی 3 دقیقه به تمام دندان ها، نتایج بهتر در 4 هفته استفاده مداوم، از کشیدن دندان شدید پرهیز کنید",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: whiteningPasteProduct.id,
        title: "نکات تکمیلی",
        description:
          "برای رسیدن به نتیجه بهتر، پس از استفاده، دهان را به خوبی آبکشی کرده و از نوشیدنی های رنگی تا 30 دقیقه خودداری کنید.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        title: "نحوه استفاده",
        description:
          "سه بار روزانه صبح، ظهر و شب، بعد از غذا خوردن، 2 تا 3 دقیقه مسلسل، برای تمام سنین مناسب، کودکان زیر 3 سال نیاز به نظارت والدین دارند",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: cavityProtectionProduct.id,
        title: "هشدارها",
        description:
          "برای کودکان زیر 6 سال از مقدار کم دندانپزشکی استفاده کنید و از بلعیدن خمیر دندان جلوگیری کنید.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        title: "نحوه استفاده",
        description:
          "دو بار روزانه صبح و شب، 2 دقیقه مسلسل، کودکان بزرگتر و بزرگسالان می توانند از آن استفاده کنند، بهترین نتایج با استفاده مداوم",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: fluoridePasteProduct.id,
        title: "نکات کاربردی",
        description:
          "قبل از خواب از مقدار کمی خمیر دندان استفاده کنید و پس از مسواک زدن حدود 30 دقیقه دهان را آبکشی نکنید تا اثربخشی فلوراید حفظ شود.",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        title: "نحوه استفاده",
        description:
          "دو بار روزانه صبح و شب، 2 الی 3 دقیقه مسلسل، برای تمام سنین ایمن است، مناسب برای افراد الرژیک به مواد شیمیایی",
        createdAt: now,
        updatedAt: now,
      },
      {
        ProductId: naturalPasteProduct.id,
        title: "نکات طبیعی",
        description:
          "برای حفظ طعم طبیعی و اثر بهتر، از مصرف محصولات شیمیایی همزمان پرهیز کنید و از کشیدن دندان شدید اجتناب کنید.",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usages", null, {});
    await queryInterface.bulkDelete("Details", null, {});
    await queryInterface.bulkDelete("Compositions", null, {});
    await queryInterface.bulkDelete("ProductImages", null, {});
    await queryInterface.bulkDelete("Products", null, {});
  },
};
