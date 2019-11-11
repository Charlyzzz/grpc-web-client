FROM envoyproxy/envoy-alpine:latest
    
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /dev/stdout
