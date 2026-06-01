#!/bin/bash

set -e

minikube start --cpus=4 --memory=8192

kubectl create namespace app-production --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/db-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/web-deployment.yaml
kubectl apply -f k8s/network-policy.yaml
kubectl apply -f k8s/rbac.yaml

kubectl apply -f monitoring/prometheus-config.yaml

kubectl get pods -n app-production
kubectl get svc -n app-production

echo "Deployment complete. Access web app at: minikube service web -n app-production"
echo "Access Grafana at: minikube service grafana -n monitoring"
echo "Access Prometheus at: minikube service prometheus -n monitoring"