const _ = require("lodash");
const { makeUrl, myUcFirst } = require("../helpers/helper");
const { selectAll, selectGet } = require("../middleware/query");
const { getAllServices } = require("./serviceController");

const getFAQ = async (template_req) => {
  const { service_id } = template_req.data;
  let tableName = "seo_faq";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ?`;
    let params = [service_id];
    let FAQs = await selectAll(sql, params);
    if (FAQs.length) {

      let schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [],
      };

      FAQs.forEach((FAQ) => {
        schema.mainEntity.push({
          "@type": "Question",
          name: FAQ.question,
          acceptedAnswer: [
            {
              "@type": "Answer",
              text: FAQ.answer,
            },
          ],
        });
      });

      result = schema;
    }

    return result;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};

const getHowTO = async (template_req) => {
  const { service_id, domain } = template_req.data;
  let tableName = "seo_howto";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ?`;
    let params = [service_id];
    let howToData = await selectGet(sql, params);

    if (howToData) {
      let schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: howToData.name,
        description: howToData.description,
        image: domain + "/seo/howTOImages/" + howToData.image,
        step: [],
      };

      sql = "SELECT * FROM seo_stepsHowToImage where service_id = ?";
      let params = [service_id];
      const stepsDataArray = await selectAll(sql, params);
      if (stepsDataArray.length) {
        stepsDataArray.forEach((stepsData) => {
          schema.step.push({
            "@type": "HowToStep",
            name: stepsData.name,
            image: domain + "/seo/howToImages/steps" + stepsData.image,
            text: stepsData.content,
          });
        });
      }

      result = schema;
    }

    return result;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};
const getVideos = async (template_req) => {
  const { service_id } = template_req.data;
  let tableName = "seo_videos";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ?`;
    let params = [service_id];
    let videoData = await selectGet(sql, params);

    if (videoData) {
      let schema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: videoData.name,
        thumbnailUrl:
          "https://www.youtube.com/embed/" + videoData.thumbnail_url,
        embedUrl: "https://www.youtube.com/embed/" + videoData.embed_url,
        description: videoData.description,
        uploadDate: videoData.uploadDate,
        potentialAction: [
          {
            "@type": "SeekToAction",
            target:
              "https://www.youtube.com/watch?v=" +
              videoData.video_url +
              "?t={seek_to_second_number}",
            "startOffset-input": "required name=seek_to_second_number",
          },
        ],
      };

      result = schema;
    }

    return result;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};

const getSpeakable = async (template_req) => {
  const { custom_keyword, service_id, city, domain } = template_req.data;
  let tableName = "seo_speakable";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ?`;
    let params = [service_id];
    let speakableData = await selectGet(sql, params);
    if (speakableData) {
      let cssSelector = speakableData.css_selector.split(",");
      let schema = {
				"@type":"SpeakableSpecification",
				"cssSelector": [cssSelector],
      };
      result = schema;
    }
    return result;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};

const getLocalBusiness = async (template_req) => {
  const {
    service_id,
    type,
    domain,
    phone,
    city,
    stateCodeValue,
    zip,
    custom_keyword,
  } = template_req.data;
  let tableName = "seo_localBusiness";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ? And type = ? COLLATE NOCASE`;
    let params = [service_id, type];
    let localBusinessData = await selectGet(sql, params);
    let localBusinessDataName = ""
    if(type == 'blog') {
			localBusinessDataName = "[city]  Blog";
		} else if(localBusinessData.name) {
			localBusinessDataName = localBusinessData.name;
		}
    console.log(localBusinessDataName);
    if (localBusinessDataName) {
      let siteUrlSlug = "pending";
      let schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: localBusinessDataName,
        image: domain + "/theme/images/logo.png",
        "@id": domain,
        url: siteUrlSlug,
        telephone: phone,
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "",
            addressLocality: city,
            addressRegion: stateCodeValue,
            postalCode: "",
            addressCountry: "US",
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
      };

      if (type == "zip") {
        schema.department = [
          {
            "@type": "AutomotiveBusiness",
            name: myUcFirst(makeUrl(custom_keyword)) + " " + myUcFirst(city),
            image: "",
            telephone: phone,
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: city,
                addressRegion: stateCodeValue,
                postalCode: zip,
                addressCountry: "US",
              },
            ],
          },
        ];
      }

      result = schema;
    }

    return result;
  } catch (err) {
    console.log(
      "🚀 ~ file: seoController.js:276 ~ getLocalBusiness ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};

const getService = async (template_req) => {
  const { custom_keyword, service_id, city, type, zip } = template_req.data;
  let providerName = "";
  if (type == "zip") {
    providerName =
      myUcFirst(custom_keyword) +
      " in " +
      myUcFirst(city) +
      " " +
      myUcFirst(zip);
  } else {
    providerName = myUcFirst(custom_keyword) + " in " + myUcFirst(city);
  }

  let tableName = "seo_services";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ?`;
    let params = [service_id];
    let servicesData = await selectGet(sql, params);
    if (servicesData) {
      let allServiceArray = await getAllServices();
      let itemServiceList = servicesData.services.split(",");
      let schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: myUcFirst(custom_keyword),
        provider: [{ "@type": "Website", name: providerName }],
        areaServed: [{ "@type": "City", name: myUcFirst(city) }],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: myUcFirst(custom_keyword) + " services",
          itemListElement: {
            "@type": "OfferCatalog",
            name: servicesData.name,
            itemListElement: [],
          },
        },
      };

      allServiceArray.forEach((itemService) => {
        let itemServiceElement = [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: itemService.service_name,
            },
          },
        ];

        schema.hasOfferCatalog.itemListElement.itemListElement.push(
          itemServiceElement
        );
      });

      result = schema;
    }

    return result;
  } catch (err) {
    console.log(
      "🚀 ~ file: seoController.js:357 ~ getService ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};

const getLinkJuice = async (template_req) => {
  const { service_id } = template_req.data;
  let tableName = "seo_link_juice";
  let result = "";
  try {
    let sql = `SELECT * FROM ${tableName} WHERE service_id = ?`;
    let params = [service_id];
    let linkJuice = await selectGet(sql, params);

    if (linkJuice) {
      result = JSON.parse(linkJuice.content);
    }

    return result;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return { error: err.message };
  }
};

const getLogo = (template_req) => {
  const { domain } = template_req.data;
  let schema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "inLanguage":"en-US",
    "url":"",
    "contentUrl":"",
    "width":1920,
    "height":900
  };
  return schema;
};

const getBreadcrumbList = async (template_req) => {
  const { domain } = template_req.data;
  let schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id":"[keyword_location_url]/#breadcrumb",
    "itemListElement":[{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": domain,
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "#1 [keyword] [city-state-zipcode] | Towing Service | [phone]",
    }]
  };
  return schema;
}

const getWebSite = async (template_req) => {
  $schema = {
    '@context':"https://schema.org",
    '@type':"WebSite",
    "@id":"[current_url]/#website",
    "url":"[current_url]",
    "name":"[city-state-zipcode]",
    "description":"",
    potentialAction: [
      {
        "@type": "SearchAction",
        "target":[{
          "@type":"EntryPoint",
          "urlTemplate":"[current_url]/?s={search_term_string}"
        }],
        "query-input": "required name=search_term_string",
      },
    ],
    "inLanguage":"en-US"
  };
  return  $schema;
}

const getWebPage = async (template_req) => {
  const speakableTagData = await getSpeakable(template_req);
  let schema = {
    '@context':"https://schema.org",
    '@type':"WebPage",
    "@id":"[keyword_location_url]/#webpage",
    "url":"[keyword_location_url]",
    "name":"#1 [keyword] [city-state-zipcode] | Towing Service | [phone]",
    "datePublished":"2022-12-15T23:58:59+00:00",
    "dateModified":"2021-12-15T23:58:59+00:00",
    "description":"Top-Rated [keyword] [city-state-zipcode]. Fast & Reliable Service. NATE and EPA Certified Technicians. We're here to help. Call us now: [phone]",
    "inLanguage":"en-US",
    potentialAction: [
      {
        "@type": "ReadAction",
        "target":["[keyword_location_url]"],
      },
    ],
  };
  if(speakableTagData) {
    schema.speakable = [speakableTagData];
  }
  return  schema;
}

module.exports = {
  getFAQ,
  getLogo,
  getHowTO,
  getVideos,
  getLocalBusiness,
  getService,
  getLinkJuice,
  getBreadcrumbList,
  getWebSite,
  getWebPage,
};
