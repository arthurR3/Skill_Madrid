/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const DOCUMENT_ID = "Madrid_APL";
const datasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://cdn.localadventures.io/766312/rutas-iberianas-madrid-andalucia-y-levante-G4uWs9Q.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Bienvenidos Conoce mas de Madrid, España"
                }
            },
            "logoUrl": "https://amcselekt.es/blog/wp-content/uploads/2022/02/Bandera_Espan%CC%83a5.jpg",
            "hintText": "Prueba: \"Alexa, ¿Dime los lugares turisticos de Madrid, España?\""
        }
    }
};
const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID2 = "DescripcionAPL";
const datasource2 = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://d2o906d8ln7ui1.cloudfront.net/images/response_builder/background-green.png",
            "displayFullscreen": false,
            "headerTitle": "Madrid, España",
            "headerSubtitle": "Descripción de la ciudad",
            "logoUrl": "https://thumbs.dreamstime.com/b/identidad-nacional-de-espa%C3%B1a-la-bandera-espa%C3%B1ola-pa%C3%ADs-dise%C3%B1o-vectores-con-escudo-armas-y-corona-fondo-amarillo-rojo-s%C3%ADmbolo-193655096.jpg",
            "videoControlType": "skip",
            "videoSources": [
                "https://res.cloudinary.com/dnm7asoe3/video/upload/v1719979557/Madrid_es_Chulo_bchg5k.mp4"
            ],
            "sliderType": "determinate"
        }
    }
};
const createDirectivePayload2 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID3 = "TurismoAPL";
const datasource3 = {
    "imageListData": {
        "type": "object",
        "objectId": "paginatedListSample",
        "title": "Galeria, Lugares turisticos",
        "listItems": [
            {
                "primaryText": "Palacio Real de Madrid, España",
                "secondaryText": "Una de las pocas residencias oficiales de Jefes de Estado abiertas al público.",
                "imageSource": "https://cdn-imgix.headout.com/media/images/68d9aa77c4d16a910bb2a6cd0d7d6fb7-Royal%20Palace%20Of%20Madrid%202.jpg?auto=format&w=814.9333333333333&h=458.4&q=90&ar=16%3A9&crop=faces"
            },
            {
                "primaryText": "Templo de Debod",
                "secondaryText": "Muy bonito poder pasear por este templo , es una visita obligada si se esta en madrid, ambiente cultural perfecto",
                "imageSource": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Templo_de_Debod_in_Madrid.jpg"
            },
            {
                "primaryText": "Real Basílica de San Francisco el grande",
                "secondaryText": "Grandiosidad, monumentalidad, la tercera cúpula mas alta del mundo",
                "imageSource": "https://upload.wikimedia.org/wikipedia/commons/2/26/Bas%C3%ADlica_de_San_Francisco_el_Grande_%28Madrid%29_13.jpg"
            },
            {
                "primaryText": "Santiago Bernabeu Estadio",
                "secondaryText": "Muy buen museo de fútbol dedicado a la historia del Real Madrid. ",
                "imageSource": "https://www.debate.com.mx/__export/1720022331631/sites/debate/img/2024/07/03/8022061416001w.jpg_347796135.jpg"
            },
            {
                "primaryText": "Plaza Mayor, Madrid",
                "secondaryText": "fue un gran hito arquitectónico, ya que se convirtió en el espacio público más grande de Madrid",
                "imageSource": "https://upload.wikimedia.org/wikipedia/commons/4/44/Plaza_Mayor_de_Madrid_06.jpg"
            }
        ],
        "logoUrl": "data:image/png;base64,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"
    }
};
const createDirectivePayload3 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID4 = "ComidaAPL";
const datasource4 = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://png.pngtree.com/thumb_back/fw800/background/20221004/pngtree-spain-flag-smoke-sparkle-light-background-image_1466867.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "COMIDA TIPICA",
        "listItems": [
            {
                "primaryText": "Cocido madrileño.",
                "imageSource": "https://www.tuscasasrurales.com/blog/wp-content/uploads/2018/09/comida-tipica-de-madrid.jpg"
            },
            {
                "primaryText": "Callos a la madrileña",
                "imageSource": "https://www.tuscasasrurales.com/blog/wp-content/uploads/2018/09/Callos-a-la-madrilena.jpg"
            },
            {
                "primaryText": "Bocadillo de calamares",
                "imageSource": "https://www.tuscasasrurales.com/blog/wp-content/uploads/2018/09/Bocadillo-de-calamares-Madrid.jpg"
            },
            {
                "primaryText": "Besugo a la madrileña",
                "imageSource": "https://www.tuscasasrurales.com/blog/wp-content/uploads/2018/09/besugo-a-la-madrilena.jpg"
            },
            {
                "primaryText": "Caracoles a la madrileña",
                "imageSource": "https://www.tuscasasrurales.com/blog/wp-content/uploads/2018/09/Caracoles-a-la-madrilena.jpg"
            },
            {
                "primaryText": "Potaje de garbanzos",
                "imageSource": "https://www.tuscasasrurales.com/blog/wp-content/uploads/2018/09/Potaje-de-garbanzos.jpg"
            }
        ],
        "logoUrl": "https://i.ytimg.com/vi/9I6whxdsJPg/maxresdefault.jpg",
        "hintText": ""
    }
};
const createDirectivePayload4 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID5 = "TrajesAPL";
const datasource5 = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://espanolio.ru/wp-content/uploads/2022/12/Madrid.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "Trajes Típicos de Madrid",
        "listItems": [
            {
                "primaryText": "Traje de chula madrileña (Chulapa)",
                "imageSource": "https://turismo.org/wp-content/uploads/2017/07/Chulapa-Ropa-tipica-de-Madrid-200x300.jpg"
            },
            {
                "primaryText": "Traje castellano",
                "imageSource": "https://turismo.org/wp-content/uploads/2017/07/Trajes-en-la-fiesta-de-San-Isidro-300x225.jpg"
            },
            {
                "primaryText": "Traje típico de varones",
                "imageSource": "https://turismo.org/wp-content/uploads/2017/07/Imagen-de-la-ropa-tipica-de-Madrid-300x200.jpg"
            }
        ],
        "logoUrl": "",
        "hintText": ""
    }
};
const createDirectivePayload5 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID6 = "MusicaAPL";
const datasource6 = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "skip",
            "audioSources": [
                "https://res.cloudinary.com/dnm7asoe3/video/upload/v1720066546/Loquillo_-_En_Las_Calles_De_Madrid_r7nui6.mp4",
                "https://res.cloudinary.com/dnm7asoe3/video/upload/v1720066829/Enamorado_de_la_Moda_Juvenil_irknmv.mp4",
                "https://res.cloudinary.com/dnm7asoe3/video/upload/v1720066982/Chica_de_ayer_siyp53.mp4"
            ],
            "backgroundImage": "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/185553/s960_music-Streaming.jpg",
            "coverImageSource": "https://www.mondosonoro.com/wp-content/uploads/2018/11/loquillo_calles_madrid.jpg",
            "headerTitle": "MUSICA",
            "logoUrl": "",
            "primaryText": "En las calles de Madrid",
            "secondaryText": "Loquillos y trogloditas",
            "sliderType": "determinate"
        }
    }
};
const createDirectivePayload6 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID7 = "AyudaAPL";
const datasource7 = {
    "textListData": {
        "type": "object",
        "objectId": "textListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://img.freepik.com/fotos-premium/color-liso-fondo-negro_41969-15979.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "AYUDA",
        "listItems": [
            {
                "primaryText": "Descripcion de la Ciudad"
            },
            {
                "primaryText": "Lugares turisticos"
            },
            {
                "primaryText": "Comida tipica"
            },
            {
                "primaryText": "Traje tipico"
            },
            {
                "primaryText": "Personajes sobresalientes"
            },
            {
                "primaryText": "Musica"
            }
        ],
        "logoUrl": ""
    }
};
const createDirectivePayload7 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID8 = "ByeAPL";
const datasource8 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://www.fiftysounds.com/images/graphics/plain-red-background-1508.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Gracias por utilizar los servicios"
                }
            },
            "logoUrl": "",
            "hintText": "Intenta, \"Alexa, musica de madrid\""
        }
    }
};
const createDirectivePayload8 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DOCUMENT_ID9 = "PersonajesAPL";

const datasource9 = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://imagenes.elpais.com/resizer/v2/FSIVAW57C5F7NP3CCCX76JB7OA.png?auth=130d0d7babdbfeb4d9428b236bbb40ed2a21e1ae7cb56a393791c06b9d934de6&width=1960",
                    "size": "large"
                }
            ]
        },
        "title": "Personajes historicos",
        "listItems": [
            {
                "primaryText": "Miguel de Cervantes Saavedra (1547-1616)",
                "imageSource": "https://germainegoyamadrid.com/wp-content/uploads/2024/01/miguel-de-cervantes.webp"
            },
            {
                "primaryText": "Sor Juana Inés de la Cruz (1648-1695)",
                "imageSource": "https://germainegoyamadrid.com/wp-content/uploads/2024/01/sor-juana-ines-de-la-cruz.webp"
            },
            {
                "primaryText": "Francisco Goya (1746-1828)",
                "imageSource": "https://germainegoyamadrid.com/wp-content/uploads/2024/01/francisco-goya.webp"
            },
            {
                "primaryText": "Isabel Clara Eugenia (1566-1633)",
                "imageSource": "https://germainegoyamadrid.com/wp-content/uploads/2024/01/isabel-clara-eugenia.webp"
            },
            {
                "primaryText": "Santiago Ramón y Cajal (1852-1934)",
                "imageSource": "https://germainegoyamadrid.com/wp-content/uploads/2024/01/santiago-ramon-y-cajal.webp"
            }
        ],
        "logoUrl": "",
        "hintText": ""
    }
};

const createDirectivePayload9 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido, Conoceras mas sobre la ciudad de Madrid, España, Olé! Solo di... Dime cuales son los lugares turisticos de Madrid... o si quieres salir, solo di... Bye!';
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, ¿Quieres saber más de Madrid, España? Solo di... Cual es la comida tipica de Madrid España';
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const DescripcionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescripcionIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Esto es una descripción sobre Madrid, España!';
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload2(DOCUMENT_ID2, datasource2);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const TurismoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurismoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Esto son 5 lugares que debes visitar si estas en Madrid, España';
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload3(DOCUMENT_ID3, datasource3);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ComidaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ComidaIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Estos son algunos platillos típicos de Madrid, España: 
        COCIDO MADRILEÑO: El plato se sirve en tres partes, empezando por el caldo con fideos, tras el cual se sirven los garbanzos y verduras y, para terminar, las carnes.
        CALLO A LA MADRILEÑA: Los callos constituyen también uno de los platos más ligados a la gastronomía madrileña.
        BOCADILLO DE CALAMARES: es una comida muy emblemática de Madrid, y raro es el bar en el que no lo sirven. Se trata sencillamente de un bocadillo cuyo contenido son los calamares a la romana.
        BESUGO A LA MADRILEÑA: Se trata de un pescado hecho al horno, que, aunque se consume durante todo el año, es muy típico de las fiestas navideñas.
        CARACOLES A LA MADRILEÑA: Se trata de unos caracoles cuya base es una salsa hecha a base de caldo de carne y embutidos de matanza.
        POTAJE DE GARBANZOS: Se trata de un potaje hecho con garbanzos, espinacas y otras verduras.
        `;
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload4(DOCUMENT_ID4, datasource4);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const TrajesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrajesIntent';
    },
    handle(handlerInput) {
        const speakOutput =`Estos son los trajes típicos de Madrid, España
         El traje chula madrileña: consta de mangas de farol en el cuerpo, bordados de colores, estrecha por la parte inferior.
         Traje castellano: Es una fusión de las culturas cristiana, judía y árabe en la zona rural de Madrid.
         Traje tipico de varones: Para los hombres es un terno compuesto de pantalón hasta la rodilla de color negro o marrón`;
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload5(DOCUMENT_ID5, datasource5);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const PersonajesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PersonajesIntent';
    },
    handle(handlerInput) {
        const speakOutput =`Estos son algunos personajes ilustres de Madrid, Aunque algunos no nacieron en Madrid, si pasaron la mayor parte de su vida en la ciudad.`;
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload9(DOCUMENT_ID9, datasource9);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};



const MusicaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MusicaIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Musica en Madrid!';
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload6(DOCUMENT_ID6, datasource6);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Necesitas Ayuda? Solo di... Bye';
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload7(DOCUMENT_ID7, datasource7);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload8(DOCUMENT_ID8, datasource8);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        DescripcionIntentHandler,
        TurismoIntentHandler,
        ComidaIntentHandler,
        TrajesIntentHandler,
        PersonajesIntentHandler,
        MusicaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();