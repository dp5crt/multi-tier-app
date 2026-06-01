Tab 1 = minikube service web -n app-production
Tab 2 = kubectl port-forward -n app-production svc/web 8080:80
Tab 3 = kubectl port-forward -n app-production svc/backend 5000:5000
To-Do List App URL = http://127.0.0.1:48180/