let Secret : Type = { kmsKeyName : Text, secretEnv : { FIREBASE_TOKEN : Text } }

let Step
    : Type
    = { name : Text
      , entrypoint : Optional Text
      , args : List Text
      , env : Optional (List Text)
      , secretEnv : Optional (List Text)
      }

let Config
    : Type
    = { steps : List Step
      , options : { machineType : Text }
      , secrets : List Secret
      }

let env =
      Some
      [ "VUE_APP_SHOPIFY_APP_URL=https://imyme-cosme.myshopify.com"
      , "VUE_APP_SHOPIFY_STOREFRONT_API_KEY=2a8351ebd70b95afd1dd44873187b371"
      , "VUE_APP_IMYME_API_KEY=vZhGvSxem4HTDFzh"
      , "VUE_APP_API=https://api.imyme.jp"
      , "VUE_APP_STRIPE_PUB_KEY=pk_live_VCBqFvXswKAZus6zCVbuJj7s"
      , "VUE_APP_GTM_ID=GTM-5RXCZZ3"
      , "VUE_APP_SENTRY_ENVIRONMENT=production"
      , "VUE_APP_RECAPTCHA_SITE_KEY=6Lf_eLoUAAAAALUtlvuaMKPCl3riMjorCAFlpNHS"
      , "VUE_APP_FIREBASE_API_KEY=AIzaSyBu3QlS4xCCIlSa9lqjGrhPtnks3EYJCe8"
      , "VUE_APP_STORE_KEY=signage-tokyu-shibuya-scramble"
      , "VUE_APP_COMMIT_SHA=\$COMMIT_SHA"
      ]

let config
    : Config
    = { steps =
          [ { name =
                "gcr.io/\$PROJECT_ID/github.com/kimelab/cloud-builders/dhall:4a03768"
            , args =
                [ "-c"
                , "cat cloudbuild.dhall | dhall-to-yaml > cloudbuild.yaml && cat cloudbuild.dhall | dhall-to-yaml > cloudbuild4diff.yaml && diff cloudbuild.yaml cloudbuild4diff.yaml"
                ]
            , secretEnv = None (List Text)
            , env = None (List Text)
            , entrypoint = Some "sh"
            }
          , { name = "node:10.15.1"
            , entrypoint = Some "npm"
            , args = [ "install" ]
            , env = None (List Text)
            , secretEnv = None (List Text)
            }
          , { name = "node:10.15.1"
            , entrypoint = Some "npm"
            , args = [ "run", "build:app" ]
            , env = env
            , secretEnv = None (List Text)
            }
          , { name = "node:10.15.1"
            , entrypoint = Some "npm"
            , args = [ "run", "build:tablet" ]
            , env = env
            , secretEnv = None (List Text)
            }
          , { name = "node:10.15.1"
            , entrypoint = Some "npm"
            , args = [ "run", "build:signage" ]
            , env = env
            , secretEnv = None (List Text)
            }
          , { name =
                "gcr.io/\$PROJECT_ID/github.com/kimelab/cloud-builders/firebase:a591765"
            , args =
                [ "-c"
                , "if [ '\$BRANCH_NAME' = 'master' ]; then firebase deploy --token \$\$FIREBASE_TOKEN; else true; fi"
                ]
            , env = None (List Text)
            , secretEnv = Some [ "FIREBASE_TOKEN" ]
            , entrypoint = Some "bash"
            }
          ]
      , options = { machineType = "N1_HIGHCPU_8" }
      , secrets =
          [ { kmsKeyName =
                "projects/imyme-production/locations/global/keyRings/cloud-build-trigger-imyme-api/cryptoKeys/application_secret"
            , secretEnv =
                { FIREBASE_TOKEN =
                    "CiQAJ7or4y+tXknDyOtAcrM965gPfHTRgvAtpX8ahvyweeg2zT0SjwEA4z8TbDTA50lUBlGQE8XtMyVazumSEcJOZgTioAXflxoLiKJEkYTR0uCcTxJlGYK4VkvWHG3Qv7CoE7cp0Xal3PMSCn/mS+dbkpMlA97Y8vYoZX3VQbhANER+EKIo3PYIrqCUkgQ4H8Cuxi1RTRjMU7A4q8eEa9TBqJxvCuwYmup96IPDwhQ/WznAZkGGRQ=="
                }
            }
          ]
      }

in  config
