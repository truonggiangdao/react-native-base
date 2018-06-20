import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const API_URL = "http://159.65.72.67";

// App Color
export const COLOR = {
    GREY: '#919499',
    GREY_2: '#C5C5C5',
    BUTTON_GREEN: 'rgba(124,252,0,1)',
    BUTTON_COLOR: '#FF000A',
    BUTTON_COLOR_DISABLE: 'rgba(255, 0, 10, 0.5)',
    BACKGROUND: '#FFFFFF',
    WHITE_DISABLED: 'rgba(255,255,255, 0.5)',
    GREY_SUBTRAST: 'rgba(145, 148, 153, 0.5)',
    BLACK: '#000000'
};

// Date time
export const FORMAT_DATE = {
    QUOTE_DATE: 'MMMM DD, YYYY',
}

export const APP = {
    NEW_QUOTE: 'APP.NEW_QUOTE',
    NEW_QUOTE_FIND_VEHICLE: 'APP.NEW_QUOTE_FIND_VEHICLE',
    NEW_QUOTE_FIND_PRICING: 'APP.NEW_QUOTE_FIND_PRICING',
    NEW_QUOTE_FINALIZE: 'APP.NEW_QUOTE_FINALIZE',
    FINAL_QUOTE: 'APP.FINAL_QUOTE',
    PRINT_QUOTE: 'APP.PRINT_QUOTE',
};

export const APP_ACTION = {
    NETWORK_CHANGED: 'APP.NETWORK_CHANGED',
    SET_GPS_LOCATION_DATA: 'APP.SET_GPS_LOCATION_DATA',
    GET_STATE_VALUE: 'APP.GET_STATE_VALUE',
    REQUEST_OAUTH_TOKEN: 'APP.REQUEST_OAUTH_TOKEN',
    REQUEST_OAUTH_TOKEN_SUCCESS: 'APP.REQUEST_OAUTH_TOKEN_SUCCESS',
    REQUEST_OAUTH_TOKEN_FAILURE: 'APP.REQUEST_OAUTH_TOKEN_FAILURE',
    REQUEST_CAMPAIGN_NAME: 'APP.REQUEST_CAMPAIGN_NAME',
    REQUEST_CAMPAIGN_NAME_SUCCESS: 'APP.REQUEST_CAMPAIGN_NAME_SUCCESS',
    REQUEST_CAMPAIGN_NAME_FAILURE: 'APP.REQUEST_CAMPAIGN_NAME_FAILURE',
    REQUEST_FIND_VEHICLE: 'APP.REQUEST_FIND_VEHICLE',
    REQUEST_FIND_VEHICLE_SUCCESS: 'APP.REQUEST_FIND_VEHICLE_SUCCESS',
    REQUEST_FIND_VEHICLE_FAILURE: 'APP.REQUEST_FIND_VEHICLE_FAILURE',
    REQUEST_TIME_OUT: 'APP.REQUEST_TIME_OUT',
    REQUEST_PRICE_MARKUP: 'APP.REQUEST_PRICE_MARKUP',
    REQUEST_PRICE_MARKUP_SUCCESS: 'APP.REQUEST_PRICE_MARKUP_SUCCESS',
    REQUEST_PRICE_MARKUP_FAILURE: 'APP.REQUEST_PRICE_MARKUP_FAILURE',
    REQUEST_CREATE_NEW_QUOTE: 'APP.REQUEST_CREATE_NEW_QUOTE',
    REQUEST_CREATE_NEW_QUOTE_SUCCESS: 'APP.REQUEST_CREATE_NEW_QUOTE_SUCCESS',
    REQUEST_CREATE_NEW_QUOTE_FAILURE: 'APP.REQUEST_CREATE_NEW_QUOTE_FAILURE',
    REQUEST_GET_TEMPLATE: 'APP.REQUEST_GET_TEMPLATE',
    REQUEST_GET_TEMPLATE_SUCCESS: 'APP.REQUEST_GET_TEMPLATE_SUCCESS',
    REQUEST_GET_TEMPLATE_FAILURE: 'APP.REQUEST_GET_TEMPLATE_FAILURE',
    REQUEST_BACK: 'APP.REQUEST_BACK',
}

export const ERROR_CODE = {
    REQUEST_TIME_OUT: 408,
    NOT_FOUND: 404,
    AUTHORIZED: 401,
}

export const CONSTANT = {
    title_margin_top: height * 0.01,
    text_height: height * 0.0546875,
    quote_form_top: height * 0.2,
}

export const FONTSIZE = {
    title_size: 25,
    toggle_size: 25,
    toggle_medium_size: 20,
    toggle_small_size: 15,
    title_form_size: 20,
    button_label_size: 18,
    find_pricing_label_size: 15.5,
}

export const DEFAULT_LOCATION = {
    lat: 37.789586,
    lng: -122.429316,
}

export const US_STATE = [
    {
        code: 'AL',
        name: 'ALABAMA',
    },
    {
        code: 'AK',
        name: 'ALASKA',
    },
    {
        code: 'AZ',
        name: 'ARIZONA',
    },
    {
        code: 'AR',
        name: 'ARKANSAS',
    },
    {
        code: 'CA',
        name: 'CALIFORNIA',
    },
    {
        code: 'CO',
        name: 'COLORADO',
    },
    {
        code: 'CT',
        name: 'CONNECTICUT',
    },
    {
        code: 'DE',
        name: 'DELAWARE',
    },
    {
        code: 'FL',
        name: 'FLORIDA',
    },
    {
        code: 'GA',
        name: 'GEORGIA',
    },
    {
        code: 'HI',
        name: 'HAWAII',
    },
    {
        code: 'ID',
        name: 'IDAHO',
    },
    {
        code: 'IL',
        name: 'ILLINOIS',
    },
    {
        code: 'IN',
        name: 'INDIANA',
    },
    {
        code: 'IA',
        name: 'IOWA',
    },
    {
        code: 'KS',
        name: 'KANSAS',
    },
    {
        code: 'KY',
        name: 'KENTUCKY',
    },
    {
        code: 'LA',
        name: 'LOUISIANA',
    },
    {
        code: 'ME',
        name: 'MAINE',
    },
    {
        code: 'MD',
        name: 'MARYLAND',
    },
    {
        code: 'MA',
        name: 'MASSACHUSETTS',
    },
    {
        code: 'MI',
        name: 'MICHIGAN',
    },
    {
        code: 'MN',
        name: 'MINNESOTA',
    },
    {
        code: 'MS',
        name: 'MISSISSIPPI',
    },
    {
        code: 'MO',
        name: 'MISSOURI',
    },
    {
        code: 'MT',
        name: 'MONTANA',
    },
    {
        code: 'NE',
        name: 'NEBRASKA',
    },
    {
        code: 'NV',
        name: 'NEVADA',
    },
    {
        code: 'NH',
        name: 'NEW HAMPSHIRE',
    },
    {
        code: 'NJ',
        name: 'NEW JERSEY',
    },
    {
        code: 'NM',
        name: 'NEW MEXICO',
    },
    {
        code: 'NY',
        name: 'NEW YORK',
    },
    {
        code: 'NC',
        name: 'NORTH CAROLINA',
    },
    {
        code: 'ND',
        name: 'NORTH DAKOTA',
    },
    {
        code: 'OH',
        name: 'OHIO',
    },
    {
        code: 'OK',
        name: 'OKLAHOMA',
    },
    {
        code: 'OR',
        name: 'OREGON',
    },
    {
        code: 'PA',
        name: 'PENNSYLVANIA',
    },
    {
        code: 'RI',
        name: 'RHODE ISLAND',
    },
    {
        code: 'SC',
        name: 'SOUTH CAROLINA',
    },
    {
        code: 'SD',
        name: 'SOUTH DAKOTA',
    },
    {
        code: 'TN',
        name: 'TENNESSEE',
    },
    {
        code: 'TX',
        name: 'TEXAS',
    },
    {
        code: 'UT',
        name: 'UTAH',
    },
    {
        code: 'VT',
        name: 'VERMONT',
    },
    {
        code: 'VA',
        name: 'VIRGINIA',
    },
    {
        code: 'WA',
        name: 'WASHINGTON',
    },
    {
        code: 'WV',
        name: 'WEST VIRGINIA',
    },
    {
        code: 'WI',
        name: 'WISCONSIN',
    },
    {
        code: 'WY',
        name: 'WYOMING',
    },
]

export const GLASS_TYPE = [
    'Windshield',
    'Back Window',
    'Door',
    'Partition',
    'Quarter',
    'Roof',
    'Side',
    'Vent',
]

export const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    .logo {
    }

    @media only screen and (min-width: 100px) {
        p {
            margin-top: 5px;
            margin-bottom: 5px;
            font-size: 1em;
        }
        strong {
            font-size: 1em;
            margin: 5px 0 52px 0;
        }
        .navbar-logo {
            display: inline-block;
            float: left;
            width: 30%;
        }
        .logo {
            margin: 12px 0px 5px 25px;
        }

        .title-right {
            margin: 12px 25px 0px 0px;
            display: inline-block;
            float: right;
            text-align: right;
            width: 60%;
        }

        .content1 {
            margin: 0px 25px 10px 25px;
        }

        .content2 {
            margin: 20px 25px 10px 25px;
            border-top: 2px solid #acb4bc;
            border-bottom: 2px solid #acb4bc;
        }

        .content3 {
            margin: 20px 25px 10px 25px;
        }
    }
  </style>
</head>
<body>
    <header>
        <div class="navbar-logo" style="">
            <img class="logo" style="" src="https://image.ibb.co/dino67/shield_saver_logo2.jpg" width="86.4" height="45" alt="">
        </div>
        <div class="title-right" style="">
            <h1 style="font-size: 1.2em; margin: 0px;">Quote #[license_plate]</h1>
            <p style="display: inline-block; margin-top: 5px;">[date_created]</p>
        </div>
        <div style="clear: both;"></div>
    </header>
    <section class="content1">
        <p style="color: #ff000a; font-size: 1.2em; font-weight: 700;margin-top: 15px;margin-bottom: 0px;">Price: $[price]</p>
        <p style="margin-top: 15px;">[header]</p>
    </section>
    <section class="content2">
        <div class="" style="float: left; width: 70%; margin-top: 10px; margin-bottom: 0px;">
            <p><strong>LICENSE: [license_plate]</strong></p>
            <p><strong>Make: [make]</strong></p>
            <p><strong>Model: [model]</strong></p>
            <p><strong>Year: [year]</strong></p>
            <p><strong>Style: [style]</strong></p>
            <p><strong>Submodel: [submodel]</strong></p>
        </div>
        <div class="" style="float: right; width: 30%; margin-top: 10px;">
            <p><strong>STATE: [state]</strong></p>
        </div>
        <div style="float: left; width: 100%; margin-top: 0px; margin-bottom: 10px;">
            <p style="margin-top: 0px;"><strong><i>Glass Part #[glass_part]</i></strong></p>
        </div>
        <div style="clear: both;"></div>
    </section>
    <section class="content3">
        <p>[footer]</p>
    </section>
    <footer>
        <p style="color: #ff000a; font-size: 1.2em; text-align: center;margin-top: 5px;margin-bottom: 0px;">shieldsaver.com</p>
    </footer>
    <script>window.location.hash = 1;document.title = document.body.offsetHeight;</script>
</body>
</html>`

export const GOOGLE_API_KEY = 'AIzaSyCovK740p5t3TjIoectZEUZx1GeS1jCTdg'