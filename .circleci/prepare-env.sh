#!/bin/bash
touch .env.local
if [ "${CIRCLE_BRANCH}" == "develop" ]; then
cat > .env.local << EOF
VUE_APP_SHOPIFY_APP_URL=$SHOPIFY_APP_URL_DEV
VUE_APP_SHOPIFY_STOREFRONT_API_KEY=$SHOPIFY_STOREFRONT_API_KEY_DEV
VUE_APP_IMYME_API_KEY=$IMYME_API_KEY_DEV
VUE_APP_API=$API_DEV
VUE_APP_STRIPE_PUB_KEY=$STRIPE_PUB_KEY_DEV
VUE_APP_GTM_ID=$GTM_ID_DEV
EOF
fi

if [ "${CIRCLE_BRANCH}" == "master" ]; then
cat > .env.local << EOF
VUE_APP_SHOPIFY_APP_URL=$SHOPIFY_APP_URL_PROD
VUE_APP_SHOPIFY_STOREFRONT_API_KEY=$SHOPIFY_STOREFRONT_API_KEY_PROD
VUE_APP_IMYME_API_KEY=$IMYME_API_KEY_PROD
VUE_APP_API=$API_PROD
VUE_APP_STRIPE_PUB_KEY=$STRIPE_PUB_KEY_PROD
VUE_APP_GTM_ID=$GTM_ID_PROD
EOF
fi
