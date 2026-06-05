ACMEInnovateNow - Complete Project Startup & Instruction Guide

Docker Desktop must be running because Minikube creates and runs the entire Kubernetes cluster inside Docker containers, meaning without Docker open, no pods, services, or port forwarding will work.

Step 1: Start Minikube
cd D:\multi-tier-app
minikube start --cpus=2 --memory=3072 --driver=docker
kubectl apply -f k8s/
kubectl get pods -n app-production
Step 2: Open 5 Separate PowerShell Windows
Each command below must run in its own PowerShell window and stay open.

Window 1 - To-Do Web Application
kubectl port-forward -n app-production svc/web 8080:80
Open browser to: http://127.0.0.1:8080

Window 2 - Backend API Health Check
kubectl port-forward -n app-production svc/backend 5000:5000
Open browser to: http://127.0.0.1:5000/health

Window 3 - Grafana Monitoring Dashboard
kubectl port-forward -n monitoring svc/grafana 3000:80
Open browser to: http://127.0.0.1:3000

Login: admin / admin123

Window 4 - Prometheus Metrics
kubectl port-forward -n monitoring svc/prometheus-server 9090:80
Open browser to: http://127.0.0.1:9090

Window 5 - OpenFaaS Serverless Functions
kubectl port-forward -n openfaas svc/gateway 8081:8080
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($(kubectl -n openfaas get secret basic-auth -o jsonpath="{.data.basic-auth-password}")))
Open browser to: http://127.0.0.1:8081

Login: admin / (password from command above)

Step 3 - Edge Computing (K3s)
Run in any PowerShell window:
docker start k3s-edge
docker exec k3s-edge kubectl get nodes
docker exec k3s-edge kubectl logs -n edge -l run=edge-monitor --tail=5