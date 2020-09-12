aws s3 sync ./dist/fewo-willrich s3://fewo-willrich.de/

aws cloudfront create-invalidation --distribution-id E24UHDKQC617CC --paths "/*"
